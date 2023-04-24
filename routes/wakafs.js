const express = require('express')
const router = express.Router()
const WakafControllers = require('../controllers/wakafControllers')
const { authentication } = require('../middlewares/auth')
const { verifyRole } = require('../middlewares/authRole')
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })
const wakafRouter = express.Router()

//auth
wakafRouter.use(authentication)
wakafRouter.use(verifyRole)

//ADMIN
wakafRouter.post('/', WakafControllers.registerWakaf)
wakafRouter.get('/', WakafControllers.getAllWakaf)
wakafRouter.get('/:id', WakafControllers.getWakafById)
wakafRouter.put('/:id', WakafControllers.updateWakaf)
// wakafRouter.patch('/update-fund', WakafControllers.updateFund)

router.use('/admin/wakafs', wakafRouter)

module.exports = router
