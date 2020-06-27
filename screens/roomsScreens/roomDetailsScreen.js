import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';

import { authGet, authPost } from '../../global/apiCalls';
import ApiRoutes from '../../global/apiRoutes';
import { colors, fontSizes, fonts, globalStyles } from '../../global/styleConstants';
import { urgency, choreState, papulateOptions, screens, joinRequestType } from '../../global/globalConstants';

import IconButton from '../../components/customIconButton'
import TextInput from '../../components/customTextInput'
import ComboBox from '../../components/customComboBoxComponent'
import ChoreComponent from '../../components/choreComponent'
import Modal from '../../components/customModalComponent'

export default function RoomDetailsScreen(props) {
  const [loaded, setLoaded] = useState(false);
  const [chores, setChores] = useState([]);
  const [postAllowed, setPostAllowed] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [filterState, setFilterState] = useState(choreState.All);
  const [pendingJoinRequest, setPendingJoinRequest] = useState(0);

  const [responseData, setResponseData] = useState({});
  // To change the visibility of the popup
  const [popUpVisible, setPopUpVisible] = useState(false);
  const [selectAlternativePopUpVisible, setSelectAlternativePopUpVisible] = useState(false);

  // Chores State
  const [discription, setDiscription] = useState('');
  const [selectedUrgency, setSelectedUrgency] = useState(0);


  const [alternativeId, setAlternativeId] = useState();
  const [alternativeOptions, setAlternativeOptions] = useState([]);
  const getAlternativeOptions = async (data) => {
    console.log('alternativeOptions');
    var userId = await AsyncStorage.getItem("USERID");

    var options = []
    data.roomMembers.map(member => {
      if(member.userId != userId)
      options.push({
        value: member.userId,
        text: `${member.firstName} ${member.lastName}`,
        key: member.userId
      })
    })

    setAlternativeOptions(options);

  }

  // Get call to get the user info from the api,
  const getRoomDetails = async (state) => {
    console.log('getRoomDetails');
    var data = await authGet(ApiRoutes.getRoomDetails(props.route.params.roomId));
    if (data.success) {
      setResponseData(data.response);
      getAlternativeOptions(data.response);
      if (state == choreState.Pending) {
        setChores(await data.response.chores.filter(chore => !chore.done));
      }
      else if (state == choreState.Done) {
        setChores(await data.response.chores.filter(chore => chore.done));
      }
      else {
        setChores(await data.response.chores);
      }
      setPostAllowed(data.response.allowMembersToPost || data.response.isOwner);
      setIsOwner(data.response.isOwner);

      if (data.response.isOwner) {
        if (data.response.joinRequests) {
          setPendingJoinRequest(
            (await data.response.joinRequests.
              filter(joinRequest => joinRequest.joinRequestType == joinRequestType.Join))
              .length);

        }
        else {
          setPendingJoinRequest(0);
        }
      }
      else {
        setPendingJoinRequest(0);
      }

    }
  }

  const hundleFilterSelection = (value) => {
    console.log('hundleFilterSelection')
    setFilterState(value);
    getRoomDetails(value);

  }

  const openPopUp = () => {
    console.log('openPopUp')
    // setRoomName('');
    // setAllowMmebersToPost(false);
    setPopUpVisible(true);
  }

  const leave = async () => {
    var data = await authPost(ApiRoutes.leaveRoom, {
      "roomId": props.route.params.roomId,
      "alternativeId": alternativeId
    });

    if (data.success) {
      props.navigation.pop();
    }
  }

  const hundleChoreCreation = async () => {
    var data = await authPost(ApiRoutes.createChore, {
      "roomId": props.route.params.roomId,
      "description": discription,
      "urgency": selectedUrgency
    });

    if (data.success) {
      getRoomDetails();
      setPopUpVisible(false);
    }
    else {
      var errors = '';
      data.errors.map(error => { errors = errors + error + '\n' });
      alert(errors);
    }
  }

  const hundleLeaveRequest = async () => {

    if (responseData.isOwner && responseData.roomMembers.count == 1) {
      Alert.alert(
        "تأكيد حذف",
        "سيتم حذف الغرفة في حال موافقة",
        [
          {
            text: 'الغاء',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'تأكيد', onPress: () => leave()
          },
        ]
      )
    }
    else if (responseData.isOwner && (await responseData.roomMembers.filter(member => member.isOwner)).length == 1) {
      setAlternativeId(null);
      setSelectAlternativePopUpVisible(true);
    }
    else {
      leave()
    }
  }

  // Automatic reload when the screen is reentered
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      console.log('useEffect');
      getRoomDetails();

    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props.navigation]);

  if (loaded)
    return (
      <View style={styles.container}>
        <Modal

          visible={popUpVisible}
          setVisible={setPopUpVisible}
          style={styles.modalView}
        >

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
            <IconButton icon="check" onPress={hundleChoreCreation} />
            <IconButton icon="clear" onPress={() => setPopUpVisible(false)} />
          </View>

        </Modal>
        <Modal

          visible={selectAlternativePopUpVisible}
          setVisible={setSelectAlternativePopUpVisible}
          style={styles.modalView}
        >

          <Text style={styles.modalText}>اختيار المالك البديل</Text>
          <ComboBox
            title="الاعضاء"
            selected={alternativeId}
            onSelect={(value) => setAlternativeId(value)}
            options={alternativeOptions} />

          <View style={styles.modelButtonContainer}>
            <IconButton icon="check" onPress={leave} />
            <IconButton icon="clear" onPress={() => setSelectAlternativePopUpVisible(false)} />
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
              <ChoreComponent chore={item} room={{ roomId: props.route.params.roomId }} onUpdate={async () => await getRoomDetails(filterState)} />
            );
          }
          }
        />
        <View style={styles.buttonContainer}>
          <IconButton icon="exit-to-app" onPress={hundleLeaveRequest} />
          {isOwner ? <IconButton notifications={pendingJoinRequest} icon="settings" onPress={() => props.navigation.navigate(screens.RoomSettingsScreen, { roomId: props.route.params.roomId })} /> : null}
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
    maxHeight: '100%',
    minWidth: '90%',
    margin: 20,
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    
  },
  modalText: {
    ...globalStyles.text,
    marginBottom: 20
  },

});
