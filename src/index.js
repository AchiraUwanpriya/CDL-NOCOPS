import axios from 'axios';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { AppContextProvider } from './store/contexts/AppContext';
import { AuthContextProvider } from './store/contexts/AuthContext';
import store from './store/Store';
import './utils/i18n';
import Spinner from './components/app/spinner/Spinner';
  //  axios.defaults.baseURL = 'http://192.168.40.140:8083/';
  //axios.defaults.baseURL = 'http://172.30.30.89:8085/';
  // axios.defaults.baseURL = 'http://10.0.13.48:8083/';
  // axios.defaults.baseURL = 'http://10.0.13.48:8088/';
axios.defaults.baseURL = 'https://esystems.cdl.lk/backend/NOCOPS/';
//  axios.defaults.baseURL = 'http://10.0.13.48:8084/';
//axios.defaults.baseURL = 'http://10.0.13.48:8088/';
axios.defaults.headers.common['auth-key'] = JSON.parse(localStorage.getItem('NocOps_Token'));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <AuthContextProvider>
          <AppContextProvider>
            <App />
          </AppContextProvider>
        </AuthContextProvider>
      </Suspense>
    </BrowserRouter>
  </Provider>,
);

serviceWorkerRegistration.register();
reportWebVitals();
