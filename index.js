const express = require('express'),
    app = express(),
    override = require('method-override')('_method'),
    cookieParser = require('cookie-parser'),
    port = process.env.PORT || 3000,
    publicDir = express.static(`${__dirname}/public`),
    viewDir = `${__dirname}/views`,
    productRoutes = require('./routes/productRoutes'),
    usersRoutes = require('./routes/usersRoutes')

require('dotenv').config()
require('./database')
// SETTINGS
app
  .set('views',viewDir)
  .set('view engine','pug')
  .set('port',port)

  // MIDDLEWARES
app
  .use(express.json())
  .use(express.urlencoded({extended: false}))
  .use(cookieParser())
  .use(publicDir)
  .use(override)
  
  // CORS ERRORS
  app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if(req.method === 'OPTIONS'){
      res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET')
      return res.status(200).json({})
    }
    next()
  })
  // ROUTES
app
  .use(productRoutes)
  .use(usersRoutes)


// SERVER

app.listen(app.get('port'),()=> console.log(`Aplicación corriendo por el puerto ${app.get('port')}`))