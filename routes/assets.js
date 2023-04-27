const express = require('express')
const router = express.Router()
const AssetControllers = require('../controllers/assetControllers')
const { authentication } = require('../middlewares/auth')
const { verifyRole } = require('..//middlewares/authRole')
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })
const assetsRouter = express.Router()

//endpoint
assetsRouter.use(authentication)


assetsRouter.post('/', upload.single('image'), AssetControllers.registerAsset)
assetsRouter.get('/', AssetControllers.getAllAsset)
assetsRouter.get('/user', AssetControllers.getUserAsset) //req from headers
assetsRouter.post('/request/:id', AssetControllers.requestAsset)

assetsRouter.use(verifyRole)
assetsRouter.get('/request', AssetControllers.getRequestAsset)
assetsRouter.post('/accept/:id', AssetControllers.acceptRequest)

router.use('/assets', assetsRouter)

module.exports = router
