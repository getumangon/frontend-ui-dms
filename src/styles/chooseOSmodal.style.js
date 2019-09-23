import {
    StyleSheet,
    Dimensions
} from 'react-native';
const { height, width } = Dimensions.get("window");

export const ChooseOSModalStyle = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    outerContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    cardContainer: {
        width: width * 0.4,
        height: width * 0.4
    },
    cardContainer2: {
        width: width * 0.4,
        height: width * 0.4,
        marginTop: 10
    },
    cardInnerWrapper: {
        width: width * 0.4,
        height: width * 0.4,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
