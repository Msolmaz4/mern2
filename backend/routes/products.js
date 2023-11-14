const express = require('express')

const {allProducts , detailProducts ,createProducts ,deleteProducts ,updateProducts ,createReview,adminProducts} = require('../controllers/products.js')
const { authenticationMid, roleChecked } = require('../middleware/auth.js')

const router = express.Router()


router.get('/products',allProducts)
router.get('/admin/products',authenticationMid,roleChecked('admin'),adminProducts)
router.get('/products/:id',detailProducts)
router.post('/product/new',authenticationMid,roleChecked('admin'),createProducts)
router.post('/product/newReview',authenticationMid,createReview)
router.delete('/products/:id',authenticationMid,roleChecked('admin'),deleteProducts)
router.put('/products/:id',authenticationMid,roleChecked('admin'),updateProducts)






module.exports = router