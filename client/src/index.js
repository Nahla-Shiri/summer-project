import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {onLoadingSignIn} from './actions/'

import 'bootstrap/dist/css/bootstrap.min.css';


import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store';

store.dispatch(onLoadingSignIn());

ReactDOM.render(
  <BrowserRouter>
  <Provider store={store}>
  <App />
  </Provider>
    
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
