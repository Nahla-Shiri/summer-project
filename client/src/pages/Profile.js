import React from "react";
import {BrandProfile, AmbassadorProfile} from '../components'

const Profile = ({ user }) => {

  if (user === "brand") {
   
    return (
      <BrandProfile />
    );
  }

  return (
    <AmbassadorProfile />
  );
};

export { Profile };
