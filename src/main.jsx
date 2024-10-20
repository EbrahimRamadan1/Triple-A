// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap/dist/js/bootstrap";

import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.scss'

createRoot(document.getElementById('root')).render(
    <App />
)
