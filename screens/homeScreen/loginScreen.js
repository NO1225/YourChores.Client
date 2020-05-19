import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function LoginScreen(props) {
  return(
      <View>
          <Button title='login' onPress={()=>props.setSignedIn(true)}/>
      </View>
  )
}

const styles = StyleSheet.create({

});
