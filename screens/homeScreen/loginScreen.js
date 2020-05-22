import React, { useState } from 'react';
import {
  StyleSheet,  View,
  Image, 
  TouchableWithoutFeedback, Keyboard
} from 'react-native';

import { colors, fonts, fontSizes } from '../../global/styleConstants';
import {screens} from '../../global/globalConstants';

import Button from '../../components/customButton';
import TextInput from '../../components/customTextInput';
import KeyboardAvoidingView from '../../components/customKeyboardAvoidingView';

export default function LoginScreen(props) {
  const [userName, setUserName] = useState('');
  const [passward, setPassward] = useState('');

  const hundleLogin = async ()=>{
    console.log({
      userName,
      passward
    })

    props.setCurrentScreen(screens.DrawerNavigationScreen);
  }


  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.mainContianer} >
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <KeyboardAvoidingView style={styles.inputsContainer}>
            <TextInput
              value={userName}
              onChangeText={(value) => setUserName(value)}
              placeholder='اسم المستخدم' />

            <TextInput
              value={passward}
              onChangeText={(value) => setPassward(value)}
              secureTextEntry
              placeholder='كلمة المرور' />

        </KeyboardAvoidingView>
        <View style={styles.buttonContainer}>
          <Button title='تسجيل دخول' onPress={hundleLogin}/>          
        </View>
        <View style={styles.buttonContainer}>
          <Button title='مستخدم جديد؟؟ سجل الان' onPress={()=>props.setCurrentScreen(screens.SignupSCreen)}/>          
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
    width:'100%',
  },
  buttonContainer: {
    marginTop: 40
  },
  logo: {
    maxHeight: 200,
    maxWidth: '30%',
    resizeMode: "contain"
  },
  
});
