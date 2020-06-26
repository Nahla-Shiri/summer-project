import React from 'react';
import {Route} from 'react-router-dom';
import {Home, Login} from './pages';
import { NavBar } from './components';

function App() {
  return (
    <div>
      <NavBar />
      <Route path="/" component={Home} exact />
      <Route path="/login" component={Login} exact />
    </div>
  );
}

export default App;
