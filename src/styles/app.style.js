import {
  StyleSheet
} from 'react-native';
import * as colors from "../utils/common/colors";

export const AppStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundColor
  },
  headerTitleStyle: {
    fontFamily: 'Raleway-Regular'
  },
  commonFontFamily: {
    fontFamily: 'Raleway-Regular'
  },
  h4: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 20,
    color: '#868686',
    marginTop: 5,
  },
  tabBarOptionStyle: {
    backgroundColor: '#FFF',
    height: 49,
    borderTopColor: 'transparent',
    borderTopWidth: 1,
    paddingRight: 10,
    paddingLeft: 10,
    borderTopWidth: 1,
    borderTopColor: colors.lightgray
  }
});
