import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Modal } from 'react-native';
import { AppLoading } from 'expo';

import { authGet, authPost } from '../../global/apiCalls';
import ApiRoutes from '../../global/apiRoutes';
import { colors, fontSizes, fonts, globalStyles } from '../../global/styleConstants';
import { screens, urgency } from '../../global/globalConstants'

import RoomComponent from '../../components/roomComponent'
import IconButton from '../../components/customIconButton'
import CheckBox from '../../components/customCheckBoxComponent'
import TextInput from '../../components/customTextInput'

export default function RoomsScreen(props) {
  const [loaded, setLoaded] = useState(false);
  const [rooms, setRooms] = useState([]);

  const [popUpVisible, setPopUpVisible] = useState(false);

  // Create room states
  const [roomName, setRoomName] = useState('');
  const [allowMembersToPost, setAllowMmebersToPost] = useState(false);

  // Get call to get the user info from the api,
  const getMyRooms = async () => {
    var data = await authGet(ApiRoutes.getMyRooms);
    if (data.success) {
      setRooms(data.response);
    }
  }

  // Create room call to the api
  const createRoom = async () => {
    var data = await authPost(ApiRoutes.createRoom, {
      "roomName": roomName,
      "allowMembersToPost": allowMembersToPost
    })

    if (data.success) {
      setPopUpVisible(false);
      await getMyRooms();
    }
    else {
      var errors = '';
      data.errors.map(error => { errors = errors + error + '\n' });
      alert(errors);
    }
  }

  const openPopUp = ()=>{
    setRoomName('');
    setAllowMmebersToPost(false);
    setPopUpVisible(true);
  }

  const goToRoomDetails = async (roomId, roomName) => {
    console.log(roomId,roomName);

    props.navigation.navigate(screens.RoomDetailsScreen,{roomId:roomId,name:roomName})
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
        <Modal
          animationType="slide"
          transparent={true}
          visible={popUpVisible}
          onRequestClose={() => {
            console.log("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>اضافة غرفة جديدة</Text>
              <TextInput
                value={roomName}
                onChangeText={(value) => setRoomName(value)}
                title="اسم الغرفة:"
                placeholder='اسم الغرفة' />
              <CheckBox title="السماح للاعضاء باضافة الواجبات" value={allowMembersToPost} onPress={(value) => setAllowMmebersToPost(value)} />
              <View style={styles.modelButtonContainer}>
                <IconButton icon="check" onPress={createRoom} />
                <IconButton icon="clear" onPress={() => setPopUpVisible(false)} />
              </View>
            </View>
          </View>
        </Modal>

        <FlatList
          data={rooms}
          keyExtractor={item => `${item.roomId}`}
          renderItem={({ item }) => {
            return (
              <RoomComponent room={item} onPress={goToRoomDetails} />
            );
          }
          }
        />
        <View style={styles.buttonContainer}>
          <IconButton icon="search" onPress={()=>props.navigation.navigate(screens.RoomSearchScreen)} />
          <IconButton icon="add" onPress={openPopUp} />
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
  buttonContainer: {
    marginTop:-70,
    marginBottom: 10,
    flexDirection: "row-reverse",
    justifyContent: "space-around"
  },
  modelButtonContainer: {
    alignSelf:"stretch",
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    minWidth: '90%',
    margin: 20,
    backgroundColor: colors.primaryBackgroundColor,
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: colors.primaryFontColor,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalText: {
    ...globalStyles.text,
    marginBottom: 20
  }
});
