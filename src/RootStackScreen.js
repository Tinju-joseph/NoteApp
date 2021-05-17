import React from 'react';


import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import HomeScreen from './HomeScreen';
import NoteScreen from './NoteScreen';
import NoteFull from './NoteFull';




const RootStack = createStackNavigator();


const RootStackScreen = ({navigation}) => {
    return (
    
    <RootStack.Navigator headerMode = 'none'> 
      
       <RootStack.Screen name= "LoginScreen" component ={LoginScreen}/>
       <RootStack.Screen name= "HomeScreen" component ={HomeScreen}/>
       <RootStack.Screen name= "RegisterScreen" component ={RegisterScreen}/>
       <RootStack.Screen name= "NoteFull" component ={NoteFull}/>
      
     
    </RootStack.Navigator>
   
    )
}


export default RootStackScreen;