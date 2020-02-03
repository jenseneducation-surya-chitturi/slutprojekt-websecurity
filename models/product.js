const DataStore = require("nedb-promise")

const products = new DataStore({filename: "data/product.db",autoload: true})

module.exports = {

    async all(){
        return await products.find({})
    },
    
    async get(id){
        return await products.findOne({_id:id})

    },

        async create(body){
            return await products.insert({
                 serial : body.serial,
                title: body.title,
                price: body.price,
                shortDesc: body.shortDesc,
                longDesc: body.longDesc,
                imgFile: body.imgFile
      
            })
        },
    
        async remove(id){
          
            return await db.remove({ _id: id });
        },
    

        async update(id, body){        
            const  product = await products.findOne({ _id: id })
            product = await products.update(product, { $set: body })
            return product   
    
    }
}

