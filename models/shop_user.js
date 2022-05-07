const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/xzw')

const Schema = mongoose.Schema

const shangpinSchema = new Schema({
  phone: { type: String, required: true },
  person_name: { type: String }, //昵称
  person_id: { type: String }, //账号
  password: { type: String }, //密码
  gender: { type: Number, default: 1 }, //1代表男，0代表女
  person_img_url: { type: String, default: '/public/image/moren.png' },
  person_money: { type: Number, default: 0 }, //余额
  person_ticket: { type: Array, default: [] }, //优惠券
  person_points: { type: Number, default: 0 }, //积分
  person_order: { type: Object }, //订单
  person_member: { type: Number, default: 0 } //会员,0代表没有会员,1代表普通会员,2代表超级会员,3代表至尊会员
})

module.exports = mongoose.model('shopuser', shangpinSchema)
const Shopuser = mongoose.model('shopuser', shangpinSchema)

var first = new Shopuser({
  phone: '19189508256',
  person_name: '天小稻',
  person_id: '123456789',
  password: 'q1w2e3r4t5',
  person_money: 100000,
  person_points: 10000,
  person_ticket: [
    { name: '超级吃货卡', amount: 10, type: '无门槛', limition: '限外卖到家业务使用', deadline: 30 },
    { name: '超级吃货卡', amount: 10, type: '无门槛', limition: '限外卖到家业务使用', deadline: 30 },
    { name: '超级吃货卡', amount: 10, type: '无门槛', limition: '限外卖到家业务使用', deadline: 30 },
    { name: '吃货联盟', amount: 18, type: '满30可用', limition: '限外卖到家业务使用', deadline: 30 },
    { name: '水果蔬菜吃货联盟', amount: 15, type: '满35可用', limition: '限外卖到家业务使用', deadline: 30 }
  ]
})
// first.save().then(
//   data => console.log(data),
//   err => console.log('shibai')
// )
// Shopuser.find({$or:[{goods_price:{$lt:200}}]},{id:true,_id:false}).limit(10)
//     .then((data) => console.log(data),
//         (err) => console.log('shibai'))
// Shopuser.find().then(
//   data => console.log(data),
//   err => console.log('shibai')
// )
// Shopuser.updateOne({ phone: '19189508256' }, { person_id: '123456789' }).then(
//   value => console.log('chenggong', value),
//   reason => console.log('shibai')
// )
// Shopuser.deleteMany().then(
//   data => console.log('chenggong'),
//   err => console.log('shibai')
// )
