import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { BrandForm, AmbassadorForm, ErrorMessage } from "../components";
import { saveBrand } from "../actions/brand_actions";
import { saveAmbassador } from "../actions/ambassador_actions";

const Signup = ({ user }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const brand_saved = useSelector((state) => state.brand.saved);
  const ambassador_saved = useSelector((state) => state.ambassador.saved);
  const photo = useSelector(state=>state.upload.file);
  if (user === "brand") {
    if (brand_saved) {
      history.push("brand-login");
    }

    const handleBrandFormSubmit = (values, bag) => {
      if(photo) values.photo = photo;
      dispatch(saveBrand(values));
      bag.setSubmitting(false);
    };

    return (
      <div>
        <h1>Créer votre Profile marque</h1>
        <ErrorMessage />
        <BrandForm onSubmit={handleBrandFormSubmit} />
      </div>
    );
  }
  if (ambassador_saved) {
    history.push("ambassador-login");
  }

  const handleAmbassadorFormSubmit = (values, bag) => {
    if(photo) values.photo = photo;
    dispatch(saveAmbassador(values));
    bag.setSubmitting(false);
  };

  return (
    <div>
      <h1>Créer votre Profile marque</h1>
      <ErrorMessage />
      <AmbassadorForm onSubmit={handleAmbassadorFormSubmit} />
    </div>
  );
};
export { Signup };
