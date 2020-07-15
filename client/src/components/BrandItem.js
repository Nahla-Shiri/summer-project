import React from 'react';
import { Link } from 'react-router-dom';
import { ListGroupItem, Card, CardImg, CardText, CardBody,CardTitle, } from 'reactstrap';

const BrandItem = ({ item }) => {
  return (
    <ListGroupItem>
        <Card>
          <CardImg top width="100%" src={item.logo} alt="{item.name}"  />
          <CardBody>
            <CardTitle>{item.name}</CardTitle>
            <CardText>{item.summary}</CardText>
            <Link to="/" className="more">+</Link>
          </CardBody>
        </Card>
     
    </ListGroupItem>
  );
};

export { BrandItem };