const User = require('../models/userModel'),
  bcrypt = require('bcryptjs'),
  jwt = require('jsonwebtoken')

module.exports = {
  loginForm(req,res){
    res.render('loginForm',{title: 'Login',error:''})
  },
  signup(req,res){
    res.render('signup',{title: 'Registro de cuenta',error:''})
  },
  async signupPost(req,res){
   const user = await User.findOne({email:req.body.email})
    if(!user){
       const {username, email, password, password_conf} = req.body
       if(password !== password_conf){
         res.render('signup',{title:'Registo de cuenta', error:'Verifica que las contraseñas sean iguales',username,email})
       }else{
         const newUser = new User({username,email,password})
           newUser.password = await newUser.encryptPassword(password)
           newUser.save()
           .then(result=>{
             console.log(result)
             res.redirect('/')
           })
           .catch(err=>console.log(err))
          }
    }else{
      res.render('signup',{title:'Registro de cuenta', error: 'Ya existe una cuenta con ese correo'})
    }
   
  },
  loginPost(req,res){
    const {email,password} = req.body
    User.findOne({email})
      .exec()
      .then(user=>{
        if(user.email === process.env.EMAIL) console.log(`hola ${user.username}`)
        user
          ? bcrypt.compare(req.body.password,user.password)
              .then(result=>{
                result
                  ? jwt.sign({email : user.email, password: user.password},process.env.                 ACCESS_TOKEN_SECRET, {algorithm: 'HS256',expiresIn: '1h'},function(err,token){
                    res.cookie('token', token, { maxAge: 1000*60*60 })
                    res.redirect('/products')
                    })
                  : res.render('loginForm',{title:'Login',error: 'Contraseña inválida'})
              })
              .catch(err=>{
                console.log(err)
              })
              : res.render('loginForm',{title: 'Login', error: 'Correo inválido'})
      })
      .catch(error =>console.log(error))
  },
  logout(req,res){
    res.clearCookie('token')
    res.redirect('/')
  },
  deleteUser(req,res){
    User.findByIdAndDelete(req.params.id)
      .exec()
      .then(result=>{
        res.status(200).json({message: 'successfully deleted'})
      })
      .catch(err=>console.log(err))
  },
  getUsers(req,res){
    User.find()
      .exec()
      .then(result=>{
        res.status(200).json(result)
      })
      .catch(err=>console.log(err))
  }
}