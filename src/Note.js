import React from 'react';
import { View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity
 } from 'react-native';


const Note = ({item, onPress}) => {
    const {title, disc} = item;
     return(
         <TouchableOpacity onPress = {onPress}>
              <View style={styles.container}>
             <Text numberOfLines = {2} style = {styles.titleStyle}>{title}</Text>
             <Text numberOfLines = {3}>{disc}</Text>

         </View>

         </TouchableOpacity>
        
     )
}
export default Note;
// const width = Dimensions.get('window').width-40

const styles = StyleSheet.create({
    container : {
        
        backgroundColor : "#4D94FF",
        width : 300,
        padding : 10,
        borderRadius: 10,
        marginTop : 10
    },
    titleStyle : {
        fontSize : 18,
        fontWeight : 'bold',
        color : "blue"
    }

})