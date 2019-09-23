import {
    StyleSheet,
    Dimensions
} from 'react-native';
const { height, width } = Dimensions.get("window");
import * as colors from "../utils/common/colors";

export const DeviceScreenStyle = StyleSheet.create({
    container: {
        alignSelf: 'center',
        marginTop: 0
    },
    listItemWrapper: {
        width: width
    },
    innerItemWrapper: {
        flexDirection: 'row'
    },
    iconWrapper: {
        width: width * 0.2,
        height: width * 0.2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textWrapper: {
        padding: 10
    },
    deviceNameText: {
        fontSize: 18,
        color: colors.fontTitleColor,
        fontFamily: 'Raleway'
    },
    deviceOStext: {
        fontSize: 14,
        color: colors.fontTitleColor,
        fontFamily: 'Raleway',
        marginTop: 5
    },
    emptyView: {
        alignItems: 'center',
        justifyContent: 'center',
        height: height - 180
    },
    itemSaperator: {
        flex: 1,
        height: 0.9,
        backgroundColor: 'lightgray'
    }

});
