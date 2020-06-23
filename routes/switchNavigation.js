import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { screens } from '../global/globalConstants'

import DrawerNavigation from './drawerNavigation'
import LoginScreen from '../screens/homeScreen/loginScreen'
import SignupScreen from '../screens/homeScreen/signupScreen'
import WaitingScreen from '../screens/homeScreen/waitingScreen'

export default function App(props) {

  // State to know if the user is autharized and signed in
  const [currentScreen, setCurrentScreen] = useState(props.currentScreen);


  // Switch navigation
  if (currentScreen == screens.DrawerNavigationScreen) {
    return (
      <DrawerNavigation setCurrentScreen={setCurrentScreen} />
    );
  }
  else if (currentScreen == screens.LoginScreen) {
    return (
      <LoginScreen setCurrentScreen={setCurrentScreen} />
    )
  }
  else if (currentScreen == screens.SignupSCreen) {
    return (
      <SignupScreen setCurrentScreen={setCurrentScreen} />
    )
  }
  else if (currentScreen == screens.WaitingScreen) {
    return (
      <WaitingScreen
        setCurrentScreen={setCurrentScreen}
        allowEntry={props.allowEntry}
        message={props.appVersion ? props.appVersion.message : ""}
        downloadURL={props.appVersion ? props.appVersion.downloadURL : ""}
      />
    )
  }
}



