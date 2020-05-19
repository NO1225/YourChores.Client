import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function RoomsScreen(props) {
  return(
      <View>
          <Button title='Room Details' onPress={()=>props.navigation.navigate('RoomDetailsScreen')}/>
      </View>
  )
}

const styles = StyleSheet.create({

});
