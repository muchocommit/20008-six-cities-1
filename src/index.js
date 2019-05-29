import {createStore} from 'redux';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import cities from './mocks';
import App from './components/app/app.jsx';

import {reducer} from './reducers/reducer';


const init = () => {
  const store = createStore(reducer);

  ReactDOM.render(
      <Provider store={store}>
        <App
          cities={cities}/>
      </Provider>,
      document.getElementById(`root`)
  );
};

init();
