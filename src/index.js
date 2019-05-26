import React from 'react';
import ReactDOM from 'react-dom';

import cities from './mocks'
import App from './components/app/app.jsx';

const init = () => {


    ReactDOM.render(
      <App
      cities={cities}/>,
      document.getElementById(`root`)
  );
};

init();
