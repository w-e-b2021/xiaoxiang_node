const express = require('express')
const fs = require('fs')
const path = require('path')
const md5 = require('blueimp-md5')
const e = require('express')
const code = require(path.join(__dirname, './api/code.js'))
const Location = require(path.join(__dirname, './models/location.js'))
const Foodtypes = require(path.join(__dirname, './models/foodTypes.js'))
const ShopList = require(path.join(__dirname, './models/shopList.js'))
const Cpatcha = require(path.join(__dirname, './models/cpatcha.js'))
const Shopuser = require(path.join(__dirname, './models/shop_user.js'))

const router = express.Router()

var phoneAndcode = {}
var captcha_id = 1

//定位信息
router.get('/position/:geohash', function (request, response, next) {
  let params = request.params
  // response.setHeader('Access-Control-Allow-Origin', '*')
  Location.findOne(params)
    .then(value => {
      if (value) {
        response.json({
          code: 0,
          data: value
        })
      } else {
        response.json({
          code: 1,
          message: '无法获取地址信息'
        })
      }
    })
    .catch(reason => {
      next(reason)
    })
})
//食品分类列表
router.get('/index_category', function (request, response, next) {
  Foodtypes.find()
    .then(value => {
      response.json({
        code: 0,
        data: value
      })
    })
    .catch(reason => {
      next(reason)
    })
})
//根据经纬度获取商铺列表
router.get('/shops', function (request, response, next) {
  let geohash = request.query.jing + ',' + request.query.wei
  Location.findOne({ geohash: geohash })
    .then(value => {
      if (value) {
        ShopList.find()
          .then(value => {
            response.json({
              code: 0,
              data: value
            })
          })
          .catch(reason => {
            next(reason)
          })
      } else {
        response.json({
          code: 1,
          message: '不在服务范围之内',
          na: '.'
        })
      }
    })
    .catch(reason => {
      next(reason)
    })
})
//发送图片验证码
router.get('/captcha', function (request, response, next) {
  Cpatcha.findOne({ id: request.query.num })
    .then(value => {
      captcha_id = request.query.num
      response.send('http://127.0.0.1:5500' + value.image_url)
    })
    .catch(reason => {
      next(reason)
    })
})
//发送手机验证码
router.get('/sendcode', function (request, response, next) {
  var phone = request.query.phone
  var randomcode = code.randomCode()
  code.sendCode(phone, randomcode, function (success) {
    if (success) {
      console.log(randomcode) //log*******************************************************
      phoneAndcode.phone = phone
      phoneAndcode.code = randomcode
      phoneAndcode.time1 = Date.now()
      response.json({
        code: 0,
        msg: '验证码发送成功'
      })
    } else {
      response.json({
        code: 1,
        msg: '验证码发送失败'
      })
    }
  })
})
//手机号验证码登录验证
router.post('/login_sms', function (request, response, next) {
  let phone = request.body.phone
  let code = request.body.code
  if (phone == phoneAndcode.phone && code === phoneAndcode.code) {
    phoneAndcode.time2 = Date.now()
    let time = (phoneAndcode.time2 - phoneAndcode.time1) / 1000
    if (time > 60) {
      return response.json({
        code: 2,
        msg: '验证码已过期'
      })
    }
    Shopuser.findOne({ phone: phone })
      .then(value => {
        if (value) {
          request.session.userid = value.id
          response.json({
            code: 0,
            data: value //用户已注册返回用户信息
          })
          console.log('已注册登录') //log*******************************************************
        } else {
          return new Shopuser({ phone: phone }).save()
        }
      })
      .then(value => {
        if (value) {
          request.session.userid = value.id
          response.json({
            code: 0,
            data: value //注册并保存并返回用户信息
          })
          console.log('注册登录') //log*******************************************************
        }
      })
      .catch(reason => {
        next(reason)
      })
  } else {
    response.json({
      code: 1,
      msg: '验证失败'
    })
  }
})
//用户密码登录name, pwd, captcha
router.post('/login_pwd', function (request, response, next) {
  let { name, pwd, captcha } = request.body
  Cpatcha.findOne({ id: captcha_id })
    .then(value => {
      if (value) {
        console.log(value.value, captcha) //log*******************************************************
        if (value.value == captcha) {
          return Shopuser.findOne({ person_id: name, password: pwd })
        } else {
          response.json({
            code: 1,
            msg: '验证码错误'
          })
        }
      } else {
        response.status(500).json({
          code: 500,
          msg: '服务器出错'
        })
      }
    })
    .then(value => {
      if (value) {
        request.session.userid = value.id
        response.json({
          code: 0,
          data: value
        })
        // console.log(value.id) //log*******************************************************
      } else {
        response.json({
          code: 1,
          msg: '账号或密码错误'
        })
      }
    })
    .catch(reason => {
      next(reason)
    })
})
//根据会 话获取用户信息
router.get('/userinfo', function (request, response, next) {
  let session_id = request.session.userid
  console.log(session_id, 'session_id') //log*******************************************************
  if (session_id) {
    Shopuser.findOne({ id: session_id })
      .then(value => {
        if (value) {
          response.json({
            code: 0,
            data: value
          })
        } else {
          response.json({
            code: 1,
            msg: '请先登录'
          })
          delete request.session.userid
        }
      })
      .catch(reason => {
        next(reason)
      })
  } else {
    response.json({
      code: 1,
      msg: '请先登录'
    })
    // console.log('zheli') //log*******************************************************
  }
})
//用户登出
router.get('/logout', function (request, response, next) {
  delete request.session.userid
  if (!request.session.userid) {
    response.json({
      code: 0
    })
  } else {
    response.json({
      code: 1
    })
  }
})
//根据经纬度和关键词搜索商铺列表
router.get('/search_shops', function (request, response, next) {
  let keyword = request.query.keyWord
  ShopList.find({
    $or: [
      { name: eval(`/${keyword}/`) },
      { address: eval(`/${keyword}/`) },
      { category: eval(`/${keyword}/`) },
      { delivery_fee: eval(`/${keyword}/`) },
      { supports: eval(`/${keyword}/`) },
      { delivery_mode: eval(`/${keyword}/`) }
    ]
  })
    .then(value => {
      response.json({
        code: 0,
        data: value
      })
    })
    .catch(reason => {
      next(reason)
    })
})
module.exports = router
