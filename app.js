const express = require('express')
const path = require('path')
const router = require('./router')
const session = require('express-session')
const cookieParser = require('cookie-parser')

const app = express()

app.use(
  session({
    secret: 'keyboard cat',
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: true,
    saveUninitialized: true
  })
)
app.set('trust proxy', 1)

app.use(cookieParser())
app.engine('html', require('express-art-template'))
app.use('/public', express.static('./public'))
app.use('/node_modules', express.static('../node_modules'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)

app.use(function (err, request, response, next) {
  response.status(500).json({
    code: 500,
    msg: err.message
  })
})

app.listen(5500, function () {
  console.log('5500端口已开启.....')
})
