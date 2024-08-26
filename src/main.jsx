
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom"
import User from './Component/User.jsx'
import AuthWrapper from './Component/AuthContext.jsx'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthWrapper>
        <BrowserRouter>
            <App></App>
        </BrowserRouter>
    </AuthWrapper>)
