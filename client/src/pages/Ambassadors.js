import React,{ useEffect } from 'react';
import { ListGroup , ListGroupItem, Card, CardImg, CardText, CardBody,CardTitle } from 'reactstrap';
import { useDispatch, useSelector } from "react-redux";
import { fetchAmbassador} from '../actions/ambassador_actions';

const Ambassadors = () => {
    const dispatch = useDispatch();
    useEffect(() => {
     dispatch(fetchAmbassador());
    }, [])
    const  {ambassador} = useSelector(state => state.ambassador);
   console.log(ambassador);
    return (
        <ListGroup>
            { ambassador ? ambassador.map(amb => (
            <ListGroupItem>
            <Card>
              <CardImg top width="100%" src={amb.photo}   />
              <CardBody>
                <CardTitle>
                <p>{amb.name} </p>
                <div className="rating"><i className="icon-star"></i><i className="icon-star"></i><i className="icon-star"></i><i className="icon-star"></i><i className="icon-star-empty"></i></div>
                </CardTitle>
                <CardText>
                    <p><strong>Adresse : </strong>{amb.steet} {amb.city} {amb.cp} {amb.country}</p>
                    <p><strong>Email : </strong>{amb.email}</p>
                    <div className="social">
                        <a href="#"><i className="icon-facebook-squared"></i></a>
                        <a href="#"><i className="icon-twitter-squared"></i></a>
                        <a href="#"><i className="icon-instagram"></i></a>
                        </div>
                </CardText>
               
              </CardBody>
            </Card>
         
        </ListGroupItem>
            )) : <span>spinner</span> }
            </ListGroup>
    )
}

export  {Ambassadors}
