import React from 'react';
import { View, StyleSheet,TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';



const SearchBar = ({containerStyle, value, onChangeText, onClear}) => {
    return(
        <View style={[styles.container,{...containerStyle}]}>
            <TextInput 
                placeholder= "Search" 
                style = {styles.searchBar}
                value = {value}
                onChangeText = {onChangeText}
            />
            {value ? <Icon name = "close" size={20} color = "black" onPress = {onClear} style = {styles.clear}/>: null}

        </View>
    )
}
export default SearchBar;

const styles = StyleSheet.create({
    searchBar : {
        borderWidth : 0.5,
        borderColor : 'grey',
        height : 40,
        borderRadius : 40,
        paddingLeft: 15,
        fontSize: 18
    },
    container : {
        justifyContent : 'center'

    },
    clear : {
        position : 'absolute',
        right: 10
    }
})