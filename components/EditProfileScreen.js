import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Keyboard,
  Platform,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "../assets/styles";
import Demo from "../assets/Demo";
import * as ImagePicker from "expo-image-picker";

const EditProfileScreen = ({ setShowEditProfile, user, updateEditUser }) => {
  const firstnameInputRef = useRef(null);
  const characternameInputRef = useRef(null);
  const classInputRef = useRef(null);
  const characterLevelInputRef = useRef(null);
  const campaignInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const scrollViewRef = useRef(null);
  const defaultImage = user.uri;

  const [formData, setFormData] = useState({
    name: user.firstname || "",
    charactername: user.charactername || "",
    characterclass: user.characterClass || "",
    characterlevel: user.characterLevel || "",
    campaigns: user.campaign || "",
    bio: user.bio || "",
    uri: user.uri || null,
  });

  const [errorMessages, setErrorMessages] = useState({
    name: "",
    charactername: "",
    characterclass: "",
    characterlevel: "",
    campaigns: "",
    bio: "",
  });
  const [image, setImage] = useState(null);
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
  useEffect((image) => {}), [image];

  const onInputFocus = () => {
    // Handle input focus if needed
  };

  const onChangeInputHandler = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Reset error message when input changes
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

    // Implement validation for other fields similarly
    if (formData.name.trim() === "") {
      errors.name = "First Name is required";
      hasError = true;
    }
    if (formData.charactername.trim() === "") {
      errors.charactername = "Character Name is required";
      hasError = true;
      n;
    }
    if (formData.characterclass.trim() === "") {
      errors.characterclass = "Class is required";
      hasError = true;
    }
    if (formData.characterlevel.trim() === "") {
      errors.characterlevel = "Character Level is required";
      hasError = true;
    }
    if (formData.campaigns.trim() === "") {
      errors.campaigns = "Campaign is required";
      hasError = true;
    }
    if (formData.bio.trim() === "") {
      errors.bio = "Bio is required";
      hasError = true;
    }

    if (hasError) {
      setErrorMessages(errors);
    } else {
      console.log(formData);
      updateEditUser(formData);
      // Implement your submission logic here
     // updateFormDataInDemo(formData);
      Keyboard.dismiss();
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
    onChangeInputHandler("uri", result.assets[0].uri);
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
      extraScrollHeight={Platform.OS == "android" ? 32 : 0}
      enableResetScrollToCoords={false}>
      <View style={styles.signup_container}>
        <Text style={styles.header}>Edit Profile</Text>
        <View style={styles.inputTextWrapper}>
          <TextInput
            placeholder="First Name"
            style={styles.textInput}
            returnKeyType="next"
            onSubmitEditing={editNextInput}
            onChangeText={(value) => onChangeInputHandler("name", value)}
            ref={firstnameInputRef}
            value={formData.name}
          />
          {errorMessages.name !== "" && (
            <Text style={styles.errorText}>{errorMessages.name}</Text>
          )}
        </View>
        <View style={styles.inputTextWrapper}>
          <TextInput
            placeholder="Character Name"
            style={styles.textInput}
            returnKeyType="next"
            onSubmitEditing={editNextInput}
            onChangeText={(value) =>
              onChangeInputHandler("charactername", value)
            }
            ref={characternameInputRef}
            value={formData.charactername}
          />
          {errorMessages.charactername !== "" && (
            <Text style={styles.errorText}>{errorMessages.charactername}</Text>
          )}
        </View>
        <View style={styles.inputTextWrapper}>
          <TextInput
            placeholder="Class"
            style={styles.textInput}
            returnKeyType="next"
            onSubmitEditing={editNextInput}
            onChangeText={(value) =>
              onChangeInputHandler("characterclass", value)
            }
            ref={classInputRef}
            value={formData.characterclass}
          />
          {errorMessages.characterclass !== "" && (
            <Text style={styles.errorText}>{errorMessages.characterclass}</Text>
          )}
        </View>
        <View style={styles.inputTextWrapper}>
          <TextInput
            placeholder="Character Level"
            style={styles.textInput}
            returnKeyType="next"
            onSubmitEditing={editNextInput}
            onChangeText={(value) =>
              onChangeInputHandler("characterlevel", value)
            }
            ref={characterLevelInputRef}
            value={formData.characterlevel}
          />
          {errorMessages.characterlevel !== "" && (
            <Text style={styles.errorText}>{errorMessages.characterlevel}</Text>
          )}
        </View>
        <View style={styles.inputTextWrapper}>
          <TextInput
            placeholder="Campaign"
            style={styles.textInput}
            returnKeyType="next"
            keyboardType="numeric"
            onSubmitEditing={editNextInput}
            onChangeText={(value) => onChangeInputHandler("campaigns", value)}
            ref={campaignInputRef}
            value={formData.campaigns}
          />
          {errorMessages.campaigns !== "" && (
            <Text style={styles.errorText}>{errorMessages.campaigns}</Text>
          )}
        </View>
        <View style={styles.inputTextWrapper}>
          <TextInput
            placeholder="Bio"
            style={[styles.textInput, { height: 100 }]}
            multiline={true}
            returnKeyType="done"
            onSubmitEditing={editNextInput}
            onChangeText={(value) => onChangeInputHandler("bio", value)}
            ref={phoneInputRef}
            value={formData.bio}
          />
          {errorMessages.bio !== "" && (
            <Text style={styles.errorText}>{errorMessages.bio}</Text>
          )}
        </View>

        {image !== null ? (
          <Image
            source={{ uri: image }}
            style={{ width: 150, height: 150 }}
          />
        ) : user.uri !== null ? (
          <Image
            source={user.uri}
            style={{ width: 150, height: 150 }}
          />
        ) : (
          <Image
            source={require("../assets/icon.jpg")}
            style={{ width: 150, height: 150 }}
          />
        )}

        <View style={styles.btnContainer}>
          <Button
            title="Upload Photo"
            onPress={pickImage}
          />
        </View>
        <View style={styles.btnContainer}>
          <Button
            title="Submit"
            onPress={submitPressed}
          />
        </View>
        <View style={styles.btnContainer}>
          <Button
            title="Back"
            onPress={backPressed}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default EditProfileScreen;
