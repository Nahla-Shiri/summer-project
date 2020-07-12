const express = require('express');
const router = express.Router();
const passport = require('passport');

const userContorller = require('../controllers/users.controller');
const brandContorller = require('../controllers/brand.controller');
const ambassadorContorller = require('../controllers/ambassador.controller');

router.post('/ambassador-register', ambassadorContorller.register);
router.post('/ambassador-login', ambassadorContorller.login);
router.post( '/brand-register', brandContorller.register);
router.post( '/brand-login', brandContorller.login);
router.get( '/brands', brandContorller.get);
router.get( '/ambassadors', ambassadorContorller.get);

//Customize and Protect the routes
let protected =['/brand-profile', '/brand/:brand_id','/ambassador-profile'] ;
router.all(protected,(req, res, next)=>{
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


router.delete( '/brand/:brand_id', brandContorller.delete);
router.put( '/brand/:brand_id', brandContorller.update);

router.delete( '/ambassador/:ambassador_id', ambassadorContorller.delete);
router.put( '/ambassador/:ambassador_id', ambassadorContorller.update);
   


module.exports = router;