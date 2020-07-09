import React,{ useEffect } from 'react';
import { ListGroup } from 'reactstrap';
import { BrandItem, Slider } from '../components';
import AddBrand from './AddBrand';
import { useDispatch, useSelector } from "react-redux";
import { fetchBrand} from '../actions/brand_actions';

import slide1 from "../assets/img/paper-bags-near-wall-749353.jpg";
import slide2 from "../assets/img/woman-wearing-maroon-velvet-plunge-neck-long-sleeved-dress-972995.jpg";




const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
     dispatch(fetchBrand());
    }, [])

    
    const {fetching, brand} = useSelector(state => state.brand);
    
  

    

const slides = [
  {
    src: slide1,
    altText: 'Slide 1',
    caption: 'trouver votre ambassadrice de marques en un click',
  },
  {
    src: slide2,
    altText: 'Slide 2',
    caption: 'trouver votre ambassadrice de marques en un click'
  },
 
];

    return (
        <div>
            <Slider slides={slides}/>
            <AddBrand />
            <ListGroup>
            { brand  && fetching ? brand.map(item => (
            <BrandItem key={item._id} item={item}  />
            )) : <span>spinner</span> }
            </ListGroup>
        </div>
    )
}

export { Home} 
