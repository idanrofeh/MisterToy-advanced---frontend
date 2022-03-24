import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './assets/css/main.scss';
import { RootCmp } from './RootCmp.jsx';
import { store } from './store/store'

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <RootCmp />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

