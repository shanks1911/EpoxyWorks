// src/controllers/authController.js
const passport = require('passport');
const User = require('../models/customersModel')
exports.googleSignIn = (req, res) => {
    // Use Passport's authentication middleware
    passport.authenticate('google', { failureRedirect: '/' }, (err, user) => {
      if (err) {
        // Handle error during authentication
        console.log('aa')
        return res.redirect('/'); // Redirect to home page on error
      }
      if (!user) {
        // No user was found, authentication failed
        return res.redirect('/'); // Redirect to home page if no user
      }
      
      // If successful, log in the user
      req.logIn(user, (err) => {
        if (err) {
          // Error during login process
          return res.redirect('/'); // Redirect to home page on error
        }
        // Successful login, redirect to the home page
        return res.redirect('/');
      });
    })(req, res);
  };
  