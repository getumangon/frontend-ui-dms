import {
    StyleSheet,
    Dimensions
} from 'react-native';
const { height, width } = Dimensions.get("window");
import * as colors from "../utils/common/colors";

export const HomeListingScreenStyle = StyleSheet.create({
    listItemWrapper: {
        alignSelf: 'center',
        marginTop: 0
    },
    itemInnerViewWrapper: {
        width: width,
        padding: 10
    },
    itemWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    nameText: {
        fontSize: 18,
        color: colors.fontTitleColor,
        fontFamily: 'Raleway'
    },
    osText: {
        fontSize: 14,
        color: colors.fontTitleColor,
        fontFamily: 'Raleway',
        marginTop: 5
    },
    osIconStyle: {
        marginRight: 10
    },
    itemLowerView: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    lowerItemWrapper: {
        flexDirection: 'row',
        flex: 1
    },
    dotIcon: {
        alignSelf: 'center'
    },
    occupiedText: {
        alignSelf: 'center',
        fontSize: 14,
        color: colors.fontTitleColor,
        fontFamily: 'Raleway'
    },
    occupiedIdView: { flex: 2, alignItems: 'flex-end' },
    occupiedIDText: { fontSize: 14, color: colors.fontTitleColor, fontFamily: 'Raleway' },
    emptyView: {
        alignItems: 'center',
        justifyContent: 'center',
        height: height - 180
    },

});
