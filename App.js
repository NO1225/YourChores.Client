import React, { useState } from 'react';
import { AsyncStorage, I18nManager } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import { screens } from './global/globalConstants';
import { authPost } from './global/apiCalls';
import apiRoutes from './global/apiRoutes';

import SwitchNavigation from './routes/switchNavigation'

export default function App() {
  // State to know if we have finnished loading all the setup before loading the components
  const [loaded, setLoaded] = useState(false);

  const [currentScreen, setCurrentScreen] = useState(screens.LoginScreen);

  // Load the fonts 
  const loadFonts = async () => {
    await Font.loadAsync({
      'Almarai-Light': require('./assets/fonts/Almarai-Light.ttf'),
      'Almarai-Regular': require('./assets/fonts/Almarai-Regular.ttf'),
      'Almarai-Bold': require('./assets/fonts/Almarai-Bold.ttf')
    })
  }

  // Check the current token, and if valid, go directly inside
  const checkToken = async () => {
    var data = await authPost(apiRoutes.tokenLogin, {});

    if (data.success) {
      await AsyncStorage.setItem("TOKEN", data.response.token);
      await AsyncStorage.setItem("USERID",data.response.userId);

      setCurrentScreen(screens.DrawerNavigationScreen);
    }
  }

  // All the setups before rendering
  const setup = async () => {
    await I18nManager.forceRTL(false);
    await loadFonts();
    await checkToken();
  }

  if (loaded) {
    // Switch navigation
    return (<SwitchNavigation currentScreen={currentScreen} />)
  }
  else {
    return (<AppLoading startAsync={setup} onFinish={() => setLoaded(true)} />)
  }

}
