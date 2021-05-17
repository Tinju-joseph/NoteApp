import React, {useEffect, useState,useContext} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    FlatList,
   

  } from 'react-native';
  import AsyncStorage from '@react-native-community/async-storage'
  import LinearGradient from 'react-native-linear-gradient';
 import Icon from 'react-native-vector-icons/FontAwesome';
 import { useNotes } from './NoteProvider';

import NoteScreen from './NoteScreen';
import Note from './Note';
import SearchBar from './SearchBar';



  const HomeScreen = ({navigation, props}) => {

const [modalVisible, setModalVisible] = useState(false);
// const [notes,setNotes] = useState([]);
const {notes, setNotes, findNotes} = useNotes();
const [searchQuery, setSearchQuery] = useState('');
const [resultNotFound, setResultNotFound] = useState(false)


const handleSearchInput = async (text) => {
    setSearchQuery(text);
    if(!text.trim()){
        setSearchQuery('')
        setResultNotFound(false)
       return await findNotes()
    }
    const filteredNotes = notes.filter(note => {
        if(note.title.toLowerCase().includes(text.toLowerCase())){
            return note;
        }
    })
    if(filteredNotes.length){
        setNotes([...filteredNotes]);
    }else {
        setResultNotFound(true);
    }

}


const handleOnSubmit = async (title,disc) => {
    // const time = new Date().getTime()
    const note = {id : Date.now(), title, disc, time : Date.now()}
    const updatedNotes = [...notes,note];
    setNotes(updatedNotes)
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes))
};

// const findNotes = async () => {
//     const result = await AsyncStorage.getItem('notes');
//     // console.log(result)
//     if(result !== null) 
//       setNotes(JSON.parse(result));

// };

const openNote = note => {
    navigation.navigate('NoteFull', {note})
}

useEffect(() => {
    findNotes();
}, []);

const renderNoteScreen = (props) => <HomeScreen {...props}/>


const handleClear = async () => {
    setSearchQuery('')
    setResultNotFound(false)
    await findNotes()
    
}


      return(
        <View style = {styles.container}>
        <View style = {styles.header}>

            <View style = {{flexDirection : 'row'}}>
                {/* <TouchableOpacity style = {{marginLeft  :35}} >
                    <Icon name = "bars" size={25} color = "white"/>
                </TouchableOpacity> */}

                <Text style = {styles.heading}>Notes</Text>

                <View>
                    <TouchableOpacity  onPress = {()=>setModalVisible(true)} style = {{position : 'absolute', left : 180}}>
                        <Icon name = "plus-circle" size={35} color = "white"/>
                    </TouchableOpacity>
            </View>   
            </View>
        </View>

        <View style = {styles.footer}>
            <View>
                {notes.length ?(
                    <SearchBar  value = {searchQuery} 
                    containerStyle = {{marginTop : 5}}
                    onChangeText = {handleSearchInput}
                    onClear = {handleClear}
                    
                    />
                ) : null}
            </View>




        <View style = {{marginTop : 30}}>
            <FlatList
                data={notes}
              
                keyExtractor ={item => item.id.toString()}
                renderItem={({item}) => <Note onPress ={() => openNote(item)} item={item}/>}
            />


        </View>

        
        {!notes.length ? (
            <View style ={styles.emptyHeaderContainer}>
            <Text style ={styles.emptyHeader}> Add Notes</Text>
        </View>
        ) : null}
        
            
    </View>
        <NoteScreen 
            visible = {modalVisible} 
            onClose = {() => setModalVisible(false)}
            onSubmit = {handleOnSubmit}
        />
    </View>
    
      )
  }
  export default HomeScreen;

  const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : "#4D94FF"
    },
    header : {
        flex : 1,
        justifyContent : 'center',
    },
    footer : {
        flex : 5,
        backgroundColor: "white",
        borderTopLeftRadius : 20,
        borderTopRightRadius : 20,
        paddingVertical : 50,
        paddingHorizontal : 30,
        backgroundColor : '#e0ffff'
    },
    title : {
        fontSize : 18,
        color : "#3b5998"
    },
    startbutton :{
        width : 150,
        height : 40,
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 50,
        flexDirection : 'row'
    },
    heading : {
        color  : 'white',
        fontSize : 25,
        textAlign : 'left',
        paddingLeft : 30
    },
    input: {
        marginHorizontal: 20,
        height: 37,
        borderColor: '#999',
        borderWidth: 0,
        color:'black'
      },
      search: {
        padding:0,
        position:'absolute',
        marginTop:20,
        marginHorizontal:20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.6,
        elevation: 3,
        borderColor: '#999',
        borderWidth: 0,
        borderRadius:25,
        backgroundColor:'#FFF',
        opacity:0.9,
        width:304,
        top:0,
        zIndex:1
      },
      emptyHeader : {
          fontSize : 30,
          textTransform : "uppercase",
          fontWeight : 'bold',
          opacity : 0.2
      },
      emptyHeaderContainer : {
          flex : 1,
          justifyContent : 'center',
          alignItems : 'center'
      }
   
});