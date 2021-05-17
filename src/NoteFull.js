import AsyncStorage from '@react-native-community/async-storage';
import { forModalPresentationIOS } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/CardStyleInterpolators';
import React ,{useState,useEffect}from 'react';
import { View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Alert
 } from 'react-native';
 import Icon from 'react-native-vector-icons/FontAwesome';
import NoteScreen from './NoteScreen';
import {useNotes } from './NoteProvider';

 


const NoteFull = ({item, navigation, props, route}) => {
    const [note,setNote] = useState(route.params.note);
    // const {note} = route.params
    const [currentDate, setCurrentDate] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const {setNotes} = useNotes();


    useEffect(() => {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        setCurrentDate(
          date + '/' + month + '/' + year 
          + ' ' + hours + ':' + min 
        
        );
      }, []);


   const deleteAlert = () => {
        Alert.alert('Delete','want to delete your note?',
        [
            {
                text : 'Delete',
                onPress : deleteNote,
            },
            {
                text : 'Cancel',
                onPress:() => console.log('cancel')
            }
        ],
            {
                cancelable : true,
            }
            );
   };

   const deleteNote = async () => {
      const result =  await AsyncStorage.getItem('notes')
      let notes = []
      if(result !== null) notes = JSON.parse(result);

     const newNotes = notes.filter(n => n.id !== note.id)
     setNotes(newNotes);
     await AsyncStorage.setItem('notes', JSON.stringify(newNotes))
     navigation.navigate('HomeScreen')

   };

   const handleClose = () => {
        setShowModal(false)
   }
 
   const handleUpdate =  async (title,disc) => {
      const result = await AsyncStorage.getItem('notes')
      let notes = [];
      if(result !== null) notes = JSON.parse(result)

      const newNotes = notes.filter(n => {
          if(n.id === note.id){
              n.title = title
              n.disc = disc
              n.isUpdated = true

              setNote(n);
          }
          return n;
      });
      setNotes(newNotes);
      await AsyncStorage.setItem('notes', JSON.stringify(newNotes))
   }

   const openEditModal = () => {
       setIsEdit(true)
        setShowModal(true);
       
   };



     return(
         <View style={styles.container}>
             <View style={styles.header}>
                 <View style = {{flexDirection : "row"}}>
                    <TouchableOpacity style = {{marginLeft : 30}}  onPress = {()=>navigation.navigate('HomeScreen')}> 
                        <Icon name = "arrow-left" size = {35} style = {{color :'white'}}/>
                    </TouchableOpacity>

                    <TouchableOpacity style ={{marginLeft : 150}} onPress = {deleteAlert}>
                        <Icon name = "trash" size = {30} style = {{color :'white', marginLeft: 30}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style ={{marginLeft : 10}} onPress = {openEditModal}>
                        <Icon name = "edit" size = {30} style = {{color :'white', marginLeft: 30}}/>
                    </TouchableOpacity>

                 </View>
                

             </View>
             <View style = {styles.footer}>
                 <Text>created at {currentDate}</Text>
                <Text style= {styles.title}>{note.title}</Text>
                <Text style= {styles.discStyle}>{note.disc}</Text>
             </View>

             <NoteScreen
             onClose = {handleClose}
             onSubmit = {handleUpdate}
             visible = {showModal}
             isEdit = {isEdit}
             note = {note}
             />
            
         </View>
     )
}
export default NoteFull;


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
        flex : 6,
        backgroundColor: "white",
        borderTopLeftRadius : 20,
        borderTopRightRadius : 20,
        paddingVertical : 50,
        paddingHorizontal : 30,
        backgroundColor : '#e0ffff'
    },
    title : {
        fontSize : 25,
        color : "#3b5998",
        fontWeight:"bold",
        marginTop :10
    },
    discStyle : {
        marginTop: 15,
        fontSize: 20
    }

})