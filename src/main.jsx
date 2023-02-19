import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppMain } from './AppMain'
import { AppProvider } from './context/AppProvider';
import './scss/estilos.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
        <AppMain />
    </AppProvider>
  </React.StrictMode>,
)
