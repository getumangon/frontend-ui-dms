import React from 'react';
import { Image, TextInput } from 'react-native';

const _TextInput = (props) => {

    return (
        <TextInput
            onPress={props.onPress}
            style={{
                flex: 1,
                marginTop: props.marginTop || 5,
                fontFamily: 'Raleway-Regular',
                padding: 10,
                borderRadius:  30,
                fontSize: 15,
                borderColor: 'red',
                borderWidth: (props.borderWidth == 0) ? props.borderWidth : 1,
                height: props.height || 45,
            }}
            onChangeText={props.onChangeText}
            value={props.value}
            textContentType={props.textContentType}
            placeholder={props.placeholder}
            selectionColor="blue"
            secureTextEntry={props.secureTextEntry || false}
        />
    )
}

export default _TextInput;
