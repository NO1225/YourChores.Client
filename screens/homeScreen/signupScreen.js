import React, { useState } from 'react';
import {
  StyleSheet, View,
  Image, Text,
  TouchableWithoutFeedback, Keyboard
} from 'react-native';

import { colors, fonts, fontSizes } from '../../global/styleConstants'
import { screens } from '../../global/globalConstants';
import apiRoutes from '../../global/apiRoutes';
import {post} from '../../global/apiCalls';


import Button from '../../components/customButton';
import TextInput from '../../components/customTextInput';
import KeyboardAvoidingView from '../../components/customKeyboardAvoidingView';

export default function SignupScreen(props) {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [passward, setPassward] = useState('');
  const [confirmPassward, setConfirmPassward] = useState('');

  const hundleRegister = async () => {

    if (passward !== confirmPassward) {
      console.log("Passward doesn't match")
      return;
    }

    var data = await post(apiRoutes.register,{
      UserName:userName,
      Email:email,
      Passward: passward
    })

    console.log(data)

    if(data.success)
    {
      console.log("signed up")
    }
    else
    {
      var errors='';
      data.errors.map(error=>{errors = errors + error + '\n'});
      alert(errors);
    }

    props.setCurrentScreen(screens.DrawerNavigationScreen);
  }


  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.mainContianer} >
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.text}>تسجيل مستخدم جديد</Text>
        <KeyboardAvoidingView style={styles.inputsContainer}>
          <TextInput
            value={userName}
            onChangeText={(value) => setUserName(value)}
            placeholder='اسم المستخدم' />
          <TextInput
            value={email}
            onChangeText={(value) => setEmail(value)}
            placeholder='البريد الالكتروني' />

          <TextInput
            value={passward}
            onChangeText={(value) => setPassward(value)}
            secureTextEntry
            placeholder='كلمة المرور' />
          <TextInput
            value={confirmPassward}
            onChangeText={(value) => setConfirmPassward(value)}
            secureTextEntry
            placeholder='تأكيد كلمة المرور' />

        </KeyboardAvoidingView>
        <View style={styles.buttonContainer}>
          <Button title='تسجيل دخول' onPress={hundleRegister} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  mainContianer: {
    flex: 1,
    alignItems: "center"
  },
  inputsContainer: {
    width: '100%',
    backgroundColor: colors.primaryBackgroundColor
  },
  buttonContainer: {
    marginTop: 40
  },
  logo: {
    marginTop: 40,
    maxHeight: 100,
    maxWidth: '25%',
    resizeMode: "contain"
  },
  text: {
    fontFamily: fonts.almaraiRegular,
    fontSize: fontSizes.large,
    color: colors.primaryFontColor,
  }

});
