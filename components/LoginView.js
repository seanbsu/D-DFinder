import React, { useState } from "react";
import LoginScreen from "react-native-login-screen";
import { View, TextInput } from "react-native";
import SignUpScreen from "./SignUpScreen";
import Demo from "../assets/Demo";

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
    let isLoggedIn = false;
    // console.log(username);
    // console.log(password);
    onLogin(Demo[0]);
    setIsLoggedIn(true);
    isLoggedIn = true;
    Demo.forEach((user) => {
      if (user.email === username && user.password === password) {
        onLogin(user);
        setIsLoggedIn(true);
        isLoggedIn = true;
      }
    });
    if (isLoggedIn === false) {
      alert("Invalid username or password");
    }
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
