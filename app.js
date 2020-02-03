const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()

const productsRoutes = require('./routes/products')
const ordersRoutes = require('./routes/orders')
const userRoutes = require('./routes/users')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
app.use('/api',productsRoutes)
app.use('/api',ordersRoutes)
app.use('/',userRoutes)

app.listen(8080, () => console.log("Server started"))
