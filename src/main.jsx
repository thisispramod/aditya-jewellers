import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ProductProvider } from './context/ProductContext'
import { AuthProvider } from './context/AuthContext'
import { PriceProvider } from './context/PriceContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PriceProvider>
          <ProductProvider>
            <App />
          </ProductProvider>
        </PriceProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)