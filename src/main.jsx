import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';
import store from './data/local/store.jsx';
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <Provider store={store}>
    <App />
    </Provider>
    <ToastContainer />
  </React.StrictMode>,
)
