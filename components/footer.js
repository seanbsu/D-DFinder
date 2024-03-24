import React from "react";
import { Text,StyleSheet } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MessagesScreen from "./Messages";
import Icon from "./Icon";
import styles from '../assets/styles';

const Tab = createBottomTabNavigator();

const Footer = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#7444C0",
        inactiveTintColor: "#363636",
        labelStyle: {
          fontSize: 14,
          textTransform: "uppercase",
          paddingTop: 10
        },
        style: {
          backgroundColor: "#FFF",
          borderTopWidth: 0,
          paddingBottom: 30,
          height: 60,
          marginBottom: 0,
          shadowOpacity: 0.05,
          shadowRadius: 10,
          shadowColor: "#000",
          shadowOffset: { height: 0, width: 0 }
        }
      }}
    >
      {/* Matches screen */}
      {/* <Tab.Screen
        name="Matches"
        component={MatchesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Text style={[styles.iconMenu, { color: focused ? "#7444C0" : "#363636" }]}>
              <Icon name="heart" />
            </Text>
          )
        }}
      /> */}

      {/* Chat screen */}
      <Tab.Screen
        name="Chat"
        component={MessagesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Text style={[styles.iconMenu, { color: focused ? "#7444C0" : "#363636" }]}>
              <Icon name="chat" />
            </Text>
          )
        }}
      />
    </Tab.Navigator>
  );
};

export default Footer;
