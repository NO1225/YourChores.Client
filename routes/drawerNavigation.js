import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import RoomsStack from './roomsStack';
import SettingsStack from './settingsStack';
import TimelineStack from './timelineStack';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Timeline">
        <Drawer.Screen name="Timeline" component={TimelineStack} />
        <Drawer.Screen name="Rooms" component={RoomsStack} />
        <Drawer.Screen name="Settings" component={SettingsStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}