import React from 'react';
import ReactDOM from 'react-dom/client';

import './app/layout/styles.css';
import App from './app/layout/App';
import 'semantic-ui-css/semantic.min.css'
import { store, StoreContext } from './app/stores/store';


// const styleLink = document.createElement("link");
// styleLink.rel = "stylesheet";
// styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
// document.head.appendChild(styleLink);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  </React.StrictMode>
);

