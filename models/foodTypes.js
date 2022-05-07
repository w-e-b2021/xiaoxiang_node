const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/xzw')

const Schema = mongoose.Schema

const shangpinSchema = new Schema({
    description: { type: String },
    image_url: { require: true, type: String },
    title: { require: true, type: String },
})

module.exports = mongoose.model('foodtype', shangpinSchema)
const Foodtype = mongoose.model('foodtype', shangpinSchema)

var first = new Foodtype({
    description: '吃了窜稀',
    image_url: '/public/image/moren.png',
    title: '黑化肥'
})
// first.save()
//     .then((data) => console.log(data),
//         (err) => console.log('shibai'))
// Foodtype.find({$or:[{goods_price:{$lt:200}}]},{id:true,_id:false}).limit(10)
//     .then((data) => console.log(data),
//         (err) => console.log('shibai'))
// Foodtype.find()
//     .then((data) => console.log(data),
//         (err) => console.log('shibai'))
// Foodtype.updateOne({ _id: '61baed7528360c4fa16aed6b' }, { id: 11 })
//     .then(value => console.log('chenggong'), reason => console.log('shibai'))
// Foodtype.deleteOne({ _id: '61e428f09a9b57eb350c99a2' })
//     .then(data => console.log('chenggong'), err => console.log('shibai'))