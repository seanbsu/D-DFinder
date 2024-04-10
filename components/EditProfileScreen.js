import React, { useRef, useState } from 'react';
import { Button, Keyboard, Platform, Text, TextInput, View, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '../assets/styles';

const EditProfileScreen = ({ setShowEditProfile, user }) => {
  const firstnameInputRef = useRef(null);
  const characternameInputRef = useRef(null);
  const classInputRef = useRef(null);
  const characterLevelInputRef = useRef(null);
  const campaignInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const scrollViewRef = useRef(null);

  const [formData, setFormData] = useState({
    name: user.name || '',
    charactername: user.charactername || '',
    characterclass: user.characterclass || '',
    characterlevel: user.characterlevel || '',
    campaigns: user.campaigns || '',
    bio: user.bio || '',
  });

  const [errorMessages, setErrorMessages] = useState({
    name: '',
    charactername: '',
    characterclass: '',
    characterlevel: '',
    campaigns: '',
    bio: '',
  });

  const inputs = [
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
    // Handle input focus if needed
  };

  const onChangeInputHandler = (name, value) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));

    setErrorMessages(prevErrors => ({
      ...prevErrors,
      [name]: '', // Reset error message when input changes
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
    const errors = {};
    let hasError = false;

    // Validate inputs
    // Implement validation for other fields similarly

    if (hasError) {
      setErrorMessages(errors);
    } else {
      // Implement your submission logic here
      Keyboard.dismiss();
    }
  };

  const backPressed = () => {
    setShowEditProfile(false);
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
    >
      <View style={styles.signup_container}>
        <Text style={styles.header}>Edit Profile</Text>
        <View style={styles.inputTextWrapper}>
          <TextInput
            placeholder="First Name"
            style={styles.textInput}
            returnKeyType="next"
            onSubmitEditing={editNextInput}
            onChangeText={(value) => onChangeInputHandler('name', value)}
            ref={firstnameInputRef}
            value={formData.name}
          />
          {errorMessages.name !== '' && <Text style={styles.errorText}>{errorMessages.name}</Text>}
        </View>
        <View style={styles.inputTextWrapper}>
          <TextInput
            placeholder="Character Name"
            style={styles.textInput}
            returnKeyType="next"
            onSubmitEditing={editNextInput}
            onChangeText={(value) => onChangeInputHandler('charactername', value)}
            ref={characternameInputRef}
            value={formData.charactername}
          />
          {errorMessages.charactername !== '' && <Text style={styles.errorText}>{errorMessages.charactername}</Text>}
        </View>
        <View style={styles.inputTextWrapper}>
          <TextInput
            placeholder="Class"
            style={styles.textInput}
            returnKeyType="next"
            onSubmitEditing={editNextInput}
            onChangeText={(value) => onChangeInputHandler('characterclass', value)}
            ref={classInputRef}
            value={formData.characterclass}
          />
          {errorMessages.characterclass !== '' && <Text style={styles.errorText}>{errorMessages.characterclass}</Text>}
        </View>
        <View style={styles.inputTextWrapper}>
          <TextInput
            placeholder="Character Level"
            style={styles.textInput}
            returnKeyType="next"
            onSubmitEditing={editNextInput}
            onChangeText={(value) => onChangeInputHandler('characterlevel', value)}
            ref={characterLevelInputRef}
            value={formData.characterlevel}
          />
          {errorMessages.characterlevel !== '' && <Text style={styles.errorText}>{errorMessages.characterlevel}</Text>}
        </View>
        <View style={styles.inputTextWrapper}>
          <TextInput
            placeholder="Campaign"
            style={styles.textInput}
            returnKeyType="next"
            keyboardType="numeric"
            onSubmitEditing={editNextInput}
            onChangeText={(value) => onChangeInputHandler('campaigns', value)}
            ref={campaignInputRef}
            value={formData.campaigns}
          />
          {errorMessages.campaigns !== '' && <Text style={styles.errorText}>{errorMessages.campaigns}</Text>}
        </View>
        <View style={styles.inputTextWrapper}>
          <TextInput
            placeholder="Bio"
            style={styles.textInput}
            returnKeyType="done"
            onSubmitEditing={editNextInput}
            onChangeText={(value) => onChangeInputHandler('bio', value)}
            ref={phoneInputRef}
            value={formData.bio}
          />
          {errorMessages.bio !== '' && <Text style={styles.errorText}>{errorMessages.bio}</Text>}
        </View>
        {user.uri && <Image source={user.uri} style={{ width: 150, height: 150 }} />}

        <View style={styles.btnContainer}>
          <Button title="Upload Photo" />
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

export default EditProfileScreen;
