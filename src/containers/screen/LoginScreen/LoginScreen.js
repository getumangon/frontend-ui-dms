/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View, Keyboard } from 'react-native';
import { Container, Content, Button, Text} from 'native-base';
import firebase from 'react-native-firebase';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import _TextInput from '../../../components/_TextInput';
import {
  showAlert
} from '../../../utils/common/common'
import APPCONSTANTS from '../../../utils/common/appContsants';
import * as colors from '../../../utils/common/colors';

import Validation from "../../../utils/common/validationManager";
import { connect } from 'react-redux';
import { action_UserLogin, action_LoadingIndicator } from '../../../redux/action';
import {
  LoginScreenStyle
} from '../../../styles/login.style';

import {
  AppStyle
} from '../../../styles/app.style';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordInVisible: true,
    };
  }

  // Firebase login function
  handleLogin = (e) => {
    Keyboard.dismiss()

    if (Validation.emptyTextInput(this.state.email, APPCONSTANTS.ALERT_MESSAGES.KEMPTY_EMAIL)) {
      if (Validation.isValidEmail(this.state.email, APPCONSTANTS.ALERT_MESSAGES.KINVALID_EMAIL)) {
        if (Validation.emptyTextInput(this.state.password, APPCONSTANTS.ALERT_MESSAGES.KEMPTY_PASSWORD)) {
          this.onLogin()
        }
      }
    }
  }

  /**
   * Login process
   */
  onLogin() {
    this.props.showLoadingIndicator(true)
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.props.showLoadingIndicator(false)
      })
      .catch((error) => {
        this.props.showLoadingIndicator(false)
        const { code, message } = error;
        showAlert(APPCONSTANTS.ALERT_TITLE.ERROR, message);
      });
  }

  render() {
    return (
      <Container style={LoginScreenStyle.container}>
        <Content bounces={false}>
          <Text style={LoginScreenStyle.titleText}>
           {APPCONSTANTS.LOGIN_SCREEN_TITLE.WELCOME_TITLE}
          </Text>
          <Text style={LoginScreenStyle.subTitleText}>
           {APPCONSTANTS.LOGIN_SCREEN_TITLE.SIGIN_CONTINUE}
          </Text>

          <View style={LoginScreenStyle.middleView}>
            <_TextInput
              placeholder={APPCONSTANTS.COMMON_TEXT.EMAIL}
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
              textContentType={'emailAddress'}
            />
            <View style={LoginScreenStyle.passInputView}>
              <_TextInput
                borderWidth={0}
                placeholder={APPCONSTANTS.COMMON_TEXT.PASSWORD}
                onChangeText={(password) => this.setState({ password })}
                value={this.state.password}
                textContentType={'password'}
                secureTextEntry={this.state.passwordInVisible}
              />
              <FontAwesome name={"eye"} size={20} style={LoginScreenStyle.eyeIcon} color={(this.state.passwordInVisible) ? colors.blackColor : colors.redColor} onPress={() => this.setState({ passwordInVisible: !this.state.passwordInVisible })} />
            </View>

            <View style={LoginScreenStyle.loginButtonContainer}>
              <Button block danger onPress={() => this.handleLogin()} style={LoginScreenStyle.loginButton}>
                <Text style={AppStyle.commonFontFamily}>{APPCONSTANTS.COMMON_TEXT.LOGIN}</Text>
              </Button>
            </View>

          </View>
        </Content>
        <Text style={LoginScreenStyle.notAUserText}>{APPCONSTANTS.COMMON_TEXT.NOT_A_USER}<Text style={LoginScreenStyle.signupText} onPress={() => this.props.navigation.navigate(APPCONSTANTS.SCREEN_NAVIGATION_TEXT.SIGN_UP_SCREEN)}>{APPCONSTANTS.COMMON_TEXT.SIGNUP}</Text></Text>
      </Container>
    );
  }
}

/**
 * @param {*} state 
 * Connecting state to props with redux actions and reducers
 */
const mapStateToProps = (state) => ({
  loginUser: state.red_LoginUser.loginUser,
  isLoading: state.red_LoadingIndicator.isLoading
})

const mapDispatchToProps = dispatch => ({
  onAppStart: (user) => dispatch(action_UserLogin(user)),
  showLoadingIndicator: (flag) => dispatch(action_LoadingIndicator(flag))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)