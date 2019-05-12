import React from 'react';

import {Container} from './../main/container/container.jsx';
import offers from './../../mocks/offers';

export const App = () => {

  return <Container
    offers={offers}
  />;
};


