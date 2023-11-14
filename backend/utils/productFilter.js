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

    }
    pagination(){

    }
}

module.exports = ProductFilter

//constru iki deger alir birinci tum iutrunler ikincis filtrirelmak istenen urunler
//bunu products kontrold all kulladik productfind() burda karsilayan hepsini quety karsilik digeri ise istenilen req,query den aliyoruy 