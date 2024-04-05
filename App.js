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
import  UserProfile  from './assets/UserProfile'; // Import the UserProfile array

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
   // Define a callback function to receive the username
   const handleLogin = (user) => {
    setLoggedInUser(user);
   };

  useEffect(() => {
    if (isLoading === false && loggedInUser !== null) {
      // const testUserId = 6; // Number type
      // // Attempt to find the user with id 6
      // const user = Demo.find(user => user.id === testUserId);
      console.log("Logged In");
      console.log(loggedInUser);
    }
  }, [isLoading, loggedInUser]);

 

  if (isLoading) {
    return <SplashScreen />;
  }
  if (!isLoggedIn) { 
    return <LoginView setIsLoggedIn={setIsLoggedIn}  onLogin={handleLogin}/>;
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
            children={()=><Home user={loggedInUser}/>}
      
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
            children={()=><ProfileScreen user={loggedInUser} back={false}/>}
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
