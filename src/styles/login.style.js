import {
    StyleSheet,
    Dimensions
} from 'react-native';
const { height, width } = Dimensions.get("window");

export const LoginScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#fff',
    },
    titleText: {
        fontFamily: 'Raleway-SemiBold',
        fontSize: 30,
        color: '#000',
        marginTop: 80,
    },
    subTitleText: {
        fontFamily: 'Raleway-SemiBold',
        fontSize: 20,
        color: '#868686',
        marginTop: 5,
    },
    middleView: {
        flex: 1,
        marginTop: width * 0.20,
    },
    passInputView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 40,
        height: 45,
        marginTop: 20
        // backgroundColor: '#fff',
    },
    loginButtonContainer: {
        marginTop: width * 0.30,
    },
    notAUserText: {
        alignSelf: 'center',
        marginBottom: 10,
        fontFamily: 'Raleway-Regular'
    },
    signupText: {
        fontFamily: 'Raleway-Regular',
        color: 'blue',
        fontWeight: "600"
    },
    loginButton: {
        alignSelf: "center",
        width: '100%',
        borderRadius: 30,
    },
    eyeIcon: {
        marginHorizontal: 10
    },
    signup: {
        marginHorizontal: 10
    }
})