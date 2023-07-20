const router = require('express').Router()

const addUser = require('../controllers/users/addUser')
const login = require('../controllers/users/login')

router.post('/', addUser)
router.post('/login', login)

module.exports = router
