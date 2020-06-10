import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, FlatList } from 'react-native';
import { AppLoading } from 'expo';

import { authGet, authPost } from '../../global/apiCalls';
import ApiRoutes from '../../global/apiRoutes';
import { colors, fontSizes, fonts, globalStyles } from '../../global/styleConstants';
import { urgency, choreState, papulateOptions, screens } from '../../global/globalConstants';

import IconButton from '../../components/customIconButton'
import TextInput from '../../components/customTextInput'
import ComboBox from '../../components/customComboBoxComponent'
import ChoreComponent from '../../components/choreComponent'

export default function RoomDetailsScreen(props) {
  const [loaded, setLoaded] = useState(false);
  const [chores, setChores] = useState([]);
  const [postAllowed, setPostAllowed] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [filterState, setFilterState] = useState(choreState.All);

  // To change the visibility of the popup
  const [popUpVisible, setPopUpVisible] = useState(false);

  // Chores State
  const [discription, setDiscription] = useState('');
  const [selectedUrgency, setSelectedUrgency] = useState(0);
  // const [allowMembersToPost, setAllowMmebersToPost] = useState(false);

  // Get call to get the user info from the api,
  const getRoomDetails = async (state) => {
    var data = await authGet(ApiRoutes.getRoomDetails(props.route.params.roomId));
    if (data.success) {

      if (state == choreState.Pending) {
        setChores(data.response.chores.filter(chore => !chore.done));
      }
      else if (state == choreState.Done) {
        setChores(data.response.chores.filter(chore => chore.done));
      }
      else {
        setChores(data.response.chores);
      }

      if (data.response.allowMembersToPost || data.response.isOwner) {
        setPostAllowed(true);
      }

      if (data.response.isOwner) {
        setIsOwner(true);
      }
    }
  }

  const hundleFilterSelection = (value) => {
    setFilterState(value);
    getRoomDetails(value);

  }

  const openPopUp = () => {
    // setRoomName('');
    // setAllowMmebersToPost(false);
    setPopUpVisible(true);
  }

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
              <Text style={styles.modalText}>اضافة واجب جديد</Text>
              <ComboBox
                title="الاولوية"
                selected={selectedUrgency}
                onSelect={(value) => setSelectedUrgency(value)}
                options={papulateOptions(urgency)} />
              <TextInput
                value={discription}
                onChangeText={(value) => setDiscription(value)}
                multiline
                title="التفاصيل:"
                placeholder='تفاصيل الواجب' />
              <View style={styles.modelButtonContainer}>
                <IconButton icon="check" />
                <IconButton icon="clear" onPress={() => setPopUpVisible(false)} />
              </View>
            </View>
          </View>
        </Modal>
        <ComboBox
          buttonStyle={globalStyles.filterSelection}
          selected={filterState}
          onSelect={hundleFilterSelection}
          options={papulateOptions(choreState)} />
        <FlatList
          data={chores}
          keyExtractor={item => `${item.choreId}`}
          renderItem={({ item }) => {
            return (
              <ChoreComponent chore={item} onPress={() => console.log(item.choreId)} />
            );
          }
          }
        />
        <View style={styles.buttonContainer}>
          <IconButton icon="exit-to-app" />
          {isOwner ? <IconButton icon="settings" onPress={()=>props.navigation.navigate(screens.RoomSettingsScreen)} /> : null}
          {postAllowed ? <IconButton icon="playlist-add" onPress={openPopUp} /> : null}
        </View>
      </View>
    )
  else
    return (
      <AppLoading startAsync={getRoomDetails} onFinish={() => setLoaded(true)} />
    )

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContainer: {
    marginTop: -70,
    marginBottom: 10,
    flexDirection: "row-reverse",
    justifyContent: "space-around"
  },
  modelButtonContainer: {
    alignSelf: "stretch",
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
  },
  
});
