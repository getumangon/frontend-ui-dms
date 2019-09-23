/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { FlatList, Platform, StyleSheet, View, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import { Icon, Container, Left, Title, Right, Header, Content, Button, Card, CardItem, Body, Text, Form, Item, Input, Label, Badge } from 'native-base';
import firebase from 'react-native-firebase';

import APPCONSTANTS from '../../../utils/common/appContsants';
import * as colors from '../../../utils/common/colors';
import * as globals from '../../../globals/globals';

import { connect } from 'react-redux';
import { action_UserLogin, action_LoadingIndicator, action_AccuireDeviceCount } from '../../../redux/action';

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ripple from 'react-native-material-ripple';
import { showPermissionAlert, showAlert } from '../../../utils/common/common';
import { HomeListingScreenStyle } from '../../../styles/homelisting.style';
import { DeviceScreenStyle } from '../../../styles/devicescreen.style';
import { AppStyle } from '../../../styles/app.style';

const databaseRef = (ref) => {
  if (ref) {
    return firebase.database().ref(ref)
  } else {
    return firebase.database().ref()
  }
}

class HomeListingScreen extends Component {
  constructor(props) {
    super(props)
    _this = this
    this.state = {
      categoryList: [],
      isLoading: false,
    }
    this.props.showLoadingIndicator(true);
    this.getDeviceList();
    this.getAccuiredDevices();
  }


  /**
   * Getting the count of accuired devices for profile screen
   */
  getAccuiredDevices() {
    databaseRef('device').orderByChild('ocp_u_id').equalTo(this.props.loginUser.email).on('value', (snap) => {
      let tempArray = []
      snap.forEach(function (childSnapshot) {
        if (childSnapshot.exists()) {
          tempArray.push(childSnapshot.val())
        }
      })
      this.props.updateAccuireDeviceCount(tempArray.length)
    });
  }

  //======================================================================
  // getDeviceList
  //======================================================================
  getDeviceList() {
    /* Listener for value changes */
    databaseRef('device').orderByKey().on('value', (snap) => {
      let tempArray = []
      snap.forEach(function (childSnapshot) {
        if (childSnapshot.exists()) {
          tempArray.push(childSnapshot.val())
        }
      })
      this.setState({ categoryList: tempArray });
      this.props.showLoadingIndicator(false)
    });
  }

  handleListItemTap = (data) => {
    if ((data.ocp_u_id == this.props.loginUser.email) && (data.occupied)) {
      showPermissionAlert(APPCONSTANTS.ALERT_MESSAGES.RELESE_DEVICE, APPCONSTANTS.ALERT_TITLE.YES, () => this.useDeviceFirebaseCall(data, false), APPCONSTANTS.ALERT_TITLE.NO)
    } else if (!data.occupied) {
      showPermissionAlert(APPCONSTANTS.ALERT_MESSAGES.USE_DEVICE, APPCONSTANTS.ALERT_TITLE.YES, () => this.useDeviceFirebaseCall(data, true), APPCONSTANTS.ALERT_TITLE.NO)
    } else {
      showAlert(APPCONSTANTS.APP_NAME, 'Please tell ' + (data.ocp_u_id) + ' to relese the device.')
    }

  }

  useDeviceFirebaseCall = (data, occupiedFlag) => {
    databaseRef('device/').child(data.id).update({
      occupied: occupiedFlag,
      cr_time: firebase.database.ServerValue.TIMESTAMP,
      ocp_time: new Date(),
      ocp_u_id: (occupiedFlag) ? this.props.loginUser.email : ''
    });
  }

  /**
   * List's renderItem method
   */
  renderItem = (item) => {
    let data = item.item;
    return (
      <View style={HomeListingScreenStyle.listItemWrapper}>
        <Ripple onPress={() => this.handleListItemTap(data)}>
          <View>
            <View style={HomeListingScreenStyle.itemInnerViewWrapper}>

              <View style={HomeListingScreenStyle.itemWrapper}>
                <View>
                  <Text style={HomeListingScreenStyle.nameText}>{data.name}</Text>
                  <Text style={HomeListingScreenStyle.osText}>{data.os}</Text>
                </View>

                <View>
                  <FontAwesome name={(data.type == "adr") ? "android" : "apple"} size={globals.logoSize} style={HomeListingScreenStyle.osIconStyle} color={(data.type == "adr") ? colors.androidGreenColor : colors.blackColor} />
                </View>
              </View>

              <View style={HomeListingScreenStyle.itemLowerView}>
                <View style={HomeListingScreenStyle.lowerItemWrapper}>
                  <Entypo name={"dot-single"} size={24} style={HomeListingScreenStyle.dotIcon} color={(data.occupied) ? colors.redColor : colors.greenColor} />
                  <Text style={HomeListingScreenStyle.occupiedText}>{(data.occupied) ? APPCONSTANTS.COMMON_TEXT.IN_USE : APPCONSTANTS.COMMON_TEXT.AVAILABLE}</Text>
                </View>

                <View style={HomeListingScreenStyle.occupiedIdView}>
                  <Text style={HomeListingScreenStyle.occupiedIDText}>{data.ocp_u_id}</Text>
                </View>
              </View>

            </View>
          </View>
        </Ripple>
      </View>
    )
  }

  
  /**
   * When listEmpty view
   */
  _listEmptyComponent = () => {
    if (globals.isInternetConnected) {
      return (
        <View style={[HomeListingScreenStyle.emptyView, { marginTop: 50 }]}>
          {!this.state.isLoading && <Text style={AppStyle.h4}>{APPCONSTANTS.COMMON_TEXT.NO_RECORD_FOUND}</Text>}
        </View>
      )
    } else {
      return (
        <View style={[HomeListingScreenStyle.emptyView]}>
          <MaterialIcons name={"portable-wifi-off"} size={50} color={colors.blackColor} />
          <Text style={AppStyle.h4}>{APPCONSTANTS.COMMON_TEXT.NO_INTERNET_CONNECTION}</Text>
        </View>
      )
    }
  }

  _itemSeparatorComponent = () => {
    return (
      <View style={DeviceScreenStyle.itemSaperator} />
    )
  }

  render() {
    return (
      <Container style={AppStyle.container}>
        <Header noShadow>
        <Left />
          <Body>
            <Title style={AppStyle.headerTitleStyle}>{APPCONSTANTS.SCREEN_TITLE.HOMESCREEN}</Title>
          </Body>
        <Right />
        </Header>
        <Content>
          <FlatList
            data={this.state.categoryList}
            renderItem={this.renderItem}
            extraData={this.state}
            ListEmptyComponent={this._listEmptyComponent}
            ItemSeparatorComponent={this._itemSeparatorComponent}
            keyExtractor={(item, index) => index.toString()}
          />
        </Content>
      </Container>
    )
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
  showLoadingIndicator: (flag) => dispatch(action_LoadingIndicator(flag)),
  updateAccuireDeviceCount: (count) => dispatch(action_AccuireDeviceCount(count))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeListingScreen)