const { User, Asset, Recipe } = require('../models/index')
const { sendEmailCheckout } = require("../helpers/send_email")
const dotenv = require('dotenv')
const { Transaction } = require('../models/index')
const { errResponse, successResponse } = require('../helpers/response')
dotenv.config()

class PaymentControllers {
  static async payment(req, res) {
    try {
      const id = req.params.id
      const user = await User.findByPk(req.user.id)
      const recipe = await Recipe.findOne({
        include: [Asset, User],
        where: {
          id,
        },
      })

      if (!recipe) {
        return errResponse(res, 404, 'Data Recipe Not Found!')
      }

      const snap = new Transaction({
        clientKey: process.env.CLIENT_KEY_MIDTRANS,
        serverKey: process.env.SERVER_KEY_MIDTRANS,
        isProduction: false,
      })

      console.log('SNAP', snap)

      const orderId =
        'YOUR-ORDERID' + Math.floor(100000 + Math.random() * 9000000)
      const grosAmount = recipe.totalPrice

      const parameter = {
        transaction_details: {
          order_id: orderId,
          gross_amount: grosAmount,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: user.email,
        },
      }

      const midtransToken = await snap.createTransaction(parameter)
      let mail = 'fahmimaulana1337@gmail.com'
      sendEmailCheckout(mail)

      return successResponse(201,midtransToken,'Successfully payment',res)
    } catch (error) {
      console.log(error)
      errResponse(500, error, res)
    }
    }
}

module.exports = PaymentControllers