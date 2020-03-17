const router = require('express').Router(),
    productController = require('../controllers/productController'),
    auth = require('../services/jsonwebtoken')

router
  .get('/products',auth,productController.getAllProducts)
  .get('/add',auth,productController.addForm)
  .post('/add',auth,productController.save)
  .get('/edit/:id',auth,productController.getOne)
  .put('/update/:id',auth,productController.update)
  .delete('/delete/:id',auth,productController.delete)
  .get('/jsonProducts',productController.getAllJsonProducts)
  .get('/jsonProducts/:id',productController.getOneJson)


module.exports = router