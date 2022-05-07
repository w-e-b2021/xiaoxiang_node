const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/xzw')

const Schema = mongoose.Schema

const shangpinSchema = new Schema({
  image_url: { require: true, type: String },
  value: { require: true, type: String },
  id: { type: Number }
})

module.exports = mongoose.model('cpatcha', shangpinSchema)
const Cpatcha = mongoose.model('cpatcha', shangpinSchema)

var first = new Cpatcha({
  image_url: '/public/image/captcha.svg',
  value: 'wk3v',
  id: 1
})
// first.save().then(
//   data => console.log(data),
//   err => console.log('shibai')
// )
// Foodtype.find({$or:[{goods_price:{$lt:200}}]},{id:true,_id:false}).limit(10)
//     .then((data) => console.log(data),
//         (err) => console.log('shibai'))
// Cpatcha.find().then(
//   data => console.log(data),
//   err => console.log('shibai')
// )
// Foodtype.updateOne({ _id: '61baed7528360c4fa16aed6b' }, { id: 11 })
//     .then(value => console.log('chenggong'), reason => console.log('shibai'))
// Cpatcha.deleteOne({ _id: '61e68b1b1df48ad01cc7fd4e' }).then(
//   data => console.log('chenggong'),
//   err => console.log('shibai')
// )
