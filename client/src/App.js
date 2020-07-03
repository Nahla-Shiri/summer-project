import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Home, Login, Signup, EditBrand} from './pages';
import { NavBar, ProtectedRoute } from './components';

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <ProtectedRoute path="/" component={Home} exact />
        <ProtectedRoute path="/edit-brand" component={EditBrand} exact />
      </Switch>
      <Route path="/login" component={Login} exact />
      <Route path="/signup" component={Signup} exact />
    </div>
  );
}

export default App;
