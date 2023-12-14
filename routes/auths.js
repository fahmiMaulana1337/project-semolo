const express = require('express')
const router = express.Router()
const AuthControllers = require('../controllers/authControllers')
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })
// const authRouter = express.Router()

//endpoint
router.post('/register', upload.single('image'), AuthControllers.register)
router.post('/login', AuthControllers.login)

module.exports = router
