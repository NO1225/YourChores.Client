import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { AppLoading } from 'expo';

import { authGet, authPost } from '../../global/apiCalls';
import ApiRoutes from '../../global/apiRoutes';

import EditableTextBlock from '../../components/editableTextBlock'
import PasswardEditableTextBlock from '../../components/passwardEditableTextBlock'
import { colors } from '../../global/styleConstants';

export default function SettingsScreen(props) {
  const [loaded, setLoaded] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");

  // Get call to get the user info from the api,
  const getMyInfo = async () => {
    var data = await authGet(ApiRoutes.getMyInfo);
    if (data.success) {
      setFirstName(data.response.firstName);
      setLastName(data.response.lastName);
      setUserName(data.response.userName);
      setEmail(data.response.email);
    }
  }

  // Post call to change the first name
  const changeFirstName = async (value) => {
    var data = await authPost(ApiRoutes.changeName, {
      Firstname: value,
      Lastname: lastName
    });

    if (data.success) {
      setFirstName(value);
    }
  }

  // Post call to change the last name
  const changeLastName = async (value) => {
    var data = await authPost(ApiRoutes.changeName, {
      Firstname: firstName,
      Lastname: value
    });

    if (data.success) {
      setLastName(value);
    }
  }

  // Post call to change the passward
  const changePassward = async (value) => {
    var data = await authPost(ApiRoutes.changePassward, value);

    if (data.success) {
      alert("تم تغيير كلمة المرور");
    }
    else {
      var errors = '';
      data.errors.map(error => { errors = errors + error + '\n' });
      alert(errors);
    }
  }

  if (loaded)
    return (
      <View style={styles.container}>
        <EditableTextBlock title="الاسم الاول:" value={firstName} editable onSave={changeFirstName} />
        <EditableTextBlock title="الاسم الاخير:" value={lastName} editable onSave={changeLastName} />
        <EditableTextBlock title="الايميل:" value={email} />
        <EditableTextBlock title="اسم المستخدم:" value={userName} />
        <PasswardEditableTextBlock title="كلمة المرور:" editable onSave={changePassward} />
      </View>
    )
  else
    return (
      <AppLoading startAsync={getMyInfo} onFinish={() => setLoaded(true)} />
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackgroundColor
  },

});
