import React, {useEffect} from 'react';
import { Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {Slider } from '../components';
import { deleteBrand } from "../actions/brand_actions";
import {getUserProfile} from "../actions/auth_actions";

import slide1 from "../assets/img/ella-jardim-M0zs81FNm6s-unsplash.jpg";
import slide2 from "../assets/img/andrew-ridley-jR4Zf-riEjI-unsplash.jpg";

const BrandProfile = () => {

    
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUserProfile());
   }, [])
  
    const onDelete = (e) => {
        dispatch(deleteBrand(profile._id));
      };

      
const slides = [
  {
    src: slide1,
    altText: profile.name,
    caption: profile.name,
  },
  {
    src: slide2,
    altText: profile.name,
    caption: profile.name
  },
 
];
    return (
        <div className="brandProfile">
        <div className="profileHeader">
        <Slider slides={slides}/>
        <Link className="brandLogo">
          <img src={profile.logo} alt={profile.name} />
        </Link>
        <div className="profileAction">
          <Link
            to={{
              pathname: "/edit-brand",
              state: profile,
            }}
            className="btn"
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
            <h2>À propos</h2>
            <div className="summary">{profile.summary}</div>
            <div className="description">{profile.description}</div>
          </div>
          <div className="profileContact">
            <h2>Contact</h2>
            <p>Email : {profile.email}</p>
            <p>Tel : {profile.tel}</p>
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

export {BrandProfile} 
