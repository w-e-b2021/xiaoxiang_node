const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/xzw')

const Schema = mongoose.Schema

const shangpinSchema = new Schema({
  name: { required: true, type: String },
  address: { required: true, type: String },
  category: { required: true, type: String }, //店铺分类
  least_money: { require: true, type: Number }, //最少起送
  delivery_fee: { require: true, type: String }, //配送费
  distance: { type: String },
  delivery_time: { required: true, type: String }, //配送时间
  phone: { required: true, type: String }, //商家电话
  mention_info: { type: String }, //商家提醒客户信息
  sore: { required: true, type: Number }, //店铺评分
  recent_order_num: { require: true, type: Number }, //最近点餐数
  status: { required: true, type: Number, default: 1 }, //店铺状态
  supports: { required: true, type: String }, //保障
  delivery_mode: { required: true, type: String }, //配送方式
  img_url: { type: String }
})

module.exports = mongoose.model('shoplist', shangpinSchema)
const Shoplist = mongoose.model('shoplist', shangpinSchema)

var first = new Shoplist({
  name: '肯德基',
  address: 'America',
  category: '/简餐/汉堡',
  least_money: 29,
  delivery_fee: '免费',
  distance: '31050.2公里',
  delivery_time: '2小时',
  phone: '18230662060',
  mention_info: '欢迎光临,用餐高峰期,请提前下单',
  sore: 3.2,
  recent_order_num: 20,
  status: 1,
  supports: '保准香',
  delivery_mode: '小象专送',
  img_url: '/public/shop_images/6.jpg'
})
// first.save().then(
//   data => console.log(data),
//   err => console.log('shibai')
// )
// Shoplist.find({$or:[{goods_price:{$lt:200}}]},{id:true,_id:false}).limit(10)
//     .then((data) => console.log(data),
//         (err) => console.log('shibai'))
// let word = '简餐'
// Shoplist.find({ $or: [{ category: eval('/' + word + '/') }, { address: '隆回万达' }] }).then(
//   data => console.log(data),
//   err => console.log('shibai')
// )
// Shoplist.updateOne({ _id: '61baed7528360c4fa16aed6b' }, { id: 11 })
//     .then(value => console.log('chenggong'), reason => console.log('shibai'))
// Shoplist.deleteOne({ _id: '61e65a6393db8e2149474020' }).then(
//   data => console.log('chenggong'),
//   err => console.log('shibai')
// )
