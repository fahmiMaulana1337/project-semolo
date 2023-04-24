const express = require('express')
const router = express.Router()
const PaymentControllers = require('../controllers/paymentControllers')
const { authentication } = require('../middlewares/auth')
const { verifyRole } = require('../middlewares/authRole')
const paymentsRouter = express.Router()

//endpoint
paymentsRouter.use(authentication)

paymentsRouter.post('/:id', PaymentControllers.payment)

router.use('/payments', paymentsRouter)

module.exports = router
