import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/fontello/css/fontello.css'
import './assets/sass/style.scss';


import App from './App';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
  <App />,
  document.getElementById('root')
);

serviceWorker.unregister();
