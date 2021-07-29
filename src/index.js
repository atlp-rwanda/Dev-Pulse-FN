import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import App from '../src/components/App'

import './styles/authLogin.scss';
import './styles/table.scss'
//import 'bootswatch/dist/journal/bootstrap.min.css'

render(<Router><App /></Router>, document.getElementById('app'));
