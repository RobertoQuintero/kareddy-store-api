const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost/store-api',{
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})
.then(()=>console.log('DB is connected'))
.catch(error=>console.log(error))