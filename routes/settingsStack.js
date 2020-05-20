import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { screens } from '../global/globalConstants';

import SettingsScreen from '../screens/settingsScreens/settingsScreen'

import CustomHeader from '../components/customHeader'

const Stack = createStackNavigator();

function SettingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screens.SettingsScreen}
        component={SettingsScreen}
        options={{
          title: 'الاعدادت',
          header: ({ scene, previous, navigation }) => {
            const { options } = scene.descriptor;
            const title =
              options.headerTitle !== undefined
                ? options.headerTitle
                : options.title !== undefined
                  ? options.title
                  : scene.route.name;

            return (
              <CustomHeader
                title={title}
                navigation={navigation}
              />
            );
          }
        }
        } />
    </Stack.Navigator>
  );
}

export default SettingsStack;