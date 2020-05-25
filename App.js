import React, { useState } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import {screens} from './global/globalConstants';

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

  // All the setups before rendering
  const setup = async () => {
    await loadFonts();
  }

  if (loaded) {
    // Switch navigation
    return (<SwitchNavigation currentScreen={currentScreen}/>)
  }
  else {
    return (<AppLoading startAsync={setup} onFinish={() => setLoaded(true)} />)
  }

}
