import React, { useState } from "react";
import LoginScreen from "react-native-login-screen";
import { View, TextInput } from "react-native";
import SignUpScreen from "./SignUpScreen";
import Demo from "../assets/Demo";
import { getRemoteProfiles } from "./RemoteHandler";

loadurl="https://cs.boisestate.edu/~scutchin/cs402/codesnips/loadjson.php?user=ryeland"
saveurl="https://cs.boisestate.edu/~scutchin/cs402/codesnips/savejson.php?user=ryeland"

export default function LoginView({ setIsLoggedIn, onLogin }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showSignUp, setShowSignUp] = useState(false);

  const SignUpPress = () => {
    setShowSignUp(true);
  };
  const LoginPress = () => {
    //test user: a@gmail.com
    //test password:  123456
    //TODO: fetch user data from server
    getRemoteProfiles(loadurl).then((ret)=>{

      let isLoggedIn = false;
      // console.log(username);
      // console.log(password);
      if(ret === null){
        console.error("This is bad....")
      }
      ret.forEach((user) => {
        if (user.email === username && user.password === password) {
          onLogin(user);
          console.log("Updated login handler in app.json")
          setIsLoggedIn(true);
          console.log("Set is logged in")
          isLoggedIn = true;
        }
      });
      if (isLoggedIn === false) {
        alert("Invalid username or password");
      }
    }).catch((e)=>{
      console.log("Error during logging in!")
      console.log(e)
    })
  };

  setUser = (user) => {
    onLogin(user);
    setIsLoggedIn(true);
  };

  return (
    <View style={{ flex: 1 }}>
      {showSignUp ? (
        <SignUpScreen
          setIsLoggedIn={setIsLoggedIn}
          setShowSignUp={setShowSignUp}
          onSignUp={setUser}
        />
      ) : (
        <LoginScreen
          logoImageSource={require("../assets/icon-complete-trim.png")}
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
