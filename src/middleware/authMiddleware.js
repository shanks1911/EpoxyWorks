const setAuthVariable = (req, res, next) => {
    // Pass authentication status and user object to the response locals
    res.locals.isAuthenticated = req.isAuthenticated();
    res.locals.currentUser = req.user; // Set the current user for templates
    next();
  };
  
  module.exports = setAuthVariable;