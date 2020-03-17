const mongoose = require('mongoose'),
  moment = require('moment'),
  bcrypt = require('bcryptjs'),
  Schema = mongoose.Schema,
  UserSchema = Schema({
    username:{type: String, required: true},
    email: {
      type: String, 
      required: true, 
      unique: true, 
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {type: String, required: true},
    date: {type: Date, default: new Date().getTime()},
    signupDate: {type: String, default: moment().format('MMMM Do YYYY, h:mm:ss a')}
  })

  UserSchema.methods.encryptPassword = async password =>{
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)
    return hash
  }

module.exports = mongoose.model('User',UserSchema)