import React, { useState } from 'react';
import { AsyncStorage, I18nManager } from 'react-native';
import { AppLoading } from 'expo';
import pkg from './app.json'
import * as Font from 'expo-font';

import { screens } from './global/globalConstants';
import { authPost, get } from './global/apiCalls';
import apiRoutes from './global/apiRoutes';

import SwitchNavigation from './routes/switchNavigation'

export default function App() {
  // State to know if we have finnished loading all the setup before loading the components
  const [loaded, setLoaded] = useState(false);

  const [currentScreen, setCurrentScreen] = useState(screens.LoginScreen);

  const [allowEntry, setAllowEntry] = useState(true);
  const [appVersion, setAppVersion] = useState({});

  // Load the fonts 
  const loadFonts = async () => {
    await Font.loadAsync({
      'Almarai-Light': require('./assets/fonts/Almarai-Light.ttf'),
      'Almarai-Regular': require('./assets/fonts/Almarai-Regular.ttf'),
      'Almarai-Bold': require('./assets/fonts/Almarai-Bold.ttf')
    })
  }

  const checkVersion = async () => {
    var data = await get(apiRoutes.appVersion);

    if (data.success) {
      

      if (data.response.version > pkg.expo.version) {
        setAppVersion(data.response);
        setCurrentScreen(screens.WaitingScreen);
        if (data.response.lowestAllowedVersion > pkg.expo.version) {
          setAllowEntry(false);
        }
        else {
          setAllowEntry(true);
        }
      }
      else {
        return true;
      }
    }
  }

  // Check the current token, and if valid, go directly inside
  const checkToken = async () => {
    var data = await authPost(apiRoutes.tokenLogin, {});

    if (data.success) {
      await AsyncStorage.setItem("TOKEN", data.response.token);
      await AsyncStorage.setItem("USERID", data.response.userId);

      setCurrentScreen(screens.DrawerNavigationScreen);
    }
  }

  // All the setups before rendering
  const setup = async () => {
    await I18nManager.forceRTL(false);
    await loadFonts();
    var cont = await checkVersion();

    if (cont) {
      await checkToken();
    }
  }

  if (loaded) {
    // Switch navigation
    return (<SwitchNavigation
      currentScreen={currentScreen}
      allowEntry={allowEntry}
      appVersion={appVersion} />)
  }
  else {
    return (<AppLoading startAsync={setup} onFinish={() => setLoaded(true)} />)
  }

}
