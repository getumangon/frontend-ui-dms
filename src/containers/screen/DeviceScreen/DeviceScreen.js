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

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ripple from 'react-native-material-ripple';
import { showPermissionAlert } from '../../../utils/common/common';

import firebase from 'react-native-firebase';
import { AppStyle } from '../../../styles/app.style';
import { DeviceScreenStyle } from '../../../styles/devicescreen.style';

import { connect } from 'react-redux';
import { action_UserLogin, action_LoadingIndicator, action_AccuireDeviceCount } from '../../../redux/action';

import APPCONSTANTS from '../../../utils/common/appContsants';
import * as colors from '../../../utils/common/colors';
import * as globals from '../../../globals/globals';
const { height, width } = Dimensions.get("window");

const databaseRef = (ref) => {
  if (ref) {
    return firebase.database().ref(ref)
  } else {
    return firebase.database().ref()
  }
}

class DeviceListingScreen extends Component {
  constructor(props) {
    super(props)
    _this = this
    this.state = {
      categoryList: [],
      isLoading: false,
    }
    this.props.showLoadingIndicator(true);
    this.getDeviceList();
  }

  //======================================================================
  // getDeviceList
  //======================================================================
  getDeviceList() {
    /* Listener for value changes */
    databaseRef('device').orderByKey().on('value', (snap) => {
      let tempArray = []
      snap.forEach(function (childSnapshot) {
        // console.log("--> ",childSnapshot.val());
        // alert(childSnapshot.val())
        if (childSnapshot.exists()) {
          tempArray.push(childSnapshot.val())
        }
      })
      this.setState({ categoryList: tempArray });
      this.props.showLoadingIndicator(false);
    });
  }

  /**
   * Handling delete item 
   */
  handleDeleteItem(data) {
    showPermissionAlert(APPCONSTANTS.ALERT_MESSAGES.KDELETING_CONFIRMATION, APPCONSTANTS.ALERT_TITLE.YES, () => databaseRef('device').child(data.id).remove(), APPCONSTANTS.ALERT_TITLE.NO)
  }



  //=======================================================================
  // renderItem Method
  //=======================================================================

  renderItem = (item) => {
    let data = item.item;
    return (
      <View style={DeviceScreenStyle.container}>
        <Ripple onLongPress={() => this.handleDeleteItem(data)} onPress={() => this.props.navigation.navigate(APPCONSTANTS.SCREEN_NAVIGATION_TEXT.ADD_DEVICE_DETAIL_SCREEN, { categoryObj: data })}>
          <View style={DeviceScreenStyle.listItemWrapper}>
            <View style={DeviceScreenStyle.innerItemWrapper}>
              <View style={DeviceScreenStyle.iconWrapper}>
                <FontAwesome name={(data.type == "adr") ? "android" : "apple"} size={width * 0.15} color={(data.type == "adr") ? colors.androidGreenColor : colors.blackColor} />
              </View>
              <View style={DeviceScreenStyle.textWrapper}>
                <Text style={DeviceScreenStyle.deviceNameText}>{data.name}</Text>
                <Text style={DeviceScreenStyle.deviceOStext}>{data.os}</Text>
              </View>
            </View>
          </View>
        </Ripple>
      </View>
    )
  }

  /**
   * _listEmptyComponent Method
   */
  _listEmptyComponent = () => {
    if (globals.isInternetConnected) {
      return (
        <View style={[DeviceScreenStyle.emptyView, { marginTop: 50 }]}>
          {!this.state.isLoading && <Text style={AppStyle.h4}>{APPCONSTANTS.COMMON_TEXT.NO_RECORD_FOUND}</Text>}
        </View>
      )
    } else {
      return (
        <View style={[DeviceScreenStyle.emptyView]}>
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
          <Left>
          </Left>
          <Body>
            <Title style={AppStyle.headerTitleStyle}>Devices</Title>
          </Body>
          <Right>
            <Icon onPress={() => this.props.navigation.navigate(APPCONSTANTS.SCREEN_NAVIGATION_TEXT.ADD_DEVICE_DETAIL_SCREEN)} name={'ios-add'} />
          </Right>
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
  isLoading: state.red_LoadingIndicator.isLoading
})

const mapDispatchToProps = dispatch => ({
  showLoadingIndicator: (flag) => dispatch(action_LoadingIndicator(flag)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DeviceListingScreen)