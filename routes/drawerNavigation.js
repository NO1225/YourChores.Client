import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import {screens} from '../global/globalConstants';

import RoomsStack from './roomsStack';
import SettingsStack from './settingsStack';
import TimelineStack from './timelineStack';

import CustomDrawer from '../components/customDrawer';

const Drawer = createDrawerNavigator();

export default function App(props) {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(chileProps)=><CustomDrawer {...chileProps} setSignedIn={props.setSignedIn} />} drawerPosition='right' initialRouteName="Timeline">
        <Drawer.Screen name={screens.Timeline} component={TimelineStack} />
        <Drawer.Screen name={screens.Rooms}  component={RoomsStack} />
        <Drawer.Screen name={screens.Settings}  component={SettingsStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}