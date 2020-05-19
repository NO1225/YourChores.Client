import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TimelineScreen from '../screens/timelineScreens/timelineScreen'

const Stack = createStackNavigator();

function TimelineStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="TimelineScreen" component={TimelineScreen} />
      </Stack.Navigator>
  );
}

export default TimelineStack;