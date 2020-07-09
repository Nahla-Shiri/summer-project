import React from "react";
import {Route, Switch} from 'react-router-dom';
import {Home, Login, Signup, EditBrand, Profile} from '../pages';
import {ProtectedRoute } from '../components';

const Routes = () => {
  return (
    <>
      <Switch>
        <ProtectedRoute path="/edit-brand" component={EditBrand} exact />
        <ProtectedRoute path="/profile" component={Profile} exact />
      </Switch>
      <Route path="/" component={Home} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/signup" component={Signup} exact />
    </>
  );
};

export {Routes};
