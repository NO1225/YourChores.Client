import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import DrawerNavigation from './routes/drawerNavigation'
import LoginScreen from './screens/homeScreen/loginScreen'

export default function App() {
  const [signedIn, setSignedIn] = useState(false);


  const [weather, setWeather] = useState("loading...");

  const getWeather = async () => {
    if (weather == "loading...") {
      var res = await fetch('http://192.168.8.101:5001/weatherforecast');

      var data = await res.json();

      setWeather(data[0].summary);
    }
  }

  // Switch navigation
  if (signedIn) {
    return (
      <DrawerNavigation />
    );
  }
  else {
    return (
      <LoginScreen setSignedIn={setSignedIn} />
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
