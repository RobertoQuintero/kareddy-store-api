const jwt = require('jsonwebtoken')

 function authenticateToken (req,res,next){
  const token = req.cookies.token
  if(token == null) return res.redirect('/')

  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
    if(err) return res.json({message: 'No autorizado'})
    req.user = user
    next()
  })
}

module.exports = authenticateToken