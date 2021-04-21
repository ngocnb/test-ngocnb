import * as React from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import { PersistGate } from "redux-persist/integration/react";
import { Provider, connect } from "react-redux";

import { store, persistor } from "./src/store";
import Home from "./src/pages/Home/Home";

import "bootstrap/dist/css/bootstrap.min.css";

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View>
            <Home></Home>
          </View>
        </PersistGate>
      </Provider>
    );
  }
}
