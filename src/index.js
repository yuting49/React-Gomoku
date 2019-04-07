import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import Gomoku from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Gomoku />, document.getElementById('root'));

serviceWorker.unregister();
