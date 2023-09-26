import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/theme/ThemeContext';
import { SearchProvider } from './context/search/SearchContext';
import { SongProvider } from './context/song/SongContext';
import { CartItemsProvider } from './context/cartItems/CartItemsContext';
import { AuthProvider } from './context/auth/AuthContext';
import { UserProvider } from './context/user/UserContext';
import { PurchasesProvider } from './context/purchases/PurchasesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <UserProvider>
          <SongProvider>
            <SearchProvider>
              <CartItemsProvider>
                <PurchasesProvider>
                <App />
                </PurchasesProvider>
              </CartItemsProvider>
            </SearchProvider>
          </SongProvider>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
    
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
