const express = require('express')
const router = express.Router()
const AssetControllers = require('../controllers/assetControllers')
const { authentication } = require('../middlewares/auth')
const { verifyRole } = require('../middlewares/authRole')
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })
// const assetsRouter = express.Router()

//endpoint
router.use(authentication)

router.post('/', upload.single('image'), AssetControllers.registerAsset)
router.get('/', AssetControllers.getAllAsset)
router.get('/user/:id', AssetControllers.getUserAsset) //req from headers
router.get('/:id', AssetControllers.detailAsset) //req from params
router.post('/request/:id', AssetControllers.requestAsset)

router.use(verifyRole)
router.get('/admin/request', AssetControllers.getRequestAsset)
router.post('/admin/accept/:id', AssetControllers.acceptRequest)

module.exports = router
