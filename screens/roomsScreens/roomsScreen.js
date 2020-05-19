import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import {screens} from '../../global/globalConstant'

export default function RoomsScreen(props) {
  return(
      <View>
          <Button title='Room Details' onPress={()=>props.navigation.navigate(screens.RoomDetailsScreen, {name:"غرفة علي"})}/>
      </View>
  )
}

const styles = StyleSheet.create({

});
