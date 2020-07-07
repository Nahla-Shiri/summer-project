const express = require('express');
const router = express.Router();
const passport = require('passport');

const userContorller = require('../controllers/users.controller');
const brandContorller = require('../controllers/brand.controller');
const ambassadorContorller = require('../controllers/ambassador.controller');
//Auth and sign Up
router.post('/ambassador-register', ambassadorContorller.register);
router.post('/ambassador-login', ambassadorContorller.login);
router.post( '/brand-register', brandContorller.register);
router.post( '/brand-login', brandContorller.login);


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
router.get( '/ambassador-profile', ambassadorContorller.profile);
router.get( '/brand-profile', brandContorller.profile);

router.get( '/brands', brandContorller.get);
router.get( '/ambassadors', ambassadorContorller.get);
router.delete( '/brand/:brand_id', brandContorller.delete);
router.put( '/brand/:brand_id', brandContorller.update);
   


module.exports = router;