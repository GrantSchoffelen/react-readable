import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers';
import {BrowserRouter} from 'react-router-dom'
import thunk from 'redux-thunk';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
// import axiosMiddleware from 'redux-axios-middleware';



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const headers = {
	Authorization: "admin",
	"Content-type": "application/json"
};

export const client = axios.create({
  baseURL:'http://localhost:3001',
  headers: headers
});


const store = createStore(reducer,
  composeEnhancers(
    applyMiddleware(
        thunk,
        // axiosMiddleware(client)
    )
  ))

ReactDOM.render(

  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,document.getElementById('root'));
registerServiceWorker();
