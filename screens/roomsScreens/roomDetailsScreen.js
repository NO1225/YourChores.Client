import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, FlatList, Alert } from 'react-native';
import { AppLoading } from 'expo';

import { authGet, authPost } from '../../global/apiCalls';
import ApiRoutes from '../../global/apiRoutes';
import { colors, fontSizes, fonts, globalStyles } from '../../global/styleConstants';
import { urgency, choreState, papulateOptions, screens, joinRequestType } from '../../global/globalConstants';

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
  const [pendingJoinRequest, setPendingJoinRequest] = useState(0);

  const [data, setData] = useState({});
  // To change the visibility of the popup
  const [popUpVisible, setPopUpVisible] = useState(false);
  const [selectAlternativePopUpVisible, setSelectAlternativePopUpVisible] = useState(false);

  // Chores State
  const [discription, setDiscription] = useState('');
  const [selectedUrgency, setSelectedUrgency] = useState(0);


  const [alternativeId, setAlternativeId] = useState();

  const alternativeOptions = () => {
    var options = []
    data.roomMembers.map(member => {
      options.push({
        value: member.userId,
        text: `${member.firstName} ${member.lastName}`,
        key: member.userId
      })
    })

    return options;

  }

  // Get call to get the user info from the api,
  const getRoomDetails = async (state) => {
    var data = await authGet(ApiRoutes.getRoomDetails(props.route.params.roomId));
    if (data.success) {
      setData(data.response);
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

      if (data.response.joinRequests) {
        setPendingJoinRequest(
          (await data.response.joinRequests.
            filter(joinRequest => joinRequest.joinRequestType == joinRequestType.Join))
            .length);

      }
      else
      {
        setPendingJoinRequest(0);
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

  const leave = async () => {
    var data = await authPost(ApiRoutes.leaveRoom, {
      "roomId": props.route.params.roomId,
      "alternativeId": alternativeId
    });

    if (data.success) {
      props.navigation.pop();
    }
  }

  const hundleLeaveRequest = async () => {

    if (data.isOwner && data.roomMembers.count == 1) {
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
    else if (data.isOwner && (await data.roomMembers.filter(member => member.isOwner)).length == 1) {
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
      getRoomDetails();

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
        <Modal
          animationType="slide"
          transparent={true}
          visible={selectAlternativePopUpVisible}
          onRequestClose={() => {
            console.log("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>اختيار المالك البديل</Text>
              <ComboBox
                title="الاعضاء"
                selected={alternativeId}
                onSelect={(value) => setAlternativeId(value)}
                options={alternativeOptions()} />

              <View style={styles.modelButtonContainer}>
                <IconButton icon="check" onPress={leave} />
                <IconButton icon="clear" onPress={() => setSelectAlternativePopUpVisible(false)} />
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
          <IconButton icon="exit-to-app" onPress={hundleLeaveRequest} />
          {isOwner ? <IconButton notifications={pendingJoinRequest} icon="settings" onPress={() => props.navigation.navigate(screens.RoomSettingsScreen, { roomId: props.route.params.roomId})} /> : null}
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
