import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import { store } from './stores/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from "./App";
import { GOOGLE_CLIENT_ID } from './utils/globalEnvs';
import "./index.css";

const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Provider store={store}>
          <App />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
