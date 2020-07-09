import React from "react";
import {Route, Switch} from 'react-router-dom';
import {Home, Login, Signup, EditBrand} from '../pages';
import {ProtectedRoute } from '../components';

const Routes = () => {
  return (
    <>
      <Switch>
        <ProtectedRoute path="/edit-brand" component={EditBrand} exact />
      </Switch>
      <Route path="/" component={Home} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/signup" component={Signup} exact />
    </>
  );
};

export {Routes};
