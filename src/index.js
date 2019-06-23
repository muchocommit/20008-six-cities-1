import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {compose} from 'recompose';

import App from './components/app/app.jsx';
import {createAPI} from './api';
import {reducer, Operation} from './reducers/reducer';

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

  ReactDOM.render(
      <Provider store={store}>
        <App
          />
      </Provider>,
      document.getElementById(`root`)
  );
};

init();
