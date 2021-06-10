import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import App from "./layouts/routes.jsx";

import HttpsRedirect from "react-https-redirect";

// performance
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <HttpsRedirect>
    <App />
  </HttpsRedirect>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// reportWebVitals();
