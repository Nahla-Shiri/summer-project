import React ,{useEffect} from 'react';

import { Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { deleteAmbassador } from "../actions/ambassador_actions";
import {getUserProfile} from "../actions/auth_actions";

const AmbassadorProfile = () => {

    
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUserProfile());
   }, [])
  
    const onDelete = (e) => {
        dispatch(deleteAmbassador(profile._id));
      };
    return (
        <div className="ambassadorProfile">
        <div className="profileHeader">
          <div className="location">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3193.350060331005!2d10.239141014971642!3d36.83409147994162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd3541c4f22e55%3A0x5b7225d7fdbb3801!2sGoMyCode!5e0!3m2!1sen!2stn!4v1594911196090!5m2!1sen!2stn" ></iframe>
          </div>
          <div className="photo">
            <img src={profile.photo} alt={profile.name} />
          </div>
          <div className="profileAction">
            <Link
              to={{
                pathname: "/edit-ambassador",
                state: profile,
              }}
              className="btn "
            >
              Modifier
            </Link>
            <Button
              color="white"
              onClick={onDelete}
              data-id={profile._id}
            >
              Supprimer
            </Button>
          </div>
        </div>

        <div className="profileContent">
            
          <div className="profileTxt">
            <h1>{profile.name}</h1>
            <div className="rating"><i className="icon-star"></i><i className="icon-star"></i><i className="icon-star"></i><i className="icon-star"></i><i className="icon-star-empty"></i></div>
            <h2>Adresse :</h2>
            <div className="address">{profile.steet} {profile.city} {profile.cp} {profile.country}</div>
          </div>
          <div className="profileContact">
            <h2>Contact</h2>
            <p>Email : {profile.email}</p>
            <p>Téléphone : {profile.tel}</p>
            <div className="social">
              <a href="#"><i className="icon-facebook-squared"></i></a>
              <a href="#"><i className="icon-twitter-squared"></i></a>
              <a href="#"><i className="icon-instagram"></i></a>
            </div>
          </div>
        </div>
      </div>
    )
}

export {AmbassadorProfile} 
