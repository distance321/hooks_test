import 'normalize.css';
import "core-js/modules/es6.promise";
import "core-js/modules/es6.array.iterator";
import './main.css';
import { HashRouter } from 'react-router-dom';
import * as React from 'react';
import * as ReactDom from 'react-dom';

import { Hello } from './components/Hello';

ReactDom.render(
  (
    <HashRouter>
      <Hello compiler="typescript" framework="react" />
    </HashRouter>
  ),
  document.getElementById('root')
)
