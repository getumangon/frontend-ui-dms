import {
    StyleSheet
} from 'react-native';

export const AddDeviceScreenStyle = StyleSheet.create({
    outerContainer: {
        flex: 1,
        padding: 10,
        justifyContent: 'center'
    },
    typeTitleText: {
        fontFamily: 'Raleway-Regular',
        fontSize: 20,
        color: '#868686',
        marginTop: 5,
    },
    deviceItem: {
        marginTop: 20
    },
    fontFamilyRaleway: {
        fontFamily: 'Raleway-Regular',
    },
    pickerStyle: {
        marginTop: 10
    },
    saveButton: {
        alignSelf: "center",
        width: '30%',
        marginRight: 20,
        marginTop: 40
    },
    selectOSModalOuterContainer: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'flex-end',
        flexDirection: 'row'
    },
    selectOSModalTitle: {
        marginBottom: 10,
        marginRight: 10,
        fontSize: 20,
        fontFamily: 'Raleway-SemiBold',
    },
    selectOSModalCross: {
        marginRight: 30
    }
});
