import React,{ useEffect } from 'react';
import { ListGroup } from 'reactstrap';
import { BrandItem, Slider } from '../components';
import AddBrand from './AddBrand';
import { useDispatch, useSelector } from "react-redux";
import { fetchBrand , deleteBrand } from '../actions/brand_actions';




const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
     dispatch(fetchBrand());
    }, [])

    
    const {fetching, brand} = useSelector(state => state.brand);
    
    const onDelete = (e) => {
        const BrandId = e.target.attributes.getNamedItem('data-id').value;
        dispatch(deleteBrand(BrandId));
    }

    return (
        <div>
            <Slider/>
            <AddBrand />
            <ListGroup>
            { brand  && fetching ? brand.map(item => (
            <BrandItem key={item._id} item={item} onDelete={onDelete} />
            )) : <span>spinner</span> }
            </ListGroup>
        </div>
    )
}

export { Home} 
