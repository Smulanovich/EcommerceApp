import React from "react";
import ReactDOM from "react-dom/client";
import EcommerceApp from "./EcommerceApp";
import { store } from "./redux/store";
import { Provider } from "react-redux";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={(store)}>
      <EcommerceApp />
    </Provider>
  </React.StrictMode>
);
