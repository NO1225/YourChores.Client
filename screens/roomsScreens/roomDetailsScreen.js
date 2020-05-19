import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function RoomDetailsScreen(props) {
  return(
      <View>
          <Button title='Add Chore' onPress={()=>props.navigation.navigate('AddChoreScreen')}/>
          <Button title='Room Settings' onPress={()=>props.navigation.navigate('RoomSettingsScreen')}/>
      </View>
  )
}

const styles = StyleSheet.create({

});
