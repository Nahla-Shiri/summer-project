const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const userController = {}
/**
 * Sign up
 */
userController.register = async(req, res, next) => {
   const {name, email, password, joined} =req.body;
   const newUser = new User({
    name,
    email,
    password,
    joined
   });

   try {
       const user = await newUser.save();
       return res.send( user );
       
   } catch (e) {
       if(e.code ===11000 && e.name ==="MongoError"){
           let error = new Error(`Email address ${newUser.email} is already taken`);
           next(error);
       }
       else{
         next(e);
       }
       
   }
};

userController.login = async (req,res,next)=> {

    //username, password in request
    const {email, password} = req.body;
    try {
        //Check username and password are ok
        const user = await User.findOne({email}); // eq {email: email}
        if(!user){
            const err = new Error(`the email ${email} was not found`);
            err.status = 401;
            next(err);
        }
        
        user.isPasswordMatch(password, user.password,(err, matched)=>{
            if(matched) {
               const secret = process.env.JWT_SECRET;
               const expire = process.env.JWT_EXPIRATION;
               const token = jwt.sign({_id: user._id}, secret, {expiresIn : expire});
               return res.send({token});
            }

            res.status(401).send({
                
                error : 'Invalid username / password combination'
            });
        })


        
    } catch (e) {
        next(e)
    }


};


userController.profile = (req, res, next) => {
    const { user } = req;
    res.send({ user });
}
module.exports = userController;