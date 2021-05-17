import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    backgroundColor,
    TextInput,
    TouchableOpacity,
    Alert,
    Linking,
    Platform

  } from 'react-native';
  
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';


  const LoginScreen = ({navigation}) => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const login = async ()=>{
        const  userResult = await AsyncStorage.getItem("name")
        const  passResult = await AsyncStorage.getItem("pass")
        if (userResult == userName && passResult == password ) {
            navigation.navigate('HomeScreen')
            // console.log(userResult);
            // console.log(passResult);
          }else{
            Alert.alert('Incorrect Username / Password')
          }
        
    }
   
   

   

        //  const LoginNext = () => {
        //   if(userName  &&  password){
        //     navigation.navigate('HomeScreen')
        //   }else
        //       Alert.alert('incorrect')
             
        //  }


        //  const name = async () => {

        //  }

      return(

        <View style = {styles.container}>
        <Text style = {styles.title}>NOTE APP</Text>

        <View>
                <Icon name = "user" size = {20} style={styles.icon} />
                    <TextInput 
                        placeholder = "User-name" 
                        keyboardType = "default"
                        style = {styles.textInput} 
                        autoCapitalize = "none"
                        value={userName}
                        onChangeText = {(val)=>setUserName(val)}
                        maxLength = {10}
                    />
            
            </View>

            <View >
                <Icon name = "lock" size = {20} style={styles.icon} />
                    <TextInput 
                        placeholder = "Password" 
                        style = {styles.textInput} 
                        autoCapitalize = "none"
                        secureTextEntry = {true}
                        value={password}
                        onChangeText = {(val) => setPassword(val)}
                        maxLength = {15}
                    />

                      <View style = {{left : 280,bottom : 30,width : 25}}>
                       
                    </View>
            
            </View>

            <View>
            <TouchableOpacity onPress = {login}>
                    <LinearGradient 
                    colors = {['#7FFFD4','white']}
                    style = {styles.startbutton}>
                        <Text style = {{fontWeight : 'bold'}}>LOGIN</Text>
                    </LinearGradient>
                    
                </TouchableOpacity>
            </View>

            <View>

                   

                <TouchableOpacity onPress = {()=>navigation.navigate('RegisterScreen')}>
                    <Text style = {{textAlign: 'center', justifyContent : 'center', color : '#000080', marginTop : 25, fontSize : 18, fontWeight : 'bold'}} >Register </Text>
                </TouchableOpacity> 
               
                </View>
            {/* <View>
                <Text>{login}</Text>
            </View> */}


    
</View>
      )
  }
  export default LoginScreen;

  const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#4D94FF'
    },
    title : {
        fontSize : 30,
        textAlign : 'center',
        color : 'black',
        fontWeight : 'bold',
        // fontStyle : 'italic',
        marginTop : 100
    }, 
    textInput : {
        width : 300,
        height : 40,
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 50,
        flexDirection : 'row',
        borderWidth: 1,
        marginTop : 35,
        paddingLeft: 50,
        marginLeft  : 30,
        // backgroundColor: 'white'
        // alignContent : "center",
        // justifyContent : 'center'
    },
    icon : {
      marginLeft : 45,
      top : 65,
      color : 'black'
    },
    startbutton :{
        width : 150,
        height : 40,
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 50,
        flexDirection : 'row',
        marginTop : 50,
        marginLeft :100
        
    },
});