const mongoose = require('mongoose')


mongoose.connect(process.env.MONGO_DB || 'mongodb://localhost/store-api',{
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})
.then(()=>console.log('DB is connected'))
.catch(error=>console.log(error))