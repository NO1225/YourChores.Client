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

    if(data.success)
    {
      props.setCurrentScreen(screens.LoginScreen);
    }
    else
    {
      var errors='';
      data.errors.map(error=>{errors = errors + error + '\n'});
      alert(errors);
    }

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
            title='اسم المستخدم' />
          <TextInput
            value={email}
            onChangeText={(value) => setEmail(value)}
            title='البريد الالكتروني' />

          <TextInput
            value={passward}
            onChangeText={(value) => setPassward(value)}
            secureTextEntry
            title='كلمة المرور' />
          <TextInput
            value={confirmPassward}
            onChangeText={(value) => setConfirmPassward(value)}
            secureTextEntry
            title='تأكيد كلمة المرور' />

        </KeyboardAvoidingView>
        <View style={styles.buttonContainer}>
          <Button title='انشاء حساب' onPress={hundleRegister} />
        </View>
        <View style={styles.buttonContainer}>
          <Button style={styles.textButton} textStyle={styles.textButtonTitle} title='مستخدم جديد؟؟ سجل الان' onPress={()=>props.setCurrentScreen(screens.LoginScreen)}/>          
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  mainContianer: {
    flex: 1,
    alignItems: "center",
  },
  inputsContainer: {
    width: '100%',
    backgroundColor: colors.primaryBackgroundColor
  },
  buttonContainer: {
    marginTop: 20
  },
  logo: {
    marginTop: 30,
    maxHeight: 60,
    maxWidth: '25%',
    resizeMode: "contain"
  },
  text: {
    fontFamily: fonts.almaraiRegular,
    fontSize: fontSizes.large,
    color: colors.primaryFontColor,
    paddingBottom: 5
  },
  textButton:{
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.primaryBackgroundColor,
    borderRadius: 30,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: colors.accent1
  },
  textButtonTitle:{   
    color: colors.accent1,
  }

});
