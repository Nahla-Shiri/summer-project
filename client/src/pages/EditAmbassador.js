import React from 'react';
import { useDispatch, useSelector, } from "react-redux";
import { useHistory } from "react-router-dom";

import { AmbassadorForm, ErrorMessage } from '../components';
import { updateAmbassador } from '../actions/ambassador_actions';


const EditAmbassador = (props) => {
    
    const history = useHistory();
    const dispatch = useDispatch();
    const updated = useSelector(state => state.ambassador.updated);
    const photo = useSelector(state=>state.upload.file);
    let item ; // get item from location state

    try {
        item = props.location.state;
    } catch (e) {
        item = undefined;
    }
    
    if ( updated ) 
    { 
      history.push('/ambassador-profile')
    }
    
    const handleFormSubmit = (values, bag) => {
        item = props.location.state;
        values._id = item._id;
        if(photo) values.photo = photo;
        
        dispatch(updateAmbassador(values));
        
        bag.setSubmitting(false);
    }

    
    return (
        
        <div className="formContainer">
         <div className="formContent m-auto">
        <img src={item.photo} alt ="brand logo" className="profileImg" />
            <h1 className="center">Modifiez votre profile</h1>
            <ErrorMessage />
            <AmbassadorForm  btnTxt="Modifier" type="edit" ambassador={item} onSubmit={handleFormSubmit}   />
        </div>
        </div>
    )
}

export {EditAmbassador} 
