const jwt = require('jsonwebtoken');
const Ambassador = require('../models/ambassador.model');
const ambassadorController = {}
/**
 * Sign up
 */

ambassadorController.register = async(req, res, next) => {
   const {name, email, tel, password, photo, street,cp,city,country,brand } =req.body;
   const newAmbassador = new Ambassador({
    name,
    email,
    tel,
    password,
    photo,
    street,
    cp,
    city,
    country,
    brand
   });

   try {
       const ambassador = await newAmbassador.save();
       return res.send( ambassador );
       
   } catch (e) {
       if(e.code ===11000 && e.name ==="MongoError"){
           let error = new Error(`L'adresse e-mail ${newAmbassador.email} existe déja`);
           next(error);
       }
       else{
         next(e);
       }
       
   }
};


ambassadorController.update = async (req, res, next)=> {
    const ambassador_id = req.params.ambassador_id; 
    
    try {

        const updated = await Ambassador.update( {_id: ambassador_id}, { $set: req.body });
        res.send({
            success: true,
            ambassador: updated

        })
    } catch (e) {
        next(e);  
    }
   
};

ambassadorController.delete = async (req, res, next)=> {
    const ambassador_id = req.params.ambassador_id;
    
    try {
        await Ambassador.deleteOne({_id: ambassador_id});
        res.send({
            success:true
        })
        
    } catch (e) {
        next(e);
    }
   };

ambassadorController.login = async (req,res,next)=> {

    //ambassadorname, password in request
    const {type, email, password } =req.body;
    try {
        //Check ambassadorname and password are ok
        const ambassador = await Ambassador.findOne({email}); // eq {email: email}
        if(!ambassador){
            const err = new Error(`l'adresse e-mail ${email} n'existe pas`);
            err.status = 401;
            next(err);
        }
        
        ambassador.isPasswordMatch(password, ambassador.password,(err, matched)=>{
            if(matched) {
               const secret = process.env.JWT_SECRET;
               const expire = process.env.JWT_EXPIRATION;
               const token = jwt.sign({_id: ambassador._id}, secret, {expiresIn : expire});
               return res.send({token});
            }

            res.status(401).send({
                
                error : 'l email ou le mot de passe est incorrect'
            });
        })


        
    } catch (e) {
        next(e)
    }


};

ambassadorController.get = async (req, res, next) => {
    
    try {
        const  ambassador = await Ambassador.find();
        return res.send({
            ambassador
        })

    } catch (e) {
        next(e);
        
    }
    Ambassador.find();
};


ambassadorController.profile = (req, res, next) => {
    const { user } = req;
    res.send({ user });
}


module.exports = ambassadorController;