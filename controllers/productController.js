const Product = require('../models/productModel')

module.exports = {
  getAllProducts(req,res){
    Product
      .find()
      .exec()
      .then(result=>{
        res.render('index',{
          title: 'Productos',
          data: [...result]
        })
      })
      .catch(error=>console.log(error))
  },
  getAllJsonProducts(req,res){
    Product
      .find()
      .exec()
      .then(result=>{
        res.status(200).json(result)
      })
      .catch(error=>console.log(error))
  },
   save(req,res){
    const product = new Product(req.body)
    product
      .save()
      .then(result =>{
        res.redirect('/products')
      })
      .catch(err=>{
        console.log(err)
      })
  },
  getOne(req,res){
    let id = req.params.id
    Product.findById(id)
      .exec()
      .then(result=>{
        res.render('edit',{
          title: 'Actualizar Producto',
          data: result
        })
      })
      .catch(err=>console.log(err))
  },
  getOneJson(req,res){
    let id = req.params.id
    Product.findById(id)
      .exec()
      .then(result=>{
        res.status(200).json(result)
      })
      .catch(err=>console.log(err))
  },
  update(req,res){
    let id = req.params.id
    Product.findByIdAndUpdate(id,req.body)
      .exec()
      .then(result=>{
        console.log(result)
        res.redirect('/products')
      })
      .catch(err=>console.log(err))
  },
  delete(req,res){
    let id = req.params.id
    Product.findByIdAndDelete(id)
      .exec()
      .then(result=>{
        console.log('deleted')
        res.redirect('/products')
      })
      .catch(err=>console.log(err))
  },
  addForm(req,res){
    res.render('addProduct',{title: 'Agregar Producto'})
  }
}