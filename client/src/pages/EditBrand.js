import React from 'react';
import { useDispatch, useSelector, } from "react-redux";
import { useHistory } from "react-router-dom";

import { BrandForm, ErrorMessage } from '../components';
import { updateBrand } from '../actions/brand_actions';

const EditBrand = (props) => {
    
    const history = useHistory();
    const dispatch = useDispatch();
    const updated = useSelector(state => state.brand.updated);
    let item ; // get item from location state

    try {
        item = props.location.state.item;
    } catch (e) {
        item = undefined;
    }
    
    if ( updated ) 
    {
      history.push('/')
    }

    const handleFormSubmit = (values, bag) => {
        item = props.location.state.item;
        values._id = item._id;
        dispatch(updateBrand(values));
        bag.setSubmitting(false);
    }

    
    return (
        
        <div>
            <h3>Edit Brand</h3>
            <hr/>
            <ErrorMessage />
            <BrandForm  btnTxt="update" brand={item} onSubmit={handleFormSubmit}   />
        </div>
    )
}

export {EditBrand} 
