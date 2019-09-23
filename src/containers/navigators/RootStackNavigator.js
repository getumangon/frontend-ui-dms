import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator, TabBarBottom, createSwitchNavigator } from 'react-navigation'
import LoginScreen from '../screen/LoginScreen/LoginScreen';
import SignupScreen from '../screen/SignUpScreen/SignupScreen';
import HomeTabNavigator from './RootTabNavigators';

const LoginRoot = createSwitchNavigator({
    LoginScreen: {
        screen: LoginScreen
    },
    SignupScreen: {
        screen: SignupScreen
    }
}, {
    initialRouteName: 'LoginScreen',
    // headerMode: 'none'
})

const HomeListingScreenRoot = createSwitchNavigator({
    HomeTabNavigator: {
        screen: HomeTabNavigator,
        headerMode: 'none',
        navigationOptions: {
            header: null,
        }
    },
}, {
    initialRouteName: 'HomeTabNavigator',
    // headerMode: 'none'
})

export const LoginRout = createAppContainer(LoginRoot);
export const HomeListingScreenRout = createAppContainer(HomeListingScreenRoot);