const express = require('express');
const router = express.Router();
const passport = require('passport');

const userContorller = require('../controllers/users.controller');
const brandContorller = require('../controllers/brand.controller');
//Auth and sign Up
router.post('/register', userContorller.register);
router.post('/login', userContorller.login);

//Customize and Protect the routes
router.all('*',(req, res, next)=>{
    passport.authenticate('jwt', {session: false}, (err, user)=>{
        if(err || !user) {
            const error = new Error('You are not autorized to access this area');
            error.status = 401;
            throw error;
        }
        req.user = user;
        return next();

    })(req, res, next);
});

//---------------Protected Routes-----------------//
router.get( '/profile', userContorller.profile);
router.post( '/brand', brandContorller.create);
router.get( '/brand', brandContorller.get);
router.delete( '/brand/:brand_id', brandContorller.delete);
router.put( '/brand/:brand_id', brandContorller.update);
   


module.exports = router;