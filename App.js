import React, { useState, useEffect, createContext } from "react";
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
import {saveRemoteProfiles, getRemoteProfiles, loadList, saveList} from './components/RemoteHandler'
import {  firebase_auth, firebase_db } from "./firebaseConfig";
import { collection, doc, setDoc, addDoc,  Timestamp } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from "firebase/auth";

// loadurl="https://cs.boisestate.edu/~scutchin/cs402/codesnips/loadjson.php?user=ryeland"
// saveurl="https://cs.boisestate.edu/~scutchin/cs402/codesnips/savejson.php?user=ryeland"

const Tab = createBottomTabNavigator();
// Create context for loggedInUserId and its setter function
export const UserIdContext = createContext();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null); // State to hold the logged-in user
  const [Users, setUsers] = useState(null)
  const [isDatabaseInitialized, setIsDatabaseInitialized] = useState(false);

  // useEffect(() => {
  //   const initializeDatabase = async () => {
  //     try {
  //       // Initialize users collection
  //       const usersCollectionRef = collection(firebase_db, 'users');
  
  //       // Loop through Demo data and add documents to users collection
  //       for (const user of Demo) {
  //         // Create user in Firebase Authentication
  //         const userCredential = await createUserWithEmailAndPassword(firebase_auth, user.email, user.password);
  //         const uid = userCredential.user.uid;
  
  //         // Use UID to set document in Firestore
  //         const userDocRef = doc(usersCollectionRef, uid);
  //         await setDoc(userDocRef, {
  //           firstname: user.firstname,
  //           charactername: user.charactername,
  //           characterClass: user.characterClass,
  //           characterLevel: user.characterLevel,
  //           campaign: user.campaign,
  //           bio: user.bio,
  //           uri: user.uri,
  //           like: user.like || [],
  //           dislike: user.dislike || [],
  //           match: user.match || []
  //         });
  
  //         // Add messages subcollection for each user
  //         const messagesCollectionRef = collection(userDocRef, 'messages');
  //         const addedMatchIds = new Set();
  
  //         for (const messageGroup of user.messages || []) {
  //           const matchId = messageGroup.matchId.toString();
  
  //           if (!addedMatchIds.has(matchId)) {
  //             addedMatchIds.add(matchId);
  //             const matchDocRef = doc(messagesCollectionRef, matchId);
  
  //             // Add each message as a separate document within the match document
  //             for (const message of messageGroup.conversation || []) {
  //               if (message.senderId && message.content && message.timestamp) {
  //                 await addDoc(collection(matchDocRef, 'conversation'), {
  //                   senderId: message.senderId,
  //                   content: message.content,
  //                   timestamp: Timestamp.fromDate(new Date(message.timestamp))
  //                 });
  //               }
  //             }
  //           }
  //         }
  //       }
  
  //       setIsDatabaseInitialized(true);
  //       console.log('Database initialized successfully.');
  //     } catch (error) {
  //       console.error('Error initializing database:', error);
  //     }
  //   };
  
  //   initializeDatabase();
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Set loading state to false after 5000 milliseconds
    }, 5000); // Simulating loading for 5 seconds
  }, []);
  const updateUser = (newUser) => {
    console.log("Request to update the logged in user")
    setLoggedInUser(newUser);
  };
  // For testing purposes, set the logged-in user ID directly
  // Define a callback function to receive the username
  const handleLogin = (user) => {
    setLoggedInUser(user);
    console.log("Logging in displayed user")
    // console.log(user)
   };

  const isLogOut = (logOut) => {
    setIsLoading(false);
    setLoggedInUser(null);
    setIsLoggedIn(logOut);
  };

  useEffect(() => {
  //   saveRemoteProfiles(saveurl, Demo).then(() => {
  //     console.log("Saved Global User:");
  //     setUsers(Demo)
  //   }).catch((e) => {
  //     console.log("Error saving demo");
  //     console.log(e);
  //  });

    getRemoteProfiles(loadurl).then((ret)=>{
      console.log("Got profiles in main")
      setUsers(ret)
    }).catch(()=>{
      console.log("There was an error loading remote in app.json")
    })
  }, []);

  useEffect(() => {
    if(loggedInUser === null || Users === null){
      console.log("Not logged in, don't update users")
      return;
    }

    var newUsers = Users.map((profile) => {
      if (
        profile.email === loggedInUser.email
      ) {
        return {...loggedInUser}
      }
      return profile;
    });
    setUsers(newUsers)

    saveRemoteProfiles(saveurl, newUsers).then(() => {
      console.log("saved user");
      // console.log(loggedInUser)
    }).catch((e) => {
      console.log("Error saving user globally");
      console.log(e);
   });
  }, [loggedInUser]);


  if (isLoading) {
    return <SplashScreen />;
  }
  if (!isLoggedIn) {
    return (
      <LoginView
        setIsLoggedIn={setIsLoggedIn}
        onLogin={handleLogin}
        auth={firebase_auth}
      />
    );
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
              paddingTop: 10,
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
              shadowOffset: { height: 0, width: 0 },
            },
          }}>
          <Tab.Screen
            name="Home"
            children={() => (
              <Home
                user={loggedInUser}
                updateUser={updateUser}
              />
            )}
            options={{
              tabBarIcon: ({ focused }) => (
                <Text
                  style={[
                    styles.iconMenu,
                    { color: focused ? "#7444C0" : "#363636" },
                  ]}>
                  <Icon
                    name="search"
                    size={24}
                  />
                </Text>
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Chat"
            children={() => <MessagesScreen user={loggedInUser} setUser={setLoggedInUser} />}
            options={{
              tabBarIcon: ({ focused }) => (
                <Text
                  style={[
                    styles.iconMenu,
                    { color: focused ? "#7444C0" : "#363636" },
                  ]}>
                  <Icon
                    name="chatbubble"
                    size={24}
                  />
                </Text>
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            children={() => (
              <ProfileScreen
                user={loggedInUser}
                back={false}
                updateUser={updateUser}
                isLogOut={isLogOut}
              />
            )}
            options={{
              tabBarIcon: ({ focused }) => (
                <Text
                  style={[
                    styles.iconMenu,
                    { color: focused ? "#7444C0" : "#363636" },
                  ]}>
                  <Icon
                    name="person-circle-outline"
                    size={24}
                  />
                </Text>
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </UserIdContext.Provider>
  );
}
