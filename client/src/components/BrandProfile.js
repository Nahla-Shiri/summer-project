import React, {useEffect} from 'react';

import { Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { deleteBrand } from "../actions/brand_actions";
import {getUserProfile} from "../actions/auth_actions";

const BrandProfile = () => {

    
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUserProfile());
   }, [])
  
    const onDelete = (e) => {
        dispatch(deleteBrand(profile._id));
      };
    return (
        <div className="brandProfile">
        <div className="profileHeader">
          <Link className="brandLogo">
            <img src={profile.logo} alt={profile.name} />
          </Link>
          <div className="float-right">
            <Link
              to={{
                pathname: "/edit-brand",
                state: profile,
              }}
              className="btn btn-secondary btn-sm "
            >
              Edit
            </Link>
            <Button
              color="danger"
              size="sm"
              onClick={onDelete}
              data-id={profile._id}
            >
              Detelte
            </Button>
          </div>
        </div>

        <div className="profileContent">
          <div className="profileTxt">
            <h2>À propos</h2>
            <div className="summary">{profile.summary}</div>
            <div className="description">{profile.description}</div>
          </div>
          <div className="profileContact">
            <h2>Contact</h2>
            <p>Email : {profile.email}</p>
            <p>Tel : {profile.tel}</p>
          </div>
        </div>
      </div>
    )
}

export {BrandProfile} 
