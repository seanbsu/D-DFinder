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

const Profile = () => {
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
  } = 
	{
		id: 5,
		name: 'Ryllyn Torate',
		age: '27',
		location: 'Irvine, CA',
		info1: 'Level 10 warlock/bard, Part time Singer/Dancer.',
		info2: 'Tea Totaller, Loves Photography & Travel',
		info3: 'Secrets of Wildemount',
		info4: 'Last seen: 23h ago',
		match: '76',
		description:
			'Level 10 warlock/bard, Part time Singer/Dancer.',
		status: 'Offline',
		message: "It's not who I am underneath but what I do that defines me.",
		uri: require('../assets/6.jpg')
	};

  return (
    <ImageBackground
      source={require('../assets/bg.png')}
      style={styles.bg}
    >
      <ScrollView style={styles.containerProfile}>
        <ImageBackground source={uri} style={styles.photo}>
          <View style={styles.top}>
            <TouchableOpacity>
              <Text style={styles.topIconLeft}>
                <Icon name="chevron-back-sharp" size= {20 } />
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
