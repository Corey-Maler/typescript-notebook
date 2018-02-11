import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import { configureStore } from './store';
import { App } from './containers/App';

const store = configureStore();
const history = createBrowserHistory();

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
