import React , { useState, useEffect } from 'react';
import { Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from './components/Home';
import MessagesScreen from './components/Messages';
import ProfileScreen from './components/ProfileScreen';
import Icon from './components/Icon';
import styles from './assets/styles';
import SplashScreen from './components/SplashScreen'; 

const Tab = createBottomTabNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // You can set it to true if the user is already logged in

  useEffect(() => {
    // Simulate checking user authentication status
    // You can replace this with your actual authentication logic
    setTimeout(() => {
      setIsLoading(false);
      // Check if the user is logged in
      // For now, I'll assume the user is not logged in
      setIsLoggedIn(false);
    }, 5000); // Simulating 2 seconds for splash screen
  }, []);

  if (isLoading) {
    // Show splash screen while loading
    return <SplashScreen />;
  }

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
