import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
import AuthService from "./service/auth.js";
import TweetService from "./service/tweet.js";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, AuthErrorEventBus } from "./context/AuthContext.jsx";
import HttpClient from "./network/http.js";
import TokenStorage from "./db/token.js";

const baseURL = process.env.REACT_APP_BASE_URL;
const tokenStorage = new TokenStorage();
const httpClient = new HttpClient(baseURL);
const authErrorEventBus = new AuthErrorEventBus();
const authService = new AuthService(httpClient, tokenStorage);
const tweetService = new TweetService(httpClient, tokenStorage);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider
        authService={authService}
        authErrorEventBus={authErrorEventBus}
      >
        <App tweetService={tweetService} />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
