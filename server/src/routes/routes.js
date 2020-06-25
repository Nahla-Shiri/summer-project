const express = require('express');
const router = express.Router();
const passport = require('passport');

const userContorller = require('../controllers/users.controller');

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

router.get(
    '/brand',
    (req, res, next)=> {
        return res.send({ message : 'Hi you are autenticated',
                          user: req.user
                    });
    }
);

module.exports = router;