import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import App from './App';
import './i18n/18n'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Suspense fallback={<div style={{display: 'grid', height:'100vh', justifyContent: "center", margin: 'auto 0', backgroundColor: '#FFF2E5'}}><CircularProgress sx={{margin: 'auto 0'}} color="inherit" /></div>}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>
);

//Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
