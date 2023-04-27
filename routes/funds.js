const express = require('express')
const router = express.Router()
const FundControllers = require('../controllers/fundControllers')
const { authentication } = require('../middlewares/auth')
const { verifyRole } = require('../middlewares/authRole')
const WakafControllers = require('../controllers/wakafControllers')
const fundRouter = express.Router()

fundRouter.use(authentication)
fundRouter.use(verifyRole)
//endpoint

fundRouter.post('/', FundControllers.registerFund)
fundRouter.get('/:year', FundControllers.getAllWakafStatus)
fundRouter.put('/', FundControllers.updateDistribution)

router.use('/admin/distributions', fundRouter)

module.exports = router
