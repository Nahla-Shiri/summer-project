const jwt = require('jsonwebtoken');
const Brand = require('../models/brand.model');

const brandController = {}

brandController.get = async (req, res, next) => {
    
    try {
        const  brand = await Brand.find();
        return res.send({
            brand
        })

    } catch (e) {
        next(e);
        
    }
};


brandController.getById = async (req, res, next) => {
    const {id} = req.body
    try {
        const  brand = await Brand.findById(id);
        console.log(brand)
        return res.send({
            brand
        })

    } catch (e) {
        next(e);
        
    }
};


brandController.register =  async (req, res, next )=> {
    const { name, email, password, tel, summary, description, logo} = req.body;
    const newBrand = new Brand({
        name,
        email,
        password,
        tel,
        summary,
        description,
        logo
    });


    try {
        
        const saved = await newBrand.save();
        return res.send({
            success: true,
            brand : saved
        })
    } catch (e) {
        next(e);
    }

};



brandController.update = async (req, res, next)=> {
    const brand_id = req.params.brand_id; 
    
    try {

        const updated = await Brand.update( {_id: brand_id}, { $set: req.body });
        res.send({
            success: true,
            brand: updated

        })
    } catch (e) {
        next(e);  
    }
   
};

brandController.delete = async (req, res, next)=> {
    const brand_id = req.params.brand_id;
    
    try {
        await Brand.deleteOne({_id: brand_id});
        res.send({
            success:true
        })
        
    } catch (e) {
        next(e);
    }
   };





brandController.login = async (req,res,next)=> {

    //brandname, password in request
    const {type, email, password } =req.body;
    try {
        //Check brandname and password are ok
        const brand = await Brand.findOne({email}); // eq {email: email}
       console.log(brand);
        if(!brand ){
           
            const err = new Error(`l'adresse e-mail ${email} n'existe pas`);
            err.status = 401;
            next(err);
        }
        else {
            brand.isPasswordMatch(password, brand.password,(err, matched)=>{
                if(matched) {
                   const secret = process.env.JWT_SECRET;
                   const expire = process.env.JWT_EXPIRATION;
                   const token = jwt.sign({_id: brand._id}, secret, {expiresIn : expire});
                   return res.send({token});
                }
    
                res.status(401).send({
                    
                    error : 'l email ou le mot de passe est incorrect'
                });
            })
        }
        


        
    } catch (e) {
        next(e)
    }


};


brandController.profile = (req, res, next) => {
    const { user } = req;
    res.send({ user });
}


module.exports = brandController;