
const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')
const AdminController = require('../controllers/adminControllers')
const { authentication } = require('../middlewares/auth');


router.post('/register',UserController.register);
router.post('/login',UserController.login);
router.use(authentication)
router.post('/asset',UserController.addAsset);// admin 
router.get('/assets',UserController.getAsset); // nenggu aset
router.post('/requestAsset/:id',AdminController.requestAsset); // user request
router.get('/showRequest',UserController.getRequestAsset) // admin neggu sapa se request
router.patch('/acceptRequest/:id',UserController.acceptRequest) // admin acc request
router.patch('/getAllWakaf',AdminController.getAllWakafDatas)
router.get('/getWakafById',AdminController.getWakafById)
router.post('/setDistribution',AdminController.setDistribution)
router.post('/updateFund',AdminController.updateFund)
router.get('/payment/:id',UserController.payment)






module.exports=router;
