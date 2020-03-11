const router = require('express').Router(),
    productController = require('../controllers/productController')

router
  .get('/products',productController.getAllProducts)
  .get('/add',productController.addForm)
  .post('/add',productController.save)
  .get('/edit/:id',productController.getOne)
  .put('/update/:id',productController.update)
  .delete('/delete/:id',productController.delete)
  .get('/jsonProducts',productController.getAllJsonProducts)
  .get('/jsonProducts/:id',productController.getOneJson)


module.exports = router