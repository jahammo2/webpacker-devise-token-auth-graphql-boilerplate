import { applyMiddleware, compose, createStore } from 'redux';
import immutableTransform from 'redux-persist-transform-immutable';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import reducers from 'src/reducers';

class Store {
  constructor() {
    this._setStore();
    this.persistor = persistStore(this.store);
  }

  getPersistor() {
    return this.persistor;
  }

  getStore() {
    return this.store;
  }

  // private

  _buildPersistedReducer() {
    return persistReducer(
      {
        key        : 'root',
        storage,
        transforms : [immutableTransform()],
      },
      reducers,
    );
  }

  _setStore() {
    const persistedReducer = this._buildPersistedReducer();
    const middlewares = [applyMiddleware(thunk)];

    /* eslint-disable no-underscore-dangle */
    if (window.__REDUX_DEVTOOLS_EXTENSION__) {
      middlewares.push(window.__REDUX_DEVTOOLS_EXTENSION__());
    }
    /* eslint-enable no-underscore-dangle */

    this.store = createStore(
      persistedReducer,
      {}, // initial state
      compose(...middlewares),
    );
  }
}

export default new Store();
