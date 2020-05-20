import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { screens } from '../global/globalConstants';

import TimelineScreen from '../screens/timelineScreens/timelineScreen'

import CustomHeader from '../components/customHeader'

const Stack = createStackNavigator();

function TimelineStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screens.TimelineScreen}
        component={TimelineScreen}
        options={{
          title: 'الصفحة الرئيسية',
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

export default TimelineStack;