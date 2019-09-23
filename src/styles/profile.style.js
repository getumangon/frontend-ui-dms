import {
    StyleSheet,
    Dimensions
} from 'react-native';
const { height, width } = Dimensions.get("window");

export const ProfileScreenStyle = StyleSheet.create({
    container: {
        // flex: 1,
        // padding: 15,
        backgroundColor: '#fff',
    },
    innerContainer: {
        flex: 1,
    },
    upperView: {
        flex: 1,
        height: height * 0.32,
        backgroundColor: 'tomato'
    },
    lowerView: {
        flex: 1,
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageStyle: {
        height: height * 0.15,
        width: height * 0.15,
        backgroundColor: 'black',
        borderRadius: height * 0.1,
        resizeMode: 'cover'
    },
    displayNameText: {
        fontSize: width * 0.04,
        fontFamily: 'Raleway-SemiBold',
        marginTop: 15
    },
    infoContainer: {
        marginVertical: height * 0.15,
        marginLeft: 80,
    },
    itemWrapper: {
        flexDirection: 'row',
        marginTop: height * 0.01,
        justifyContent: 'flex-start'
    },
    iconStyle: {

    },
    itemText: {
        fontFamily: 'Raleway',
        alignSelf: 'center',
        marginLeft: 20,
        fontSize: 17
    },
    displayCountContainer: {
        height: width * 0.20,
        width: width * 0.50,
        backgroundColor: 'white',
        zIndex: 999,
        position: 'absolute',
        bottom: width * 0.65,
        alignSelf: 'center',
        flexDirection: 'row',
        borderRadius: 5
    },
    accuireTextContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    accuireText: {
        fontFamily: 'Raleway-SemiBold',
        fontSize: 20,
        color: '#000',
        textAlign: 'center'
    },
    countTextContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    counterText: {
        fontFamily: 'Raleway-SemiBold',
        fontSize: 30,
        color: 'gray',
    },
    logoutStyle: {
        margin: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})