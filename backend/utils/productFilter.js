class ProductFilter {
    constructor(query,queryStr){
        this.query = query
        this.queryStr = queryStr
    }
    search(){
        const keyword = this.queryStr.keyword ? {
            name:{
                $regex:this.queryStr.keyword,
                $options:'i'
            }
        } :{}
        this.query = this.query.find({...keyword})
        return this;

    }
    filter(){
        const queryCopy = {...this.queryStr}
        const deleteArea = ['keyword','page','limit']
        deleteArea.forEach(item=> delete queryCopy[item])
        const queryStr = JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|)\b/g,key=>`$${key}`)

        this.query = this.query.find(JSON.parse(queryStr))
        return this;

    }
    pagination(){

    }
}

module.exports = ProductFilter

//constru iki deger alir birinci tum iutrunler ikincis filtrirelmak istenen urunler
//bunu products kontrold all kulladik productfind() burda karsilayan hepsini quety karsilik digeri ise istenilen req,query den aliyoruy 