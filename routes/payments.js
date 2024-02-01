const express = require('express')
const router = express.Router()
const PaymentControllers = require('../controllers/paymentControllers')
const { authentication } = require('../middlewares/auth')
const { verifyRole } = require('../middlewares/authRole')
// const paymentsRouter = express.Router()

//endpoint
router.use(authentication)

router.post('/', PaymentControllers.payment)

module.exports = router


