import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { screens } from '../global/globalConstants';

import RoomsScreen from '../screens/roomsScreens/roomsScreen'
import RoomDetailsScreen from '../screens/roomsScreens/roomDetailsScreen'
import RoomSearchSreen from '../screens/roomsScreens/roomSearchSreen'
import RoomSettingsScreen from '../screens/roomsScreens/roomSettingsScreen'

import CustomHeader from '../components/customHeader'
import CustomHeaderWithBack from '../components/customHeaderWithBack'

const Stack = createStackNavigator();

function RoomsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screens.RoomsScreen}
        component={RoomsScreen}
        options={{
          title: 'الغرف',
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
        }
      />
      <Stack.Screen
        name={screens.RoomDetailsScreen}
        component={RoomDetailsScreen}
        options={{
          title: 'تفاصيل الغرفة',
          header: ({ scene, previous, navigation }) => {
            const { options } = scene.descriptor;
            const title =
            scene.route.params===undefined
            ||scene.route.params.name===undefined
            ?options.headerTitle !== undefined
                ? options.headerTitle
                : options.title !== undefined
                  ? options.title
                  : scene.route.name:scene.route.params.name;

            return (
              <CustomHeaderWithBack
                title={title}
                navigation={navigation}
              />
            );
          }
        }
        } />
      <Stack.Screen
        name={screens.RoomSearchScreen}
        component={RoomSearchSreen}
        options={{
          title: 'بحث عن غرفة',
          header: ({ scene, previous, navigation }) => {
            const { options } = scene.descriptor;
            const title =
            scene.route.params===undefined
            ||scene.route.params.name===undefined
            ?options.headerTitle !== undefined
                ? options.headerTitle
                : options.title !== undefined
                  ? options.title
                  : scene.route.name:scene.route.params.name;

            return (
              <CustomHeaderWithBack
                title={title}
                navigation={navigation}
              />
            );
          }
        }
        } />
      <Stack.Screen
        name={screens.RoomSettingsScreen}
        component={RoomSettingsScreen}
        options={{
          title: 'اعدادات الغرفة',
          header: ({ scene, previous, navigation }) => {
            const { options } = scene.descriptor;
            const title =
            scene.route.params===undefined
            ||scene.route.params.name===undefined
            ?options.headerTitle !== undefined
                ? options.headerTitle
                : options.title !== undefined
                  ? options.title
                  : scene.route.name:scene.route.params.name;

            return (
              <CustomHeaderWithBack
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

export default RoomsStack;