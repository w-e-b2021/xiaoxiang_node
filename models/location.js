const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/xzw')

const Schema = mongoose.Schema

const shangpinSchema = new Schema({
  address: { required: true, type: String },
  city: { require: true, type: String },
  geohash: { require: true, type: String }
})

module.exports = mongoose.model('location', shangpinSchema)
const Location = mongoose.model('location', shangpinSchema)

var first = new Location({
  address: '向家村五组',
  city: '邵阳市',
  geohash: '111.13,27.175'
})
// first.save()
//     .then((data) => console.log(data),
//         (err) => console.log('shibai'))
// Location.find({$or:[{goods_price:{$lt:200}}]},{id:true,_id:false}).limit(10)
//     .then((data) => console.log(data),
//         (err) => console.log('shibai'))
// Location.find().then(
//   data => console.log(data),
//   err => console.log('shibai')
// )
// Location.updateOne({ _id: '61baed7528360c4fa16aed6b' }, { id: 11 })
//     .then(value => console.log('chenggong'), reason => console.log('shibai'))
// Location.deleteOne({ _id: '61baef65bf8099c2b8affa7a' })
//     .then(data => console.log('chenggong'), err => console.log('shibai'))
