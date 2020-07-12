import React from "react";
import {Route, Switch} from 'react-router-dom';
import {Home, Login, Signup, EditBrand, EditAmbassador, Profile} from '../pages';
import {ProtectedRoute } from '../components';

const Routes = () => {
  return (
    <>
      <Switch>
        <ProtectedRoute path="/edit-brand" component={EditBrand} />
        <ProtectedRoute path="/edit-ambassador" component={EditAmbassador} />
        <ProtectedRoute path="/brand-profile/" component={Profile}  data={{user:"brand"}} />
        <ProtectedRoute path="/ambassador-profile/" component={Profile}  data={{user:"ambassador"}}/>
      </Switch>
      <Route path="/" component={Home} exact />

      <Route path="/brand-login" render={(props) => <Login {...props} user="brand" />}/>
      <Route path="/ambassador-login" render={(props) => <Login {...props} user="ambassador" />}/>

      <Route path="/brand-signup" render={(props) => <Signup {...props} user="brand" />} />
      <Route path="/ambassador-signup" render={(props) => <Signup {...props} user="ambassador" />} />
    </>
  );
};

export {Routes};
