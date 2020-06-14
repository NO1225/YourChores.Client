import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, FlatList, TouchableOpacity } from 'react-native';
import { AppLoading } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';

import { authGet, authPost } from '../../global/apiCalls';
import ApiRoutes from '../../global/apiRoutes';
import { colors, fontSizes, fonts, globalStyles } from '../../global/styleConstants';
import { urgency, choreState, papulateOptions, screens } from '../../global/globalConstants';

import IconButton from '../../components/customIconButton'
import TextInput from '../../components/customTextInput'
import CheckBox from '../../components/customCheckBoxComponent'
import CollabsablePanel from '../../components/customCollabsablePanelComponent'

export default function RoomDetailsScreen(props) {
  const [loaded, setLoaded] = useState(false);

  const [allowMembersToPost, setAllowMmebersToPost] = useState(false);
  const [newAllowMembersToPost, setNewAllowMmebersToPost] = useState(false);

  const [owners, setOwners] = useState([]);
  const [members, setMembers] = useState([]);



  // Get call to get the user info from the api,
  const getRoomDetails = async () => {
    var data = await authGet(ApiRoutes.getRoomDetails(props.route.params.roomId));

    if (data.success) {
      setAllowMmebersToPost(data.response.allowMembersToPost);
      setNewAllowMmebersToPost(data.response.allowMembersToPost);

      setMembers(data.response.roomMembers.filter(roomMember => !roomMember.isOwner));
      setOwners(data.response.roomMembers.filter(roomMember => roomMember.isOwner));
    }
  }

  const updateRoom = async () => {
    var data = await authPost(ApiRoutes.updateRoom, {
      "roomId": props.route.params.roomId,
      "allowMembersToPost": newAllowMembersToPost
    });

    if (data.success) {
      getRoomDetails();
    }
  }

  const kickMember = async (userId) => {
    var data = await authPost(ApiRoutes.kickMember, {
      "roomId": props.route.params.roomId,
      "userId": userId
    });

    if (data.success) {
      getRoomDetails();
    }
    else
    {
      console.log(data.errors)
    }
  }

  if (loaded)
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <CheckBox title="السماح للاعضاء باضافة الواجبات" value={newAllowMembersToPost} onPress={(value) => setNewAllowMmebersToPost(value)} />
          {allowMembersToPost != newAllowMembersToPost ? <IconButton style={styles.icon} icon="save" onPress={updateRoom} /> : null}
        </View>

        <CollabsablePanel title="المالكين">
          <FlatList
            data={owners}
            keyExtractor={item => item.userId}
            renderItem={({ item }) => {
              return (
                <View style={styles.cardContainer}>
                  <Text style={styles.text}>{`${item.firstName} ${item.lastName}`}</Text>
                  <View>
                    <IconButton style={styles.icon} icon="remove-circle-outline" onPress={() => kickMember(item.userId)} />
                  </View>
                </View>
              );
            }
            }
          />
        </CollabsablePanel>

        <CollabsablePanel title="الاعضاء">
          <FlatList
            data={members}
            keyExtractor={item => item.userId}
            renderItem={({ item }) => {
              return (
                <View style={styles.cardContainer}>
                  <Text style={styles.text}>{`${item.firstName} ${item.lastName}`}</Text>
                  <View>
                    <IconButton style={styles.icon} icon="remove-circle-outline" onPress={() => kickMember(item.userId)} />
                  </View>
                </View>
              );
            }
            }
          />
        </CollabsablePanel>



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
  headerContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
    padding: 10,
    borderColor: colors.accent1,
    borderStyle: "solid",
    borderWidth: 1
  },
  icon: {
    padding: 0,
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  text: {
    ...globalStyles.text,
    padding: 10
  },
  cardContainer:{
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
    padding: 10,
    borderColor: colors.accent1,
    borderStyle: "solid",
    borderWidth: 1
  }
});
