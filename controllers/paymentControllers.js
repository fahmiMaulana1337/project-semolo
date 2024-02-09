const { User, Asset, Recipe } = require('../models/index')
const { sendEmailCheckout } = require('../helpers/send_email')
const dotenv = require('dotenv')
const { errResponse, successResponse } = require('../helpers/response')
dotenv.config()
const MidtransClient = require('midtrans-client')
const cron = require('cron')

class PaymentControllers {
  static async payment(req, res) {
    try {
      const { id } = req.body
      const user = await User.findByPk(id)

      if (!user) {
        return errResponse(404, 'User not found', res)
      }

      const recipe = await Recipe.findOne({
        where: {
          user_id: id,
        },
      })

      //query assett
      const asset = await Asset.findOne({
        where: {
          id: recipe.asset_id,
        },
      })

      if (!recipe) {
        return errResponse(404, 'Recipe not found', res)
      }

      let snap = new MidtransClient.Snap({
        isProduction: false,
        serverKey: process.env.SERVER_KEY_MIDTRANS,
        clientKey: process.env.CLIENT_KEY_MIDTRANS,
      })
      const orderId =
        'ASSET-PAYMENT' + Math.floor(100000 + Math.random() * 9000000)
      const grossAmount = recipe.total_price
      let parameter = {
        transaction_details: {
          order_id: orderId,
          gross_amount: grossAmount,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: user.name,
          email: user.email,
          phone: user.phone_number,
        },
        item_details: [
          {
            id: asset.id,
            price: grossAmount,
            quantity: 1,
            name: asset.name,
          },
        ],
      }
      const midtransToken = await snap.createTransaction(parameter)
      console.log(midtransToken)
      const mail = 'akunguardian2023.1@gmail.com'
      const sendEmail = sendEmailCheckout(
        mail,
        asset,
        recipe,
        user,
        parameter,
        midtransToken
      )

      // Cronjob
      // const cronJob = new cron.CronJob('0 0 1 * *', async () => {
      //   console.log('Running cron job...')
      //   sendEmailCheckout(mail, asset, recipe, user, parameter, midtransToken)
      // })

      // // Mulai cron job
      // cronJob.start()

      return successResponse(201, midtransToken, 'Succesfully transcation', res)
    } catch (error) {
      console.info(error)
      return errResponse(500, error, res)
    }
  }
}

module.exports = PaymentControllers
let snap = new MidtransClient.Snap({
  isProduction: false,
  serverKey: process.env.SERVER_KEY_MIDTRANS,
  clientKey: process.env.CLIENT_KEY_MIDTRANS,
})
