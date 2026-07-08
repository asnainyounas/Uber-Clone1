// NEW CODE
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import UserContext from './context/UserContext.jsx';
import CaptainContext from './context/CaptainContext.jsx';
import SocketProvider from './context/SocketContext.jsx';
import 'remixicon/fonts/remixicon.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CaptainContext>
        <UserContext>
          <SocketProvider>
            <App />
          </SocketProvider>
        </UserContext>
      </CaptainContext>
    </BrowserRouter>
  </StrictMode>
);
