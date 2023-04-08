
const express = require('express');
const router = express.Router()
const UserController = require('../controllers/userController');
const { authentication } = require('../middlewares/auth');


router.post('/register',UserController.register);
router.post('/login',UserController.login);


router.use(authentication)// ria kabebe kodu login kabbi
router.post('/asset',UserController.addAsset);// admin 
router.get('/assets',UserController.getAsset); // nenggu aset
router.post('/requestAsset/:id',UserController.requestAsset); // user request
router.get('/showRequest',UserController.getRequestAsset) // admin neggu sapa se request
router.patch('/acceptRequest/:id',UserController.acceptRequest) // admin acc request
router.get('/payment/:id',UserController.payment)






module.exports=router;
