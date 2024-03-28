import React from 'react';
import { Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from './components/Home';
import MessagesScreen from './components/Messages';
import ProfileScreen from './components/ProfileScreen';
import Icon from './components/Icon';
import styles from './assets/styles';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
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
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Text style={[styles.iconMenu, { color: focused ? "#7444C0" : "#363636" }]}>
              <Icon  name="search" size={24} />
            </Text>
          ),
          headerShown: false
        }}
      />
        <Tab.Screen
          name="Chat"
          component={MessagesScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Text style={[styles.iconMenu, { color: focused ? "#7444C0" : "#363636" }]}>
                <Icon name="chatbubble" size={24} />
              </Text>
            )
          }}
        />

<Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Text style={[styles.iconMenu, { color: focused ? "#7444C0" : "#363636" }]}>
                <Icon name="person-circle-outline" size={24}/>
              </Text>
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
