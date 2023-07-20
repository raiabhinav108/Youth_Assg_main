const router = require('express').Router()

const addProduct = require('../controllers/products/addProduct')
const getAllProducts = require('../controllers/products/getAllProducts')
const getProduct = require('../controllers/products/getProduct')
const updateProduct = require('../controllers/products/updateProduct')
const deleteProduct = require('../controllers/products/deleteProduct')
const authenticate = require('../utils/authenticate')
const isAdmin = require('../utils/isAdmin')

router.get('/', getAllProducts)
router.get('/:productId', getProduct)
router.post('/', authenticate, isAdmin, addProduct)
router.patch('/:productId', authenticate, isAdmin, updateProduct)
router.delete('/:productId', authenticate, isAdmin, deleteProduct)

module.exports = router
