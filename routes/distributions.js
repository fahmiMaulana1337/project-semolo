const express = require('express')
const router = express.Router()
const DistributionControllers = require('../controllers/distributionControllers')
const { authentication } = require('../middlewares/auth')
const { verifyRole } = require('../middlewares/authRole')
const distributionRouter = express.Router()

distributionRouter.use(authentication)
distributionRouter.use(verifyRole)
//endpoint

distributionRouter.post('/', DistributionControllers.registerFund)
distributionRouter.put(
  '/:WakafId/:obtained_at',
  DistributionControllers.addDistribution
)

router.use('/admin/distributions', distributionRouter)

module.exports = router
