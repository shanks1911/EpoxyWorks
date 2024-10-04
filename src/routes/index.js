const express = require('express');
const multer  = require('multer')
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/authController');
const displayController=require('../controllers/displayController')
const adminController = require('../controllers/adminController');
const categoryController = require('../controllers/categoryController');


// Route to initiate Google Sign-In
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Route for handling Google Sign-In callback
router.get('/auth/google/callback', authController.googleSignIn);

//display controller
router.get("/",displayController.displayHomePage)

//admin controller
router.post('/add-product', adminController.addProduct);

//category controller
router.get('/category/:categoryId', categoryController.getCategoryProducts);


module.exports = router;


