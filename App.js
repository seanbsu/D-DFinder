import React, { useState, useEffect, createContext } from 'react';
import { Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from './components/Home';
import MessagesScreen from './components/Messages';
import ProfileScreen from './components/ProfileScreen';
import Icon from './components/Icon';
import styles from './assets/styles';
import SplashScreen from './components/SplashScreen'; 
import LoginView from './components/LoginView';
import Demo from './assets/Demo'; // Import the Demo array

const Tab = createBottomTabNavigator();

// Create context for loggedInUserId and its setter function
export const UserIdContext = createContext();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null); // State to hold the logged-in user

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Set loading state to false after 5000 milliseconds
    }, 5000); // Simulating loading for 5 seconds
  }, []);

  // For testing purposes, set the logged-in user ID directly
  
  useEffect(() => {
    if (isLoading === false) {
      const testUserId = 6; // Number type
      // Attempt to find the user with id 6
      const user = Demo.find(user => user.id === testUserId);
      
      setLoggedInUser(user);
    }
  }, [isLoading, loggedInUser]);


  if (isLoading) {
    return <SplashScreen />;
  }
  if (!isLoggedIn) { 
    return <LoginView setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <UserIdContext.Provider value={{ loggedInUserId, setLoggedInUserId }}>
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
            children={()=><ProfileScreen user={loggedInUser}/>}
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
    </UserIdContext.Provider>
  );
}
