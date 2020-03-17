const router = require('express').Router(),
  UsersController = require('../controllers/usersController')

router
  .get('/',UsersController.loginForm)
  .get('/signup',UsersController.signup)
  .post('/signup',UsersController.signupPost)
  .post('/login',UsersController.loginPost)
  .get('/logout',UsersController.logout)
  .get('/users',UsersController.getUsers)
  .delete('/users/:id',UsersController.deleteUser)

module.exports = router