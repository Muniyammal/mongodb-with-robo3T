const express = require('express');
const router = require('express-promise-router')();
const UsersController = require('../controllers/users');
router.route('/')
.get(UsersController.index)
.post(UsersController.newUser);

// /users/:id

router.route('/:userId')
.get(UsersController.getUser)
.put(UsersController.replaceUser)
.patch(UsersController.updateUser )
.delete(UsersController.deleteUser);


router.route('/:userId/cars')
.get(UsersController.getUserCars)
.post(UsersController.newUserCar);

module.exports = router;