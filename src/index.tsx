import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {compose} from 'recompose';
import {BrowserRouter, withRouter} from 'react-router-dom';

import {App} from './components/app/app';
import withScreenSwitch from './hocs/with-screen-switch/with-screen-switch';

import {createAPI} from './api';
import reducer from './reducers/reducer';
import {Operation as DataOperation} from './reducers/data/data';

declare const __REDUX_DEVTOOLS_EXTENSION__: () => void;

const AppWrapped = withRouter(withScreenSwitch(App));

export const api = createAPI();
export const store = createStore(
  reducer,

  compose(
    applyMiddleware(thunk.withExtraArgument(api)),
    __REDUX_DEVTOOLS_EXTENSION__ &&
    __REDUX_DEVTOOLS_EXTENSION__()
  ));


const init = () => {
  store.dispatch(DataOperation.loadCities());


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
