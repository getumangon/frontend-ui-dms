import React from 'react';
import { Image, Text } from 'react-native';

const _DrawerMenuItem = (props) => {
    return (
        <Text
            onPress={props.onPress}
            style={{
                color: (props.activeItemKey == props.itemKey) ? props.activeTintColor : 'black',
                textAlign: 'left',
                fontFamily: 'Raleway-Semibold',
                padding: 25,
                borderRadius: 30,
                fontSize: 15
            }}>
            {props.title}
        </Text>
    )
}

export default _DrawerMenuItem;
