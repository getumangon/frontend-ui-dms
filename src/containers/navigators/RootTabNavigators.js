import { createStackNavigator, createBottomTabNavigator, TabBarBottom } from 'react-navigation'
import {
    AppStyle
  } from '../../styles/app.style';
  import APPCONSTANTS from '../../utils/common/appContsants';
  import * as colors from '../../utils/common/colors';

import HomeListingScreen from '../screen/HomeListingScreen/HomeListingScreen';
import ProfileScreen from '../screen/ProfileScreen/ProfileScreen';
import DeviceScreen from '../screen/DeviceScreen/DeviceScreen';

import AddDeviceDetailScreen from '../screen/AddDeviceDetailScreen/AddDeviceDetailScreen';

import {
    addNavigationOptions
} from '../../utils/common/common';

const HomeRoot = createStackNavigator({
    HomeListingScreen: {
        screen: HomeListingScreen,
        navigationOptions: {
            header: null,
        }
    }
}, {
    initialRouteName: APPCONSTANTS.INITIAL_ROUT_NAME.HOMELISTINGSCREEN,
    navigationOptions: ({ navigation }) => {
        let tabBarVisible = true;
        if (navigation.state.routes[navigation.state.index].routeName == APPCONSTANTS.INITIAL_ROUT_NAME.ADDDEVICESCREEN) {
            tabBarVisible = false
        }
        return {
            tabBarVisible,
        }
    }
})


const ProfileRoot = createStackNavigator({
    ProfileScreen: {
        screen: ProfileScreen,
        navigationOptions: {
            header: null,
        }
    }
}, {
    initialRouteName: APPCONSTANTS.INITIAL_ROUT_NAME.PROFILESCREEN
})


const DeviceRoot = createStackNavigator({
    DeviceScreen: {
        screen: DeviceScreen,
        navigationOptions: {
            header: null,
        }
    },
    AddDeviceDetailScreen: {
        screen: AddDeviceDetailScreen,
        navigationOptions: {
            header: null,
        }
    },
}, {
    initialRouteName: APPCONSTANTS.INITIAL_ROUT_NAME.DEVICESCREEN,
    navigationOptions: ({ navigation }) => {
        let tabBarVisible = true;
        let routName = navigation.state.routes[navigation.state.index].routeName;
        if (routName == APPCONSTANTS.INITIAL_ROUT_NAME.CHOOSEOSSCREEN || routName == APPCONSTANTS.INITIAL_ROUT_NAME.ADDDEVICEDETAILSCREEN) {
            tabBarVisible = false
        }
        return {
            tabBarVisible,
        }
    }
})


export default HomeTabNavigator = createBottomTabNavigator({
    ProfileRoot: {
        screen: ProfileRoot,
        navigationOptions: () => addNavigationOptions(APPCONSTANTS.TAB_NAVIGATOR_SCREEN.PROFILE, "user")
    },
    HomeRoot: {
        screen: HomeRoot,
        navigationOptions: () => addNavigationOptions(APPCONSTANTS.TAB_NAVIGATOR_SCREEN.HOME, "list")
    },
    DeviceRoot: {
        screen: DeviceRoot,
        navigationOptions: () => addNavigationOptions(APPCONSTANTS.TAB_NAVIGATOR_SCREEN.DEVICE, "mobile")
    },
}, {
    tabBarOptions: {
        activeTintColor: colors.redColor,
        inactiveTintColor: colors.gray,
        style: AppStyle.tabBarOptionStyle,
        showLabel: false,
        showIcon: true,
    },
    lazy: true,
    tabBarComponent: TabBarBottom,
    initialRouteName: APPCONSTANTS.INITIAL_ROUT_NAME.HOMEROOT,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false
});