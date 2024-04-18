import React, { useState, useEffect } from 'react';
import LoginScreen from "react-native-login-screen";
import {View, TextInput} from "react-native";
import SignUpScreen from './SignUpScreen';
import {saveRemoteProfiles, getRemoteProfiles} from './RemoteHandler'
import Demo from '../assets/Demo';

saveurl="https://cs.boisestate.edu/~scutchin/project/savejson.php?user=dd-find-data.json"

export default function LoginView({setIsLoggedIn}) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showSignUp, setShowSignUp] = useState(false); 

  useEffect(() => {
    saveRemoteProfiles(saveurl,Demo);
  }, [])

  const SignUpPress = ()=>{
    setShowSignUp(true);
  }
  const LoginPress = ()=>{
    setIsLoggedIn(true);
  }
  
  return(
    
      <View style={{ flex: 1 }}>
        {showSignUp ? (
          <SignUpScreen setShowSignUp={setShowSignUp} />
        ) : (
          <LoginScreen
            logoImageSource={require('../assets/icon-complete-trim.png')}
            onLoginPress={LoginPress}
            onSignupPress={SignUpPress}
            onEmailChange={setUsername}
            onPasswordChange={setPassword}
            enablePasswordValidation
            disableSocialButtons
          />
        )}
      </View>
    );
}

