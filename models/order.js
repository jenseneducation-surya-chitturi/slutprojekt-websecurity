const DataStore = require("nedb-promise")

const orders = new DataStore({filename: "data/order.db",autoload: true})


module.exports = {

    async all() {
        return await orders.find({});
    },
 
   
    async create(body) {
        const newOrder = {
            _id: body.id,
            timeStamp: Date.now(),
            status: "inProcess",
            items: body.items,
            orderValue: body.orderValue
        };
        
        return await orders.insert(newOrder);
    }
};
