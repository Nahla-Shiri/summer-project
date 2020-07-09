import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { onLoadingSignIn } from "./actions/auth_actions";
import { NavBar, Routes } from "./components";
import store from "./store";

const {userType} =store.getState();
store.dispatch(onLoadingSignIn(userType));

function App() {
  return (
    <div>
      <BrowserRouter>
        <Provider store={store}>
          <NavBar />
          <Routes />
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
