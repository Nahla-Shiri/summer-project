import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { BrandForm, AmbassadorForm, ErrorMessage } from "../components";
import { saveBrand } from "../actions/brand_actions";
import { saveAmbassador } from "../actions/ambassador_actions";

import brandImg from "../assets/img/stil-D4jRahaUaIc-unsplash.jpg";
import ambassadorImg from "../assets/img/michael-dam-mEZ3PoFGs_k-unsplash.jpg";

const Signup = ({ user }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const brand_saved = useSelector((state) => state.brand.saved);
  const ambassador_saved = useSelector((state) => state.ambassador.saved);
  const upload = useSelector(state=>state.upload.file);
  if (user === "brand") {
    
    if (brand_saved) {
      history.push("brand-login");
    }

    const handleBrandFormSubmit = (values, bag) => {
      if(upload) values.logo = upload;
      dispatch(saveBrand(values));
      bag.setSubmitting(false);
    };

    return (
      <div className="formContainer">
        <div className="formImg">
           <img src={brandImg} alt ="brand signup"/>
        </div>
        <div className="formContent">
          <h1>Créer votre Profile de marque</h1>
          <ErrorMessage />
          <BrandForm onSubmit={handleBrandFormSubmit} />
        </div>
      </div>
    );
  }

 
  if (ambassador_saved) {
    history.push("ambassador-login");
  }

  const handleAmbassadorFormSubmit = (values, bag) => {
    if(upload) values.photo = upload;
    dispatch(saveAmbassador(values));
    bag.setSubmitting(false);
  };

  return (
    <div className="formContainer">
        <div className="formImg">
           <img src={ambassadorImg} alt ="ambassador signup"/>
        </div>
        <div className="formContent">
      <h1>Créer votre Profile ambassadrcie</h1>
      <ErrorMessage />
      <AmbassadorForm onSubmit={handleAmbassadorFormSubmit} />
    </div>
    </div>
  );
};
export { Signup };
