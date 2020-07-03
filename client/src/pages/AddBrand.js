import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { saveBrand } from '../actions/brand_actions';
import {BrandForm, ErrorMessage } from '../components/';

const AddBrand = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleFormSubmit = (values, bag) => {
      dispatch(saveBrand(values));
      bag.setSubmitting(false);
    }
  const saved = useSelector(state => state.brand.saved);
  console.log(saved);

  /*if ( saved ) 
    {
      history.push('/')
    }*/
  
    return (
        <div>
          <ErrorMessage />
          <BrandForm onSubmit ={handleFormSubmit}/>
        </div>
    )
}

export default AddBrand
