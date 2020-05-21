import React, { useState } from 'react';
import {
  StyleSheet,  View,
  Image, 
  TouchableWithoutFeedback, Keyboard
} from 'react-native';

import { colors, fonts, fontSizes } from '../../global/styleConstants'

import Button from '../../components/customButton';
import TextInput from '../../components/customTextInput';

export default function LoginScreen(props) {
  const [userName, setUserName] = useState('');
  const [passward, setPassward] = useState('');

  const hundleLogin = async ()=>{
    console.log({
      userName,
      passward
    })

    //props.setSignedIn(true);
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.mainContianer} >
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <View style={styles.inputsContainer}>
            <TextInput
              value={userName}
              onChangeText={(value) => setUserName(value)}
              placeholder='اسم المستخدم' />

            <TextInput
              value={passward}
              onChangeText={(value) => setPassward(value)}
              secureTextEntry
              placeholder='كلمة المرور' />

        </View>
        <View style={styles.buttonContainer}>
          <Button title='تسجيل دخول' onPress={hundleLogin}/>          
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
    maxHeight: '50%',
    maxWidth: '50%',
    resizeMode: "contain"
  },
  
});
