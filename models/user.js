const DataStore = require("nedb-promise");
const users = new DataStore({ filename: "./data/mydata.db", autoload: true })
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config()


module.exports = {
    async newUser(body) {
        if (body.password === body.repeatPassword) {
            const user = await users.findOne({ email: body.email })
            if (user) {
                return false;
            } else {
                const passwordHash = await bcrypt.hash(body.password, 10)
                const newUser = {
                    email: body.email,
                    password: passwordHash,
                    role: "user", //admin
                    name: body.name,
                    adress: {
                        street: body.adress.street,
                        zip: body.adress.zip,
                        city: body.adress.city
                    },
                    payment: {
                        cardOwner: body.payment.cardOwner,
                        cardNumber: body.payment.cardNumber,
                        validUntil: body.payment.validUntil,
                        cvv: body.payment.cvv
                      },
                      orderHistory: body.orderHistory
                };
                return await users.insert(newUser);
            }
        } else {
            return false;
        }
    },

    async userLogin(body) {
        const user = await users.findOne({email:body.email});
        if (!user) {
            return false
        } else {
            const passwordMatch = await bcrypt.compare(body.password, user.password)
            if (passwordMatch) {
                const payload = {
                    email:user.email,
                    role:user.role,
                      _id:user._id
                }
                const secret = process.env.SECRET;
                const token = jwt.sign(payload, secret)
    
                const auth = {
                    token: token,
                    user:{
                        email: user.email,
                        name: user.name,
                        role: user.role,
                        adress: {
                            street: user.street,
                            city: user.city,
                            zip: user.zip
                        },
                        orderHistory: user.orderHistory
                    
                    }
                }
               return auth
            } else {
                return false
            }
        }
    },
    
    async myPayment(userID, payment) {
        await users.update({ _id: userID }, { $set: { payment: payment } });
    },
    async myOrder(userID, orderID) {
        await users.update({ _id: userID }, { $push: { orderHistory: orderID } });
    }

};

