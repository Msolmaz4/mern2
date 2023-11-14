const express = require('express')

const {allProducts , detailProducts ,createProducts ,deleteProducts ,updateProducts } = require('../controllers/products.js')

const router = express.Router()
router.get('/products',allProducts)
router.get('/products/:id',detailProducts)
router.get('/product/new',createProducts)
router.delete('/products/:id',deleteProducts)
router.put('/products/:id',updateProducts)






module.exports = router