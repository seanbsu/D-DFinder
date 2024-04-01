import React from 'react';
import styles from '../assets/styles';

import {
  ScrollView,
  View,
  Text,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import ProfileItem from './ProfileItem';
import Icon from './Icon';
import Demo from '../assets/Demo';

const Profile = ({onClose, user}) => {
  const {
    age,
    uri,
    info1,
    info2,
    info3,
    info4,
    location,
    match,
    name
  } = user
	

  return (
    <ImageBackground
      source={require('../assets/bg.png')}
      style={styles.bg}
    >
      <ScrollView style={styles.containerProfile}>
        <ImageBackground source={uri} style={styles.photo}>
          <View style={styles.top}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.topIconLeft}>
                <Icon name="chevron-back-sharp" size= {20}  />
              </Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.topIconRight}>
                <Icon name="ellipsis-vertical" size={20} />
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <ProfileItem
          matches={match}
          name={name}
          age={age}
          location={location}
          info1={info1}
          info2={info2}
          info3={info3}
          info4={info4}
        />

        <View style={styles.actionsProfile}>
          <TouchableOpacity style={styles.circledButton}>
            <Text style={styles.iconButton}>
              <Icon name="ellipsis-horizontal" />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.roundedButton}>
            <Text style={styles.iconButton}>
              <Icon name="chatbubble" />
            </Text>
            <Text style={styles.textButton}>Start chatting</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Profile;
