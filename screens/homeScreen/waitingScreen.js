import React, { useState } from 'react';
import {
  StyleSheet, View,
  Text, Linking
} from 'react-native';

import { colors, fonts, fontSizes, globalStyles } from '../../global/styleConstants';
import { screens } from '../../global/globalConstants';
import apiRoutes from '../../global/apiRoutes';
import { post } from '../../global/apiCalls';

import Button from '../../components/customButton';


export default function WaitingScreen(props) {


  return (
    <View style={styles.mainContianer} >
      <Text style={globalStyles.text}>يوجد تحديث للتطبيق</Text>
      <Text style={globalStyles.text}>{props.message}</Text>
      <Button title="تحميل التحديث" onPress={() => Linking.openURL(props.downloadURL)} />
      {props.allowEntry ? <Button title="تجاهل" onPress={() => props.setCurrentScreen(screens.LoginScreen)} /> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  mainContianer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }

});
