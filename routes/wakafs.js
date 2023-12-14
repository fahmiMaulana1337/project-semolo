const express = require('express')
const router = express.Router()
const WakafControllers = require('../controllers/wakafControllers')
const { authentication } = require('../middlewares/auth')
const { verifyRole } = require('../middlewares/authRole')
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })
// const router = express.Router()

//auth
router.use(authentication)
router.use(verifyRole)

//ADMIN
router.post('/', WakafControllers.registerWakaf)
router.get('/', WakafControllers.getAllWakaf)
router.get('/:id', WakafControllers.getWakafById)
router.put('/:id', WakafControllers.updateWakaf)
// router.patch('/update-fund', WakafControllers.updateFund)


module.exports = router
