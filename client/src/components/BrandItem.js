import React from 'react';
import { ListGroupItem, Button, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle} from 'reactstrap';
import { Link } from 'react-router-dom';

const BrandItem = ({ item , onDelete }) => {
  return (
    <ListGroupItem>
      <div className="float-left">
        <Card>
          <CardImg top width="100%" src={item.logo} alt="Card image cap" />
          <CardBody>
            <CardTitle>{item.name}</CardTitle>
            <CardText>{item.description}</CardText>
            <Button>+</Button>
          </CardBody>
        </Card>
      </div>
      <div className="float-right">
        <Link
          to={{
            pathname: '/edit-brand',
            state: { item }
          }}
          className="btn btn-secondary btn-sm"
        >
          Edit
        </Link>
        <Button color="danger" size="sm" onClick={onDelete} data-id={item._id}>Detelte</Button>
       
      </div>
    </ListGroupItem>
  );
};

export { BrandItem };