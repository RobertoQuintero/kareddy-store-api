const mongoose = require('mongoose'),
  moment = require('moment'),
  Schema = mongoose.Schema,
  ProductSchema = Schema({
    id: String,
    productType: {type: String, enum: ['Bolso']},
    name: String,
    description: String,
    price: { type:Number,default: 0},
    material: String,
    color: String,
    model: String,
    category: {type: String, enum:['Dama']},
    image: String,
    date: {type: Date, default: new Date().getTime()},
    fullDate: String,
    updateDate: String
  })

module.exports = mongoose.model('Porduct',ProductSchema)