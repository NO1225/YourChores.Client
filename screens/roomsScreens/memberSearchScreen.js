import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, FlatList } from 'react-native';

import { authGet, authPost } from '../../global/apiCalls';
import ApiRoutes from '../../global/apiRoutes';
import { colors, fontSizes, fonts, globalStyles } from '../../global/styleConstants';
import { urgency, choreState, papulateOptions, screens } from '../../global/globalConstants';

import IconButton from '../../components/customIconButton'
import TextInput from '../../components/customTextInput'
import MemberComponent from '../../components/memberComponent'

export default function RoomSearchScreen(props) {
  const [userName, setUserName] = useState('');
  const [members, setMembers] = useState([]);


  const searchForMember = async () => {
    var data = await authPost(ApiRoutes.findMember, {
      "roomId": props.route.params.roomId,
      "userName": userName
    });

    if (data.success) {
      setMembers(data.response);
    }


  }

  const hundleInviteRequest = async (userId) => {
    var data = await authPost(ApiRoutes.inviteMember, {
      "roomId": props.route.params.roomId,
      "userId": userId
    })

    if (data.success) {
      await searchForMember();
    }

  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          value={userName}
          onChangeText={(value) => setUserName(value)}
          title="اسم المستخدم:"
          placeholder='اسم المستخدم' />
        <IconButton icon="search" onPress={searchForMember} />
      </View>
      <FlatList
        data={members}
        keyExtractor={item => item.userId}
        renderItem={({ item }) => {
          var buttons = [];
          var icons = [];
          if (!item.isMember && !item.isInvited && !item.isRequestingJoin) {
            buttons.push({ icon: "group-add", method: hundleInviteRequest });
          }
          if (item.isMember) {
            icons.push("account-circle");
          }
          if (item.isInvited) {
            icons.push("cloud-done");
          }
          if (item.isRequestingJoin) {
            buttons.push({ icon: "check", method: () => console.log("Request Accepted") });
          }
          return (
            <MemberComponent member={item} buttons={buttons} icons={icons} />
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
