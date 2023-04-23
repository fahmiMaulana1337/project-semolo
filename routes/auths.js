const express = require('express')
const router = express.Router()
const AuthControllers = require('../controllers/authControllers')
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })
const authRouter = express.Router()

//endpoint
authRouter.post('/register', upload.single('image'), AuthControllers.register)
authRouter.post('/login', AuthControllers.login)

router.use('/auth', authRouter)

module.exports = router
