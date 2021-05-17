/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import 'react-native-gesture-handler';
import React from 'react';
// import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootStackScreen from './src/RootStackScreen';
import NoteProvider from './src/NoteProvider';
// import HomeScreen from './src/HomeScreen';



const App = () => {
  

  return (
   
    <NavigationContainer>
      <NoteProvider>
      <RootStackScreen/>
      </NoteProvider>
      
    </NavigationContainer>
  
  );
};



export default App;
