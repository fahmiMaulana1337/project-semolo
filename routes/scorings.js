const express = require('express')
const router = express.Router()
const ScoringControllers = require('../controllers/scoringControllers')
const { authentication } = require('../middlewares/auth')
const { verifyRole } = require('../middlewares/authRole')
const scoringRouter = express.Router()

//endpoint
scoringRouter.use(authentication)

scoringRouter.post('/:id', ScoringControllers.addScoring)

router.user('/scorings', scoringRouter)

module.exports = router