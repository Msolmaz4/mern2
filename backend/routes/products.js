const express = require('express')

const {allProducts , detailProducts ,createProducts ,deleteProducts ,updateProducts ,createReview,adminProducts} = require('../controllers/products.js')

const router = express.Router()


router.get('/products',allProducts)
router.get('/admin/products',adminProducts)
router.get('/products/:id',detailProducts)
router.post('/product/new',createProducts)
router.post('/product/newReview',createReview)
router.delete('/products/:id',deleteProducts)
router.put('/products/:id',updateProducts)






module.exports = router