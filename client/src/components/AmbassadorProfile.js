import React from 'react';

import { Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { deleteAmbassador } from "../actions/ambassador_actions";

const AmbassadorProfile = () => {

    
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);
    const onDelete = (e) => {
        dispatch(deleteAmbassador(profile._id));
      };
    return (
        <div className="brandProfile">
        <div className="profileHeader">
          <Link className="brandLogo">
            <img src={profile.photo} alt={profile.name} />
          </Link>
          <div className="float-right">
            <Link
              to={{
                pathname: "/edit-ambassador",
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
            <h2>Adresse :</h2>
            <div className="address">{profile.steet} {profile.city} {profile.cp} {profile.country}</div>
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

export {AmbassadorProfile} 
