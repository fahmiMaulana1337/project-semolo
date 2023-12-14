const express = require('express')
const router = express.Router()
const userControllers = require('../controllers/userControllers')
const { authentication } = require('../middlewares/auth')

router.use(authentication)

router.get('/', userControllers.getAllProfile)
router.get('/:id', userControllers.getUserProfile)
router.put('/', userControllers.updateProfile)

module.exports = router
