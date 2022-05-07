const md5 = require('blueimp-md5')
const moment = require('moment')
const Base64 = require('js-base64').Base64
const request = require('request')

exports.randomCode = function () {
  var result = ''
  for (let i = 0; i < 6; i++) {
    result += Math.floor(Math.random() * 10)
  }
  return result
}

exports.sendCode = function (phone, code, callback) {
  var ACCOUNT_SID = '8aaf07087e3322ea017e6d6dbde00a3f'
  var AUTH_TOKEN = '2e46a0ed7ff14a9ea9d0eaede8d728c0'
  var Rest_URL = 'https://app.cloopen.com:8883'
  var AppID = '8aaf07087e3322ea017e6d6dbedf0a45'
  var sigParameter = ''
  var time = moment().format('YYYYMMDDHHmmss')
  sigParameter = md5(ACCOUNT_SID + AUTH_TOKEN + time)
  var url =
    Rest_URL + '/2013-12-26/Accounts/' + ACCOUNT_SID + '/SMS/TemplateSMS?sig=' + sigParameter

  var body = {
    to: phone,
    appId: AppID,
    templateId: '1',
    datas: [code, '1']
  }

  var authorization = ACCOUNT_SID + ':' + time
  authorization = Base64.encode(authorization)
  var headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
    'Content-Length': JSON.stringify(body).length + '',
    Authorization: authorization
  }

  request(
    {
      method: 'POST',
      url: url,
      headers: headers,
      body: body,
      json: true
    },
    function (err, response, body) {
      //   console.log(err, response, body)
      callback(body.statusCode === '000000')
    }
  )
}
