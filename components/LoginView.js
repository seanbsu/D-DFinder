import React, { useState } from 'react';
import LoginScreen from "react-native-login-screen";

export default function LoginView() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  return(
  <LoginScreen
    logoImageSource={require('../assets/icon-complete-trim.png')}
    onLoginPress={() => {}}
    onSignupPress={() => {}}
    onEmailChange={setUsername}
    onPasswordChange={setPassword}
    enablePasswordValidation
    disableSocialButtons
  />
  )
}

