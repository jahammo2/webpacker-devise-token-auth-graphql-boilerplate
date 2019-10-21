import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import Routes from 'src/Routes';
import storeService from 'src/services/store';

import 'normalize.css';
import 'src/styles/index.scss';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={ storeService.getStore() }>
      <PersistGate loading={ null } persistor={ storeService.getPersistor() }>
        <Routes />
      </PersistGate>
    </Provider>,
    document.body.appendChild(document.createElement('div')),
  );
});
