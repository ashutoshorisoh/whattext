
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom"
import User from './Component/User.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
     
     <App></App>
     
  </BrowserRouter>
  
)
