import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { authGet } from '../../global/apiCalls';


export default function TimelineScreen(props) {
  const [weather, setWeather] = useState('Loading');

  const getWeather = async () => {
    if (weather == 'Loading') {
      var data = await authGet('http://192.168.8.100:5001/weatherforecast');

      console.log(data);

      setWeather(data[0].summary);
    }
  }

  getWeather();

  return (
    <View>
      <Text>Timeline Screen</Text>
      <Text>{weather}</Text>
    </View>
  )
}

const styles = StyleSheet.create({

});
