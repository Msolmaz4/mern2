const Product = require('../models/product.js')
const ProductFilter = require('../utils/productFilter.js')
const cloudinary =require('cloudinary').v2



const allProducts = async(req,res)=>{
    console.log(req.body,'allpro')
    //burda search unutma yokss acaklismaz didgerleride 
    const resultPerPage = 10
    const productFilter = new ProductFilter(Product.find(),req.query).search().filter().pagination(resultPerPage)
    const products = await productFilter.query
//const products = await Product.find()
    res.status(200).json({
        products
    })

}

const adminProducts = async(req,res,next)=>{
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
const createProducts = async(req,res,next)=>{
     let images = []
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
     req.body.user = req.user.id
     const product = await Product.create(req.body)

    res.status(201).json({
        product
    })
}
const deleteProducts = async(req,res,next)=>{
    const product = await Product.findById(req.params.id)

   for(let i =0 ; i<product.images.length; i++){
    await  cloudinary.uploader.destroy(product.images[i].public_id)
   }

    await  product.remove()
    res.status(200).json({
    messagr:'urun deleter'
    })
}
const updateProducts = async(req,res,next)=>{
    const product = await Product.findById(req.params.id)

    let images = []
    if(typeof req.body.image === 'string'){
        images.push(req.body.images)
    }else{
        images = req.body.images
    }
    //disardan ektra resim gleirse oncklierin sileriy
    if(images !== undefined){
        for(let i =0 ; i<product.images.length; i++){
            await  cloudinary.uploader.destroy(product.images[i].public_id)
           }
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

    product = await Product.findByIdAndUpdate(req.paramas.id,req.body,{new:true,runValidators:true})
    res.status(200).json({
    messagr:'urun deleter'
    })
}
const createReview = async()=>{
    const {productId,comment,rating} = req.body

    const review = {
        user:req.user_id,
        name:req.user_id,
        comment,
        rating:Number(rating)
    }
    const product = await Product.findById(productId)
    product.reviews.push(review)
    let avg = 0
    product.reviews.forEach(rev=>{
        avg+=rev.rating
    })
    product.rating = avg/product.reviews.length
    await product.save({validateBeforeSave:false})

    res.status(200).json({
        message:'kommantare hinyufugen'
    })
}



module.exports = {allProducts , detailProducts ,createProducts ,deleteProducts ,updateProducts,createReview ,adminProducts}