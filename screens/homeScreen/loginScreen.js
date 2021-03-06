import React, { useState } from 'react';
import {
  StyleSheet,  View,
  Image, AsyncStorage,
  TouchableWithoutFeedback, Keyboard
} from 'react-native';

import { colors, fonts, fontSizes } from '../../global/styleConstants';
import {screens} from '../../global/globalConstants';
import apiRoutes from '../../global/apiRoutes';
import {post} from '../../global/apiCalls';

import Button from '../../components/customButton';
import TextInput from '../../components/customTextInput';
import KeyboardAvoidingView from '../../components/customKeyboardAvoidingView';

export default function LoginScreen(props) {
  const [userName, setUserName] = useState('');
  const [passward, setPassward] = useState('');

  const hundleLogin = async ()=>{
    var data = await post(apiRoutes.login,{
      UserNameOrEmail:userName,
      Passward: passward
    })

    console.log(data)

    if(data.success)
    {
      console.log("Logged in");

      await AsyncStorage.setItem("TOKEN",data.response.token);
      await AsyncStorage.setItem("USERID",data.response.userId);

      props.setCurrentScreen(screens.DrawerNavigationScreen);
    }
    else
    {
      var errors='';
      data.errors.map(error=>{errors = errors + error + '\n'});
      alert(errors);
    }


    //
  }


  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.mainContianer} >
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <KeyboardAvoidingView style={styles.inputsContainer}>
            <TextInput
              value={userName}
              onChangeText={(value) => setUserName(value)}
              title='اسم المستخدم' />

            <TextInput
              value={passward}
              onChangeText={(value) => setPassward(value)}
              secureTextEntry
              autoCapitalize="none"
              title='كلمة المرور' />

        </KeyboardAvoidingView>
        <View style={styles.buttonContainer}>
          <Button title='تسجيل دخول' onPress={hundleLogin}/>          
        </View>
        <View style={styles.buttonContainer}>
          <Button style={styles.textButton} textStyle={styles.textButtonTitle} title='مستخدم جديد؟؟ سجل الان' onPress={()=>props.setCurrentScreen(screens.SignupSCreen)}/>          
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
