import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SettingsScreen from '../screens/settingsScreens/settingsScreen'

const Stack = createStackNavigator();

function SettingsStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      </Stack.Navigator>
  );
}

export default SettingsStack;