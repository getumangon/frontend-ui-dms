/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, Dimensions, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { LoginRout, HomeListingScreenRout } from './containers/navigators/RootStackNavigator';
import firebase from 'react-native-firebase';
const { height, width } = Dimensions.get("window");

import { connect } from 'react-redux';
import { action_UserLogin } from './redux/action';
import APPCONSTANTS from './utils/common/appContsants';

var config = {
  databaseURL: APPCONSTANTS.FIREBASE_CONFIG.DATABASE_URL,
  projectId: APPCONSTANTS.FIREBASE_CONFIG.PROJECT_ID
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const databaseRef = (ref) => {
  if (ref) {
    return firebase.database().ref(ref)
  } else {
    return firebase.database().ref()
  }
}

class AppRoot extends Component {
  constructor() {
    super();
  }

  /**
   * Listen for firebase state changes
   */
  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      this.props.onAppStart((user == undefined) ? null : user)
    });
  }

  componentWillUnmount() {
    this.authSubscription();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {(this.props.loginUser) ? <HomeListingScreenRout /> : <LoginRout />}
        {this.props.isLoading && <View style={{ height, width, backgroundColor: "rgba(0,0,0,0.7)", alignItems: 'center', justifyContent: 'center', position: 'absolute', zIndex: 1 }}>
          <ActivityIndicator style={{ flex: 1 }} size="large" color="white" />
        </View>}
      </View>
    )
  }
}

/**
 * 
 * @param {*} state 
 * Connecting state to props with redux actions and reducers
 */
const mapStateToProps = (state) => ({
  loginUser: state.red_LoginUser.loginUser,
  isLoading: state.red_LoadingIndicator.isLoading
})

const mapDispatchToProps = dispatch => ({
  onAppStart: (user) => dispatch(action_UserLogin(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AppRoot)


