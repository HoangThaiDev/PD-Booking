// Impot Modules
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Provider from "./storeContext/APIContext";
import { Provider as ProviderRedux } from "react-redux";
import store from "./redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProviderRedux store={store}>
      <Provider>
        <App />
      </Provider>
    </ProviderRedux>
  </React.StrictMode>
);
