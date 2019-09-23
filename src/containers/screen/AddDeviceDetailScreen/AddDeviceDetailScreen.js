/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
    View,
    Dimensions,
    Modal
} from 'react-native';

import {
    Icon,
    Container,
    Left,
    Title,
    Right,
    Header,
    Content,
    Button,
    Body,
    Text,
    Item,
    Input,
    Label,
    Picker
} from 'native-base';

import APPCONSTANTS from '../../../utils/common/appContsants';
import * as colors from '../../../utils/common/colors';
import AntDesign from "react-native-vector-icons/AntDesign";
import _Button from '../../../components/_Button';

import firebase from 'react-native-firebase';
import ChooseOSScreen from '../ChooseOSScreen/ChooseOSModal';
import { showAlert } from '../../../utils/common/common';

const { width } = Dimensions.get("window");

import {
    AddDeviceScreenStyle
} from '../../../styles/adddevicescreen.style';


import {
    AppStyle
} from '../../../styles/app.style';


const databaseRef = (ref) => {
    if (ref) {
        return firebase.database().ref(ref)
    } else {
        return firebase.database().ref()
    }
}

export default class AddDeviceDetailScreen extends Component {
    constructor(props) {
        super(props)
        _this = this
        console.log("HomeProps-->", JSON.stringify(props));
        this.state = {
            selected: undefined,
            adrOs: APPCONSTANTS.AndroidOSList,
            appleOs: APPCONSTANTS.AppleOSList,
            selectedOs: this.props.navigation.getParam('selectedOs', APPCONSTANTS.COMMON_TEXT.ANDROID),
            deviceName: '',
            selectOSModalVisible: false
        };
        this.osList = this.osList.bind(this)
    }

    /**
     * Receving object at Edit mode from device listing screen
     */
    componentDidMount() {
        if (this.props.navigation.state.params != undefined) {
            var { categoryObj } = this.props.navigation.state.params
            if (categoryObj != undefined) {
                this.setState({
                    selectedOs: (categoryObj.type == 'adr') ? APPCONSTANTS.COMMON_TEXT.ANDROID : APPCONSTANTS.COMMON_TEXT.APPLE,
                    deviceName: categoryObj.name,
                    selected: categoryObj.os
                })
            }
        }
    }

    /**
     * 
     * @param {Picker value} value 
     * Picker Item Value changes
     */
    onValueChange(value) {
        this.setState({
            selected: value
        });
    }

    /**
     * Picker Item List binding
     */
    osList = () => {
        if (this.state.selectedOs == APPCONSTANTS.COMMON_TEXT.ANDROID) {
            return (
                this.state.adrOs.map((s, i) => {
                    return <Picker.Item key={i} value={s} label={s} />
                })
            )
        } else {
            return (
                this.state.appleOs.map((s, i) => {
                    return <Picker.Item key={i} value={s} label={s} />
                })
            )
        }
    }

    /**
     * Check validation before adding on firebase
     */
    checkValidation() {
        var { deviceName, selectedOs, selected } = this.state;
        if (deviceName.trim() != '' && selectedOs != '' && selected != '' && selected != undefined) {
            this.addDeviceFB()
        } else {
            showAlert(APPCONSTANTS.ALERT_TITLE.ERROR, APPCONSTANTS.ALERT_MESSAGES.KEMPTY_FILL_DETAILS)
        }
    }

