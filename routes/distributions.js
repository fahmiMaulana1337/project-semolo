const express = require('express')
const router = express.Router()
const DistributionControllers = require('../controllers/distributionControllers')
const { authentication } = require('../middlewares/auth')
const { verifyRole } = require('../middlewares/authRole')
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })
const distributionRouter = express.Router()

distributionRouter.use(authentication)
distributionRouter.use(verifyRole)
//endpoint

distributionRouter.post('/', DistributionControllers.registerFund)
distributionRouter.get(
  '/:WakafId/:obtained_at',
  DistributionControllers.setDistribution
)

router.use('/admin/distributions', distributionRouter)

module.exports = router
