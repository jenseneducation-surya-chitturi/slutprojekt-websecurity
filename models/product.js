const DataStore = require("nedb-promise")

const products = new DataStore({filename: "./data/products.db",autoload: true})

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
            const numDeleted = await products.remove({_id:id})
            return numDeleted > 0
        },
    

        async update(id, body){        
            const numUpdated = await products.update(
                {_id:id},
                {$set:{
                        content: body.content || product.content
                }}
            )
            return numUpdated > 0
        }
    }

