import { Alert } from 'react-native';
var APPCONSTANTS = require('../../utils/common/appContsants');


class Validation {
    /**
     * Check empty textInput
     * @param {*} txtInput 
     * @param {*} message 
     */
    emptyTextInput(txtInput, message) {
        if (txtInput == null || txtInput.length <= 0) {
            Alert.alert(APPCONSTANTS.APP_NAME, message)
            return false
        }
        return true
    }

    /**
     * Check valid email address
     * @param {*} email 
     * @param {*} message 
     */
    isValidEmail(email, message) {
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!(regex.test(email))) {
            Alert.alert(APPCONSTANTS.APP_NAME, message)
            return false
        }
        return true
    }

    /**
     * Check password is same or not
     * @param {*} currentpwd 
     * @param {*} nwpwd 
     * @param {*} message 
     */
    samePassword(currentpwd, nwpwd, message) {
        if (currentpwd != nwpwd) {
            Alert.alert(APPCONSTANTS.APP_NAME, message)
            return false
        }
        return true
    }
}

module.exports = new Validation()
