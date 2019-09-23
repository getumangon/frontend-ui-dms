/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Left, Right, Title, Header, Content, Button, Card, CardItem, Body, Text, Form, Item, Input, Label, Badge } from 'native-base';
import _TextInput from '../../../components/_TextInput';
import firebase from 'react-native-firebase';

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { showAlert, showPermissionAlert } from '../../../utils/common/common';

import { connect } from 'react-redux';
import { action_UserLogin, action_LoadingIndicator } from '../../../redux/action';
import { ProfileScreenStyle } from '../../../styles/profile.style';

import APPCONSTANTS from '../../../utils/common/appContsants';
import * as colors from '../../../utils/common/colors';

import {
  AppStyle
} from '../../../styles/app.style';

const { height, width } = Dimensions.get("window");

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      repassword: '',
      phoneno: "",
      password: ''
    };
  }

  handleLogout = () => {
    firebase.auth().signOut().then(function () {
    }, function (error) {
      showAlert("ERROR", "Logout unsuccefull please try again later.")
    });

  }

  render() {
    return (
      <Container style={ProfileScreenStyle.container}>
        <Header noShadow>
          <Left>
          </Left>
          <Body>
            <Title style={AppStyle.headerTitleStyle}>{APPCONSTANTS.SCREEN_TITLE.PROFILE}</Title>
          </Body>
          <Right>
          </Right>
        </Header>

        <Content bounces={false}>
          <View style={ProfileScreenStyle.innerContainer}>

            <View style={ProfileScreenStyle.upperView}>
              <View style={ProfileScreenStyle.imageContainer}>
                <Image source={{ uri: 'https://facebook.github.io/react-native/img/tiny_logo.png' }} style={ProfileScreenStyle.imageStyle} />
                <Text style={ProfileScreenStyle.displayNameText}>{(this.props.loginUser.displayName == null) ? '-' : this.props.loginUser.displayName}</Text>
              </View>
            </View>

            <Card style={ProfileScreenStyle.displayCountContainer}>
              <View style={ProfileScreenStyle.accuireTextContainer}>
                <Text ellipsizeMode={'tail'} style={ProfileScreenStyle.accuireText}>{APPCONSTANTS.COMMON_TEXT.ACCUIRED_DEVICES}</Text>
              </View>
              <View style={ProfileScreenStyle.countTextContainer}>
                <Text style={ProfileScreenStyle.counterText}>{this.props.accuireDeviceCount}</Text>
              </View>
            </Card>

            <View style={ProfileScreenStyle.lowerView}>
              
              <View style={ProfileScreenStyle.infoContainer}>
                <View style={ProfileScreenStyle.itemWrapper}>
                  <MaterialIcons color={'red'} size={height * 0.035} style={ProfileScreenStyle.iconStyle} name={'email'} />
                  <Text style={ProfileScreenStyle.itemText}>{this.props.loginUser.email}</Text>
                </View>
                <View style={ProfileScreenStyle.itemWrapper}>
                  <MaterialIcons color={'red'} size={height * 0.035} style={ProfileScreenStyle.iconStyle} name={'phone'} />
                  <Text style={ProfileScreenStyle.itemText}>{(this.props.loginUser.phoneNumber == null) ? '-' : this.props.loginUser.phoneNumber}</Text>
                </View>
              </View>

              <View style={ProfileScreenStyle.logoutStyle} >
                <AntDesign name={"poweroff"} size={width * 0.1} color={colors.redColor} onPress={() => showPermissionAlert(APPCONSTANTS.ALERT_MESSAGES.LOGOUT, APPCONSTANTS.ALERT_TITLE.YES, this.handleLogout.bind(this), APPCONSTANTS.ALERT_TITLE.NO)} />
              </View>
            </View>

          </View>
        </Content>
      </Container>
    );
  }
}

/**
 * 
 * @param {*} state 
 * Connecting state to props with redux actions and reducers
 */
const mapStateToProps = (state) => ({
  loginUser: state.red_LoginUser.loginUser,
  isLoading: state.red_LoadingIndicator.isLoading,
  accuireDeviceCount: state.red_AccuireDeviceCount.accuireDeviceCount
})

const mapDispatchToProps = dispatch => ({
  onAppStart: (user) => dispatch(action_UserLogin(user)),
  showLoadingIndicator: (flag) => dispatch(action_LoadingIndicator(flag))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)

