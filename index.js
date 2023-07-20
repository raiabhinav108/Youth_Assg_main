const express = require('express')
const app = express()

const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const productRouter = require('./routes/products')
const userRouter = require('./routes/users')

const connect = mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
})

connect.then(
  function (db) {
    console.log('Connected correctly to server')
  },
  (err) => {
    console.log(err)
  }
)

app.get('/', (req, res) => {
  return res.json('Hello World')
})

app.use('/product', productRouter)
app.use('/user', userRouter)

app.listen(3000, () => {
  console.log(`Server started at 3000`)
})
