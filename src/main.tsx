import 'normalize.css';
import "core-js/modules/es6.promise";
import "core-js/modules/es6.array.iterator";
import './main.css';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import App from './container/App';
ReactDom.render(
  <App/>,
  document.getElementById('root')
)

