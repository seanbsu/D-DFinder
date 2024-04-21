import React, { useState, useEffect } from 'react';
import LoginScreen from "react-native-login-screen";
import {View, TextInput} from "react-native";
import SignUpScreen from './SignUpScreen';
import {saveRemoteProfiles, getRemoteProfiles, loadList, saveList} from './RemoteHandler'
import Demo from '../assets/Demo';

loadurl="https://cs.boisestate.edu/~scutchin/cs402/codesnips/loadjson.php?user=ryeland"
saveurl="https://cs.boisestate.edu/~scutchin/cs402/codesnips/savejson.php?user=ryeland"

export default function LoginView({setIsLoggedIn, onLogin}) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showSignUp, setShowSignUp] = useState(false); 
  const [Users, setUser] = useState();

  const SignUpPress = ()=>{
    setShowSignUp(true);
  }

  const LoginPress = ()=>{
    // test user: a@gmail.com
    // test password:  123456
    // TODO: fetch user data from server
    let isLoggedIn = false;

    console.log("Logging in")
    console.log("Loading list")
    setUser("booser")
    getRemoteProfiles(loadurl).then((ret) => {
      console.log("Users loading in loginview")
      console.log(ret);
      setUser(ret);
      console.log(username);
      console.log(password);

      ret.forEach((user)=>{
      if(user.email === username && user.password === password){
        onLogin(user);
        setIsLoggedIn(true);
        isLoggedIn = true;
      }

      if(isLoggedIn === false){
        alert("Invalid username or password");
      }
      });
    }).catch((e) => {
      console.log("Failure during loading remote login")
      console.log(e)
    });
     
  }
  
  // setUser = (user)=>{
  //   onLogin(user);
  //   setIsLoggedIn(true);
  // }

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

