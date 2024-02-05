const express = require('express')
const router = express.Router()
const authRouter = require('./auths.js')
const userRouter = require('./users.js')
const assetsRouter = require('./assets.js')
const fundRouter = require('./funds.js')
const paymentRouter = require('./payments.js')
const wakafController = require('./wakafs.js')

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/assets', assetsRouter)
router.use('/admin/distributions', fundRouter)
router.use('/payments', paymentRouter)
router.use('/admin/wakafs', wakafController)

module.exports = router
