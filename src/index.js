import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom"
import {AuthApiProvider} from "./context/authContext/authProvider"
import {TaskApiProvider} from "./context/taskContext/taskProvider"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter>
  <AuthApiProvider>
    <TaskApiProvider>
          <App />
    </TaskApiProvider>
  </AuthApiProvider>
  </BrowserRouter>

  </React.StrictMode>
);

