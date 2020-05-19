import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import RoomsScreen from '../screens/roomsScreens/roomsScreen'
import RoomDetailsScreen from '../screens/roomsScreens/roomDetailsScreen'
import AddChoreScreen from '../screens/roomsScreens/addChoreScreen'
import RoomSettingsScreen from '../screens/roomsScreens/roomSettingsScreen'

const Stack = createStackNavigator();

function RoomsStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="RoomsScreen" component={RoomsScreen} />
        <Stack.Screen name="RoomDetailsScreen" component={RoomDetailsScreen} />
        <Stack.Screen name="AddChoreScreen" component={AddChoreScreen} />
        <Stack.Screen name="RoomSettingsScreen" component={RoomSettingsScreen} />
      </Stack.Navigator>
  );
}

export default RoomsStack;