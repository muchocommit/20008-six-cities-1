import React from 'react';
import ReactDOM from 'react-dom';

import offers from './mocks'
import App from './components/app/app.jsx';

const init = () => {
  ReactDOM.render(
      <App
      offers={offers}/>,
      document.getElementById(`root`)
  );
};

init();
