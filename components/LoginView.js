import React, { useState } from 'react';
import LoginScreen from "react-native-login-screen";
import {View, TextInput} from "react-native";
import SignUpScreen from './SignUpScreen';
import UserProfile from '../assets/UserProfile';

export default function LoginView({setIsLoggedIn, onLogin}) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showSignUp, setShowSignUp] = useState(false); 

  const SignUpPress = ()=>{
    setShowSignUp(true);
  }
  const LoginPress = ()=>{
    //test user: a@gmail.com
    //test password:  123456
    //TODO: fetch user data from server
    UserProfile.forEach((user)=>{
      if(user.email === username && user.password === password){
        onLogin(user);
        setIsLoggedIn(true);
      }
    }); 
  }
  setUser = (user)=>{
    onLogin(user);
    setIsLoggedIn(true);
  }
  
  return(
      <View style={{ flex: 1 }}>
        {showSignUp ? (
          <SignUpScreen setIsLoggedIn={setIsLoggedIn} setShowSignUp={setShowSignUp} onSignUp={setUser}/>
        ) : (
          <LoginScreen
            logoImageSource={require('../assets/icon-complete-trim.png')}
            onLoginPress={ LoginPress}
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

