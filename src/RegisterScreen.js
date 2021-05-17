import React , {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert

} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

const RegisterScreen = ({navigation}) => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
  
 
    const registerData = async () => {
        
        if (userName && password ) {

            await AsyncStorage.setItem("name",userName)
            await AsyncStorage.setItem("pass",password)
      
            const  userResult = await AsyncStorage.getItem("name")

            alert('Account Created');
             navigation.navigate('LoginScreen')
        
          
        } else {
          alert('Enter Username and Password');
        }
      };
    
    return(
        <View style = {styles.container}>
           

            <View style = {{marginTop : 70}}>
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

                <View style = {{marginVertical : -25}}>
                        <Icon name = "lock" size = {20} style={styles.icon} />
                        <TextInput 
                            placeholder = "Password" 
                            style = {styles.textInput} 
                            autoCapitalize = "none"
                            secureTextEntry = {true}
                            value={password}
                            onChangeText = {(val) => setPassword(val)}
                            maxLength = {12}
                        />
                          
                </View>

            

                <View style = {{marginVertical : 15}}>
                <TouchableOpacity onPress = {registerData}>
                        <LinearGradient 
                        colors = {['#7FFFD4','white']}
                        style = {styles.startbutton}>
                            <Text style = {{fontWeight : 'bold'}}>REGISTER</Text>
                        </LinearGradient>
                        
                    </TouchableOpacity>
                </View>

               
                  


        
    </View>
    )
  }

export default RegisterScreen;

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#4D94FF'
    },
    title : {
        fontSize : 25,
        textAlign : 'center',
        color : 'white',
        fontWeight : 'bold',
        fontStyle : 'italic',
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
        width : 200,
        height : 40,
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 50,
        flexDirection : 'row',
        marginTop : 50,
        marginLeft :70,
        alignContent: 'center'
        
    },


});