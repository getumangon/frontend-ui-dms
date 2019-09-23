/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import AppRoot from './AppRoot';

import { Provider } from 'react-redux';
import {store, persistor} from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <AppRoot />
        </PersistGate >
      </Provider>
    );
  }
}