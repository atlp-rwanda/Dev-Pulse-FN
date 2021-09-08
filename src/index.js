import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../src/components/App';
import store from './store';
import './styles/authLogin.scss';
import './styles/table.scss';
import './styles/admin.style.scss';
import './styles/inputTags.scss';

render(
  <Provider store={store()}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
);
