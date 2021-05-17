import React, {useState, useEffect} from 'react';
import { View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Modal
 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
 import Icon from 'react-native-vector-icons/FontAwesome';

const NoteScreen = ({visible, onClose, onSubmit, isEdit, note}) => {
  const [title, setTitle] = useState('');
  const [disc, setDisc] = useState('');


  const handleOnChangeText = (text,valueFor) => {
      if(valueFor === 'title') setTitle(text);
      if(valueFor === 'disc') setDisc(text);

  };

  const handleSave = () => {
      if(!title.trim() && !disc.trim())
       return onClose()

       if(isEdit){
           onSubmit(title,disc);

       }else{
            onSubmit(title,disc);
            setTitle('');
            setDisc('');
       }
        onClose();

  };

  const closeModal= () => {
      if(!isEdit){
        setTitle('');
        setDisc('');
      }
        onClose();
    };

  useEffect(() => {
      if(isEdit){
          setTitle(note.title)
          setDisc(note.disc)
      }
  }, [isEdit]);
 
   

    return(
        <View style = {styles.container}>
            <View style = {styles.header}>

            <Icon name = "check-circle" size = {20} style = {{color :'black'}}/>

            </View>

            <View style = {styles.footer}>
                <Modal visible={visible} animationType = 'fade'>

                        <View style = {{flexDirection : 'row', marginTop : 50, marginLeft : 200}}>
                            <TouchableOpacity onPress = {handleSave}>
                                <Icon name = "check-circle" size = {30} style = {{color :'blue', marginLeft : 50}}/>    
                            </TouchableOpacity>

                           {title.trim() || disc.trim() ? (
                           <TouchableOpacity onPress = {closeModal}>
                                <Icon name = "trash" size = {30} style = {{color :'blue', marginLeft: 30}}/>
                           </TouchableOpacity>
                           ) : null}
                            

                        </View>
                    <View style = {styles.textStyle}>
                      
                   
                        <TextInput 
                            placeholder = "Title" 
                            style={[styles.input, styles.title]}
                            value = {title}
                            onChangeText = {(text) => handleOnChangeText(text,'title')}
                        />

                        <TextInput 
                            placeholder = "Add Note..." 
                            style={[styles.input, styles.dis]}
                            multiline
                            value = {disc}
                            onChangeText = {(text) => handleOnChangeText(text,'disc')}
                        />

                    </View>
                  
                </Modal>

            </View>
        </View>
    )
}
export default NoteScreen;

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : "#4D94FF"
    },
    header : {
        flex : 1,
        justifyContent : 'center',
        // backgroundColor : 'red'
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
    input : {
        borderBottomWidth : 2,
        borderBottomColor : "grey"
    },
    textStyle : {
        marginTop : 50,
        paddingHorizontal : 30
    },
    title : {
        height : 40,
        marginBottom :15,
        fontWeight : 'bold',
        fontSize : 18
    }
   

});