    /**
    * Add device in firebase real time database
    */
    addDeviceFB() {
        var { deviceName, selectedOs, selected } = this.state;
        if (this.props.navigation.state.params != undefined && this.props.navigation.state.params.categoryObj != undefined) {
            databaseRef('device').child(this.props.navigation.state.params.categoryObj.id).update({
                name: deviceName,
                type: (selectedOs == APPCONSTANTS.COMMON_TEXT.ANDROID) ? 'adr' : 'apple',
                os: selected,
                cr_time: firebase.database.ServerValue.TIMESTAMP,
            })
            this.props.navigation.goBack();
        } else {
            databaseRef('device').orderByKey('cr_time').limitToLast(1).once('value', function (snapshot) {
                if (snapshot.exists()) {
                    snapshot.forEach(function (childSnapshot) {
                        databaseRef('device/').child(childSnapshot.val().id + 1).set({
                            id: childSnapshot.val().id + 1,
                            name: deviceName,
                            type: (selectedOs == 'android') ? 'adr' : 'apple',
                            os: selected,
                            occupied: false,
                            cr_time: firebase.database.ServerValue.TIMESTAMP,
                            ocp_time: new Date(),
                            ocp_u_id: ''
                        });
                    })
                } else {
                    databaseRef('device/').child(1).set({
                        id: 1,
                        name: deviceName,
                        type: (selectedOs == 'android') ? 'adr' : 'apple',
                        os: selected,
                        occupied: false,
                        cr_time: firebase.database.ServerValue.TIMESTAMP,
                        ocp_time: new Date(),
                        ocp_u_id: ''
                    });
                }
            });
            this.props.navigation.goBack();
        }
    }

    /**
     * 
     * @param {state from component} nextState 
     * update state method from modal component
     */
    selectOSState(nextState) {
        this.setState(nextState)
    }

    /**
     * select OS modal view
     */
    selectOSModalView() {
        return (
            <View>
                <Modal
                    animationType="slide"
                    visible={this.state.selectOSModalVisible}
                    onRequestClose={() => this.setState({ selectOSModalVisible: false })}
                >
                    <View style={AddDeviceScreenStyle.selectOSModalOuterContainer}>
                        <AntDesign onPress={() => { this.setState({ selectOSModalVisible: false }) }} name={"close"} size={width * 0.09} style={AddDeviceScreenStyle.selectOSModalCross} />
                        <Text style={AddDeviceScreenStyle.selectOSModalTitle}>{APPCONSTANTS.SCREEN_TITLE.CHOOSE_DEVICE_TITLE}</Text>
                    </View>
                    <ChooseOSScreen selectOSFun={this.selectOSState.bind(this)} />
                </Modal>
            </View>
        )
    }

    render() {
        return (
            <Container style={AppStyle.container}>
                {this.selectOSModalView()}
                <Header noShadow>
                    <Left>
                        <Icon onPress={() => this.props.navigation.goBack()} name={'ios-arrow-back'} />
                    </Left>
                    <Body>
                        <Title style={AppStyle.headerTitleStyle}>{APPCONSTANTS.SCREEN_TITLE.ADD_DEVICE_DETAIL}</Title>
                    </Body>
                    <Right />
                </Header>

                <Content>
                    <View style={AddDeviceScreenStyle.outerContainer}>
                        <Text>{APPCONSTANTS.COMMON_TEXT.SELECTED_TYPE}<Text style={AddDeviceScreenStyle.typeTitleText} onPress={() => this.setState({ selectOSModalVisible: true })}>{(this.state.selectedOs == APPCONSTANTS.COMMON_TEXT.ANDROID) ? APPCONSTANTS.COMMON_TEXT.ANDROID : APPCONSTANTS.COMMON_TEXT.APPLE}</Text></Text>
                        <Item style={AddDeviceScreenStyle.deviceItem} floatingLabel>
                            <Label style={AddDeviceScreenStyle.fontFamilyRaleway}>{APPCONSTANTS.COMMON_TEXT.DEVICE_NAME}</Label>
                            <Input style={AddDeviceScreenStyle.fontFamilyRaleway} value={this.state.deviceName} onChangeText={deviceName => this.setState({ deviceName })} />
                        </Item>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            placeholder={APPCONSTANTS.COMMON_TEXT.PICKER_SELECT_OS}
                            placeholderStyle={AddDeviceScreenStyle.fontFamilyRaleway}
                            placeholderIconColor={colors.blueColor}
                            style={AddDeviceScreenStyle.pickerStyle}
                            selectedValue={this.state.selected}
                            onValueChange={this.onValueChange.bind(this)}
                        >
                            {this.osList()}
                        </Picker>

                        <Button block danger
                            onPress={() => this.checkValidation()}
                            style={AddDeviceScreenStyle.saveButton}>
                            <Text style={AddDeviceScreenStyle.fontFamilyRaleway}>{APPCONSTANTS.BUTTON_TEXT.SAVE}</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        )
    }
}