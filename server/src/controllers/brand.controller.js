
const Brand = require('../models/brand.model');

const brandController = {}

brandController.get = async (req, res, next) => {
    const { user } = req;
    const query = {
        owner : user._id
    }

    try {
        const  brand = await Brand.find(query);
        return res.send({
            brand
        })

    } catch (e) {
        next(e);
        
    }
  Brand.find();
};

brandController.create =  async (req, res, next )=> {
    const { title, description } = req.body;
    const newBrand = new Brand({
        title,
        description,
        owner : req.user
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
    const { title, description } = req.body;
    try {

        const check = await Brand.findOne({ _id: brand_id });
        if (!check.owner.equals(req.user._id)) {
            const err = new Error('This exepense object does not belong to you!');
            err.status = 401;
            throw err;
        }
        const updated = await Brand.update( {_id: brand_id}, {title, description} );
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
   
       const check = await Brand.findOne({ _id: brand_id });
           if (!check.owner.equals(req.user._id)) {
               const err = new Error('This exepense object does not belong to you!');
               err.status = 401;
               throw err;
           }
        await Brand.deleteOne({_id: brand_id});
        res.send({
            success:true
        })
        
    } catch (e) {
        next(e);
    }
   };


module.exports = brandController;