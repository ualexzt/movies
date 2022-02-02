import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { initializeApp } from 'firebase/app';

initializeApp({
  apiKey: 'AIzaSyAXjW1bXI01IWdMju2CK-7gpNCaxvdAArw',
  authDomain: 'movies-9d73e.firebaseapp.com',
  projectId: 'movies-9d73e',
  storageBucket: 'movies-9d73e.appspot.com',
  messagingSenderId: '168833224135',
  appId: '1:168833224135:web:dd4bb08c51a4329d3d1de2',
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
