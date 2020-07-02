import React from 'react';
import { useDispatch, useSelector } from "react-redux";

import { saveBrand } from '../actions/brand_actions';
import { ErrorMessage } from '../components';
import BrandForm from '../components/BrandForm';

const AddBrand = () => {

  const dispatch = useDispatch();
  const handleFormSubmit = (values, bag) => {
      dispatch(saveBrand(values));
      bag.setSubmitting(false);
    }
  const saved = useSelector(state => state.brand.saved);
  
    return (
        <div>
          <ErrorMessage />
          <BrandForm onSubmit ={handleFormSubmit}/>
        </div>
    )
}

export default AddBrand
