import { useNavigation } from '@react-navigation/core'
import React,{useState} from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Alert, Modal } from 'react-native'
import { getAuth, signInWithEmailAndPassword  } from "firebase/auth";

const auth = getAuth()

const SettingsScreen = () => {

  const [password, setPassword] = useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation()
  const user = auth.currentUser;
  
  const handleLoginRequirement = () => {
    signInWithEmailAndPassword(user.email,password)
    .then(userCredentials => {
        const user_cred = userCredentials.user;
        console.log('User to be deleted', user_cred.email);
        handleDeleteUser()
    })
    .catch(error => alert(error.message))
}
  

  const handleSignOut = () => {
   
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }



const handleDeleteUser = () => {
    user.delete()
    .then(() => {
        console.log("User deleted");
        navigation.replace("Login")
    })
    .catch((error) => alert(error.message));
}
  return (
    <View style={styles.container}>
        <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Delete Account</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
            navigation.replace("Home")}}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Return</Text>
      </TouchableOpacity>



            
    
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <TextInput
              placeholder="Password"
              placeholderTextColor={"#b1fab9"}
              style={styles.input}
              backgroundColor={"#151517"}
              value={password}
              onChangeText={text => setPassword(text)}
              clearButtonMode="always"
              width= {'80%'}
              padding ={15}
              borderRadius={"10"}
              secureTextEntry
              
            />
            <TouchableOpacity
              style={[styles.modalButton, styles.buttonClose]}
              onPress={()=> handleLoginRequirement()}
            >
            
              <Text style={styles.deletelText}>Delete Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.buttonClose]}
              onPress={()=> setModalVisible(!modalVisible)}
            >
                <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>

  )
}

export default SettingsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e1f'
  },
  deletelText:{
    color: 'red',
    fontWeight: '900',
    fontSize: 20,
  },
  modalButton:{
    backgroundColor: '#151517',
    width: '80%',
    height: 60,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  
  },
   button: {
    backgroundColor: '#151517',
    width: 350,
    height: 140,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#b1fab9',
    fontWeight: '900',
    fontSize: 30,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 30,
    width: "80%",
    backgroundColor: "#b1fab9",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
})