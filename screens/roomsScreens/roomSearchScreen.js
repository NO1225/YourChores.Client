import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, FlatList } from 'react-native';

import { authGet, authPost } from '../../global/apiCalls';
import ApiRoutes from '../../global/apiRoutes';
import { colors, fontSizes, fonts, globalStyles } from '../../global/styleConstants';
import { urgency, choreState, papulateOptions, screens } from '../../global/globalConstants';

import IconButton from '../../components/customIconButton'
import TextInput from '../../components/customTextInput'
import SearchRoomResult from '../../components/searchRoomResultComponent'

export default function RoomSearchScreen(props) {
  const [roomName, setRoomName] = useState('');
  const [rooms, setRooms] = useState([]);


  const searchForRooms = async () => {
    var data = await authGet(ApiRoutes.searchRoomName(roomName));

    setRooms(data.response);
  }

  const hundleJoinRequest = async (roomId) => {
    var data = await authPost(ApiRoutes.joinRoom, {
      "roomId": roomId,
    })

    await searchForRooms();
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          value={roomName}
          onChangeText={(value) => setRoomName(value)}
          title="اسم الغرفة:"
          placeholder='اسم الغرفة' />
        <IconButton icon="search" onPress={searchForRooms} />
      </View>
      <FlatList
        data={rooms}
        keyExtractor={item => `${item.roomId}`}
        renderItem={({ item }) => {
          return (
            <SearchRoomResult searchResult={item} hundleJoinRequest={hundleJoinRequest}/>
          );
        }
        }
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-around"
  },
  
});
