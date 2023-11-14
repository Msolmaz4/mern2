const Product = require('../models/product.js')
const ProductFilter = require('../utils/productFilter.js')
const cloudinary =require('cloudinary').v2



const allProducts = async(req,res)=>{
    //burda search unutma yokss acaklismaz didgerleride 
    const resultPerPage = 10
    const productFilter = new ProductFilter(Product.find(),req.query).search().filter().pagination(resultPerPage)
    const products = await productFilter.query

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
    const images = []
    if(typeof req.body.image === 'string'){
        images.push(req.body.images)
    }else{
        images = req.body.images
    }
    
    let allImage= []
    for(let i = 0; i<images.length ; i++){
        const result = await cloudinary.uploader.upload(images[i],{
            folder:'products'
        })
        allImage.push({
            public_id:result.public_id,
            url:result.secure_url
        })
    }
     req.body.images = allImage
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