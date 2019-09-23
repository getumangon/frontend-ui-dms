import firebase from 'react-native-firebase';
var config = {
  databaseURL: "https://dms-device-management-system.firebaseio.com/",
  projectId: "dms-device-management-system"
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
var firebaseDbh = firebase.database();

module.exports = firebaseDbh;