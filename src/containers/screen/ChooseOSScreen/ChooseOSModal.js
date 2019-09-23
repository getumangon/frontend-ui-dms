/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { Container, Content, Card, } from 'native-base';

import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ripple from 'react-native-material-ripple';
import { ChooseOSModalStyle } from '../../../styles/chooseOSmodal.style';
import APPCONSTANTS from '../../../utils/common/appContsants';
import * as colors from '../../../utils/common/colors';
const { height, width } = Dimensions.get("window");

export default class ChooseOSScreen extends Component {
    constructor(props) {
        super(props)
        _this = this
        this.state = {
        }
    }

    render() {
        return (
            <Container style={ChooseOSModalStyle.container}>
                <Content contentContainerStyle={ChooseOSModalStyle.contentContainer}>
                    <View style={ChooseOSModalStyle.outerContainer}>
                        <Card style={ChooseOSModalStyle.cardContainer}>
                            <Ripple onPress={() => this.props.selectOSFun({ selectedOs: APPCONSTANTS.COMMON_TEXT.ANDROID, selectOSModalVisible: false, selected: undefined })}>
                                <View style={ChooseOSModalStyle.cardInnerWrapper}>
                                    <FontAwesome name={"android"} size={width * 0.15} color={colors.androidGreenColor} />
                                </View>
                            </Ripple>
                        </Card>
                        <Card style={ChooseOSModalStyle.cardContainer2}>
                            <Ripple onPress={() => this.props.selectOSFun({ selectedOs: APPCONSTANTS.COMMON_TEXT.APPLE, selectOSModalVisible: false, selected: undefined })}>
                                <View style={ChooseOSModalStyle.cardInnerWrapper}>
                                    <FontAwesome name={"apple"} size={width * 0.15} color={colors.blackColor} />
                                </View>
                            </Ripple>
                        </Card>
                    </View>
                </Content>
            </Container>
        )
    }
}
