import React from 'react';
import { View, Text, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export const addNavigationOptions = (label, icon) => {
    return ({
        borderBottomWidth: 0,
        tabBarLabel: label,
        tabBarIcon: ({ tintColor }) => (
            <View style={[tabViewBox]}>
                <FontAwesome name={icon} style={tabIcon()} size={20} color={tintColor} />
                <Text style={[tabText(), { color: tintColor }]}>{label}</Text>
            </View>
        )
    })
}

export const addTitleStyle = () => {
    return {
        fontSize: 20,
        fontFamily: 'Raleway-Light',
        color: '#bebebe'
    }
}

export const tabText = () => {
    return {
        fontSize: 10,
        fontWeight: "600",
        flex: 4,
    }
}

export const tabViewBox = () => {
    return {
        flex: 1,
        alignItems: "center",
    }
}

export const tabIcon = () => {
    return {
        flex: 5,
        alignSelf: "center",
        marginTop: 7,
        marginBottom: 5
    }
}

export const showAlert = (header, message) => Alert.alert(
    header,
    message,
    [
        {
            text: 'OK'
        }
    ],
    { cancelable: false },
);

export const showPermissionAlert = (message, approveText, approveFunc, disApproveText, disApproveFunc) => Alert.alert(
    "DMS",
    message,
    [
        { text: approveText, onPress: approveFunc },
        { text: disApproveText, onPress: disApproveFunc }
    ],
    { cancelable: false },
);

export const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};
