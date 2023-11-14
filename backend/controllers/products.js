const Product = require('../models/product.js')



const allProducts = async(req,res)=>{
    const products = await Product.find()

    res.status(200).json({
        products
    })

}
const detailProducts = async(req,res)=>{
    const product = await Product.findById(req.params.id)

    res.status(201).json({
        product
    })

}
//admin
const createProducts = async(req,res)=>{
    const product = await Product.create(req.body)

    res.status(201).json({
        product
    })
}
const deleteProducts = async(req,res)=>{
    const product = await Product.findById(req.params.id)
    product.remove()
    res.status(200).json({
    messagr:'urun deleter'
    })
}
const updateProducts = async(req,res)=>{
    const product = await Product.findById(req.params.id)
 product = await Product.findByIdAndUpdate(req.paramas.id,req.body,{new:true})
    res.status(200).json({
    messagr:'urun deleter'
    })
}




module.exports = {allProducts , detailProducts ,createProducts ,deleteProducts ,updateProducts }