import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {compose} from 'recompose';
import {BrowserRouter} from 'react-router-dom';

import {App} from './components/app/app.jsx';
import withScreenSwitch from './hocs/with-screen-switch/with-screen-switch.js';
import {createAPI} from './api';
import reducer from './reducers/reducer';
import {Operation} from './reducers/data/data';

const AppWrapped = withScreenSwitch(App);

const init = () => {
  const api = createAPI((...args) => store.dispatch(...args));
  const store = createStore(
      reducer,

      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
      ));

  store.dispatch(Operation.loadCities());

  const body = document.getElementById(`root`).parentNode;

  ReactDOM.render(
      <BrowserRouter>
        <Provider store={store}>
          <AppWrapped
            bodyElement={body}
          />
        </Provider>
      </BrowserRouter>,
      document.getElementById(`root`)
  );
};

init();
