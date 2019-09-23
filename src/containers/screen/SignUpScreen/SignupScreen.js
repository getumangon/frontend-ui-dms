/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View, Keyboard } from 'react-native';
import { Container, Content, Button, Text } from 'native-base';
import _TextInput from '../../../components/_TextInput';
import firebase from 'react-native-firebase';
import { showAlert } from '../../../utils/common/common';
import Validation from "../../../utils/common/validationManager";
import { connect } from 'react-redux';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { action_UserLogin, action_LoadingIndicator } from '../../../redux/action';
import {
  LoginScreenStyle
} from '../../../styles/login.style';

import {
  AppStyle
} from '../../../styles/app.style';
import APPCONSTANTS from '../../../utils/common/appContsants';
import * as colors from '../../../utils/common/colors';

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      repassword: '',
      phoneno: '',
      password: '',
      passwordInVisible: true,
      confirmPasswordInVisible: true
    };
  }

  /**
   * Check validation
   */
  checkValidation = () => {
    Keyboard.dismiss()

    if (Validation.emptyTextInput(this.state.email, APPCONSTANTS.ALERT_MESSAGES.KEMPTY_EMAIL)) {
      if (Validation.isValidEmail(this.state.email, APPCONSTANTS.ALERT_MESSAGES.KINVALID_EMAIL)) {
        if (Validation.emptyTextInput(this.state.password, APPCONSTANTS.ALERT_MESSAGES.KEMPTY_PASSWORD)) {
          if (Validation.emptyTextInput(this.state.repassword, APPCONSTANTS.ALERT_MESSAGES.KEMPTY_CONFIRM_PASSWORD)) {
            if (Validation.samePassword(this.state.password, this.state.repassword, APPCONSTANTS.ALERT_MESSAGES.KPASSWORD_DOESNOTMATCH)) {
              this.onRegister()
            }
          }
        }
      }
    }
  }

  /**
   * On Register method for firebase registration
   */
  onRegister = () => {
    this.props.showLoadingIndicator(true)
    const { email, password } = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.props.showLoadingIndicator(false)
      })
      .catch((error) => {
        this.props.showLoadingIndicator(false)
        const { code, message } = error;
        showAlert(APPCONSTANTS.ALERT_TITLE.ERROR, message)
      });
  }

  render() {
    return (
      <Container style={LoginScreenStyle.container}>
        <Content bounces={false}>
          <Text style={LoginScreenStyle.titleText}>
            {APPCONSTANTS.SIGNUP_SCREEN_TITLE.CREATE_ACCOUNT}
            </Text>
          <Text style={LoginScreenStyle.subTitleText}>
            {APPCONSTANTS.SIGNUP_SCREEN_TITLE.SIGNUP_TO_GET}
            </Text>

          <View style={LoginScreenStyle.middleView}>
            <_TextInput
              placeholder={APPCONSTANTS.COMMON_TEXT.EMAIL}
              marginTop={20}
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
              textContentType={'emailAddress'}
              _this={this}
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

            <View style={LoginScreenStyle.passInputView}>
              <_TextInput
                borderWidth={0}
                placeholder={APPCONSTANTS.COMMON_TEXT.CONFIRM_PASSWORD}
                onChangeText={(repassword) => this.setState({ repassword })}
                value={this.state.repassword}
                textContentType={'password'}
                secureTextEntry={this.state.confirmPasswordInVisible}
              />
              <FontAwesome name={"eye"} size={20} style={LoginScreenStyle.eyeIcon} color={(this.state.confirmPasswordInVisible) ? colors.blackColor : colors.redColor} onPress={() => this.setState({ confirmPasswordInVisible: !this.state.confirmPasswordInVisible })} />
            </View>

            <View style={LoginScreenStyle.loginButtonContainer}>
              <Button block danger
                onPress={this.checkValidation}
                style={LoginScreenStyle.loginButton}>
                <Text style={AppStyle.commonFontFamily}>{APPCONSTANTS.COMMON_TEXT.SIGNUP}</Text>
              </Button>
            </View>
          </View>
        </Content>
        <Text style={LoginScreenStyle.notAUserText}>{APPCONSTANTS.LOGIN_SCREEN_TITLE.BACK_TO}<Text style={LoginScreenStyle.signupText} onPress={() => this.props.navigation.navigate('LoginScreen')}>{APPCONSTANTS.COMMON_TEXT.LOGIN}</Text></Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen)