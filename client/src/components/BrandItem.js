import React from 'react';
import { ListGroupItem, Button} from 'reactstrap';
import { Link } from 'react-router-dom';

const BrandItem = ({ item , onDelete }) => {
  return (
    <ListGroupItem>
      <div className="float-left">
        <span >
          {item.title}
        </span>
        
        <div className="text-muted">{item.description}</div>
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