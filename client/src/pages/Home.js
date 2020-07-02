import React,{useEffect}from 'react';
import AddBrand from './AddBrand';
import { useDispatch, useSelector } from "react-redux";
import { fetchBrand } from '../actions/brand_actions'



const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
     dispatch(fetchBrand());
    }, [])

    
    const {fetching, brand} = useSelector(state => state.brand);
    
    console.log(brand);

    return (
        <div>
            <AddBrand />
            { brand  && fetching ? brand.map((item,key) => (
                <div key={key}>{item.title} {item.description}</div>
            )) : <span>spinner</span> }
            }
        </div>
    )
}

export { Home} 
