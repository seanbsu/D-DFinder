import React, { useState } from 'react';
import LoginScreen from "react-native-login-screen";
import {View, TextInput} from "react-native";
import SignUpScreen from './SignUpScreen';

export default function LoginView({setIsLoggedIn}) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showSignUp, setShowSignUp] = useState(false); 

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

