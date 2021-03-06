import React from 'react';
import { useDispatch, useSelector, } from "react-redux";
import { useHistory } from "react-router-dom";

import { BrandForm, ErrorMessage } from '../components';
import { updateBrand } from '../actions/brand_actions';

const EditBrand = (props) => {
    
    const history = useHistory();
    const dispatch = useDispatch();
    const updated = useSelector(state => state.brand.updated);
    const logo = useSelector(state=>state.upload.file);
    let item ; // get item from location state

    try {
        item = props.location.state;
    } catch (e) {
        item = undefined;
    }
    
    if ( updated ) 
    {
      history.push('/brand-profile')
    }
    
    const handleFormSubmit = (values, bag) => {
        item = props.location.state;
        values._id = item._id;
        if(logo) values.logo = logo;
        dispatch(updateBrand(values));
        bag.setSubmitting(false);
    }

    
    return (
        <div className="formContainer">
            <div className="formContent m-auto">
                <img src={item.logo} alt ="brand logo" className="logoImg" />
                <h1 className="center">Modifiez votre profile</h1>
                <ErrorMessage />
                <BrandForm  btnTxt="Modifier" type="edit" brand={item} onSubmit={handleFormSubmit}   />
            </div>
        </div>
    )
}

export {EditBrand} 
