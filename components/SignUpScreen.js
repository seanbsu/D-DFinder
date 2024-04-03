import React, { useRef, useState } from 'react';
import { Button, Keyboard, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '../assets/styles';

const SignUpScreen = ({ setShowSignUp }) => {
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const firstnameInputRef = useRef(null);
  const characternameInputRef = useRef(null);
  const classInputRef = useRef(null);
  const characterLevelInputRef = useRef(null);
  const campaignInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const scrollViewRef = useRef(null);

  const [state, setState] = useState({
    email: '',
    password: '',
    name: '',
    charactername: '',
    characterclass: '',
    characterlevel: '',
    campaigns: '',
    bio: '',
    showEmailError: false,
    showPasswordError: false,
    showNameError: false,
    showCharacterNameError: false,
    showClassError: false,
    showcharacterLevelError: false,
    showCampaignError: false,
    showBioError: false,
  });

  const inputs = [
    emailInputRef,
    passwordInputRef,
    firstnameInputRef,
    characternameInputRef,
    classInputRef,
    characterLevelInputRef,
    campaignInputRef,
    phoneInputRef,
  ];

  const editNextInput = () => {
    const activeIndex = getActiveInputIndex();
    if (activeIndex === -1) {
      return;
    }

    const nextIndex = activeIndex + 1;
    if (nextIndex < inputs.length && inputs[nextIndex].current != null) {
      setFocus(inputs[nextIndex], true);
    } else {
      finishEditing();
    }
  };

  const onInputFocus = () => {
    setState((prevState) => ({
      ...prevState,
      activeIndex: getActiveInputIndex(),
    }));
  };

  const onChangeInputHandler = (name, value) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getActiveInputIndex = () => {
    const activeIndex = inputs.findIndex((input) => {
      if (input.current == null) {
        return false;
      }
      return input.current.isFocused();
    });
    return activeIndex;
  };

  const finishEditing = () => {
    const activeIndex = getActiveInputIndex();
    if (activeIndex === -1) {
      return;
    }
    setFocus(inputs[activeIndex], false);
  };

  const setFocus = (textInputRef, shouldFocus) => {
    if (shouldFocus) {
      setTimeout(() => {
        textInputRef.current.focus();
      }, 100);
    } else {
      textInputRef.current.blur();
    }
  };

  const submitPressed = () => {
    setState((prevState) => ({
      ...prevState,
      showEmailError: state.email.length < 4,
      showPasswordError: state.password.length < 4,
      showNameError: state.name.length < 4,
      showCharacterNameError: state.charactername.length < 4,
      showClassError: state.characterclass.length < 4,
      showcharacterLevelError: state.characterlevel.length > 2 ||state.characterlevel.length < 1,
      showCampaignError: state.campaigns.length < 4,
      showBioError: state.bio.length < 4,
    }));
    Keyboard.dismiss();
  };

  const backPressed = () => {
    setShowSignUp(false);
  };

  return (
    <KeyboardAwareScrollView
      style={styles.signup_container}
      contentOffset={{ x: 0, y: 24 }}
      ref={scrollViewRef}
      scrollEventThrottle={16}
      contentContainerStyle={{ paddingTop: 24 }}
      contentInsetAdjustmentBehavior="always"
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      enableOnAndroid={true}
      extraHeight={32}
      extraScrollHeight={Platform.OS == 'android' ? 32 : 0}
      enableResetScrollToCoords={false}
      onKeyboardDidShow={this._keyboardDidShowHandler}>
      <View style={styles.signup_container}>
        <Text style={styles.header}>Registration</Text>
        <View style={styles.inputTextWrapper}>
          <TextInput
            placeholder="Email"
            style={styles.textInput}
            returnKeyType="next"
            onSubmitEditing={editNextInput}
            onFocus={onInputFocus}
            onChangeText={(value) => onChangeInputHandler('email', value)}
            ref={emailInputRef}
          />
          {state.showEmailError && <Text style={styles.errorText}>Please enter your email address.</Text>}
        </View>
        <View style={styles.inputTextWrapper}>
          <TextInput
            placeholder="Password"
            style={styles.textInput}
            secureTextEntry={true}
            returnKeyType="next"
            onSubmitEditing={editNextInput}
            onFocus={onInputFocus}
            onChangeText={(value) => onChangeInputHandler('password', value)}
            ref={passwordInputRef}
          />
          {state.showPasswordError && <Text style={styles.errorText}>Please enter a password.</Text>}
        </View>
        <View style={styles.inputTextWrapper}>
          <TextInput
            placeholder="First Name"
            style={styles.textInput}
            returnKeyType="next"
            onSubmitEditing={editNextInput}
            onFocus={onInputFocus}
            onChangeText={(value) => onChangeInputHandler('name', value)}
            ref={firstnameInputRef}
          />
          {state.showNameError && <Text style={styles.errorText}>Please enter your name.</Text>}
        </View>
        <View style={styles.inputTextWrapper}>
          <TextInput
            placeholder="Character Name"
            style={styles.textInput}
            returnKeyType="next"
            onSubmitEditing={editNextInput}
            onFocus={onInputFocus}
            onChangeText={(value) => onChangeInputHandler('charactername', value)}
            ref={characternameInputRef}
          />
          {state.showCharacterNameError && <Text style={styles.errorText}>Please enter your character name.</Text>}
        </View>
        <View style={styles.inputTextWrapper}>
          <TextInput
            placeholder="Class"
            style={styles.textInput}
            returnKeyType="next"
            onSubmitEditing={editNextInput}
            onFocus={onInputFocus}
            onChangeText={(value) => onChangeInputHandler('characterclass', value)}
            ref={classInputRef}
          />
          {state.showClassError && <Text style={styles.errorText}>Please enter your character's class.</Text>}
        </View>
        <View style={styles.inputTextWrapper}>
          <TextInput
            placeholder="Character Level"
            style={styles.textInput}
            returnKeyType="next"
            onSubmitEditing={editNextInput}
            onFocus={onInputFocus}
            onChangeText={(value) => onChangeInputHandler('characterlevel', value)}
            ref={characterLevelInputRef}
          />
          {state.showcharacterLevelError && <Text style={styles.errorText}>Please enter your character's level {"(1-20)"} .</Text>}
        </View>
        <View style={styles.inputTextWrapper}>
          <TextInput
            placeholder="Campaign"
            style={styles.textInput}
            returnKeyType="next"
            keyboardType="numeric"
            onSubmitEditing={editNextInput}
            onFocus={onInputFocus}
            onChangeText={(value) => onChangeInputHandler('campaigns', value)}
            ref={campaignInputRef}
          />
          {state.showCampaignError && <Text style={styles.errorText}>Please enter your campaign name.</Text>}
        </View>
        <View style={styles.inputTextWrapper}>
          <TextInput
            placeholder="Bio"
            style={styles.textInput}
            returnKeyType="done"
            onSubmitEditing={editNextInput}
            onFocus={onInputFocus}
            onChangeText={(value) => onChangeInputHandler('phone', value)}
            ref={phoneInputRef}
          />
          {state.showBioError && <Text style={styles.errorText}>Please enter a Bio statement.</Text>}
        </View>
        <View style={styles.btnContainer}>
          <Button title="Submit" onPress={submitPressed} />
        </View>
        <View style={styles.btnContainer}>
          <Button title="Back" onPress={backPressed} />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignUpScreen;
