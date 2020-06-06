import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { AppLoading } from 'expo';

import { authGet } from '../../global/apiCalls';
import ApiRoutes from '../../global/apiRoutes';
import { colors, fontSizes, fonts, globalStyles } from '../../global/styleConstants';
import { screens, urgency } from '../../global/globalConstants'

import RoomComponent from '../../components/roomComponent'
import IconButton from '../../components/customIconButton'

export default function RoomsScreen(props) {
  const [loaded, setLoaded] = useState(false);
  const [rooms, setRooms] = useState([]);

  // Get call to get the user info from the api,
  const getMyRooms = async () => {
    var data = await authGet(ApiRoutes.getMyRooms);
    if (data.success) {
      setRooms(data.response);
    }
  }

  const goToRoomDetails = async(roomId)=>{
    console.log(roomId);
  }

  // Automatic reload when the screen is reentered
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      getMyRooms();

    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props.navigation]);

  if (loaded)
    return (
      <View style={styles.container}>
        <FlatList
          data={rooms}
          keyExtractor={item => item.roomId}
          renderItem={({ item }) => {
            return (
              <RoomComponent room={item} onPress={goToRoomDetails} />
            );
          }
          }
        />
        <View style={styles.buttonContainer}>
          <IconButton icon="search"/>
          <IconButton icon="add"/>
        </View>
      </View>
    )
  else
    return (
      <AppLoading startAsync={getMyRooms} onFinish={() => setLoaded(true)} />
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContainer:{
    marginBottom:10,
    flexDirection:"row-reverse",
    justifyContent:"space-around"
  },

});
