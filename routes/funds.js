const express = require('express')
const router = express.Router()
const FundControllers = require('../controllers/fundControllers')
const { authentication } = require('../middlewares/auth')
const { verifyRole } = require('../middlewares/authRole')
const WakafControllers = require('../controllers/wakafControllers')
// const fundRouter = express.Router()

router.use(authentication)
router.use(verifyRole)
//endpoint

router.post('/', FundControllers.registerFund)
router.get('/:year', FundControllers.getAllWakafStatus)
router.put('/', FundControllers.updateDistribution)

module.exports = router
