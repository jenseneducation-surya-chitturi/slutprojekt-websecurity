const DataStore = require("nedb-promise")

const orders = new DataStore({filename: "data/order.db",autoload: true})
const User = require("./user")
const Product = require("./product")
module.exports = {

    async all() {
        return await orders.find({});
    },
   
    async getOne(userID){
        return await orders.findOne({owner:userID})

    },
   
    async create(body, userID) {

        let total = 0
        const value = body.items
        for (let item of value) {
            const product  = await Product.getOne(item)
 
            total += product.price
        }
        
        const order = {
            owner: userID,
            timeStamp: Date.now(),
            status: "inProcess",
            items: body.items,
            orderValue: total
        }
         const updateOrder =  await orders.insert(order)
         await User.myPayment(userID,body.payment)
         await User.myOrder(userID,updateOrder.orderID)
         return updateOrder
      }
        
      }
