const MidtransClient = require('midtrans-client')
const { User, Asset, Recipe } = require('../models/index')
const { sendEmailCheckout } = require('../helpers/send_email')
const dotenv = require('dotenv')
const { errResponse, successResponse } = require('../helpers/response')
dotenv.config()

class PaymentControllers {
  static async payment(req, res) {
    try {
      const id = req.params.id
      const user = await User.findByPk(req.user.id)

      if (!user) {
        return errResponse(404, 'Not Authorized', res)
      }

      const recipe = await Recipe.findOne({
        include: [Asset, User],
        where: {
          UserId: id,
        },
      })

      if (!recipe) {
        return errResponse(404, 'Recipe not found', res)
      }

      let snap = new MidtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.SERVER_KEY_MIDTRANS,
        clientKey: process.env.CLIENT_KEY_MIDTRANS,
      })

      const orderId =
        'YOUR-ORDERID' + Math.floor(100000 + Math.random() * 9000000)
      const grossAmount = recipe.totalPrice

      let parameter = {
        transaction_details: {
          order_id: orderId,
          gross_amount: grossAmount,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: user.email,
        },
      }

      const midtransToken = await snap.createTransaction(parameter)
      const mail = 'fahmiMaulana1337@gmail.com'
      console.log('INI MAIL==>', mail)
      const sendEmail = sendEmailCheckout(mail)
      console.log('SEND EMAIL', sendEmail)
      return successResponse(201, midtransToken, 'Succesfully transcation', res)
    } catch (error) {
      console.log(error)
      return errResponse(500, error, res)
    }
  }
}

module.exports = PaymentControllers
