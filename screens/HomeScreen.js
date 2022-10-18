import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'


const HomeScreen = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
        <View style= {styles.subContainer} >
            <TouchableOpacity 
            onPress={() => {
            navigation.replace("Scan")}}
            style={styles.button}>  
                <Text style={styles.buttonText}>Scan</Text> 
             </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>History</Text>
            </TouchableOpacity> 
            <TouchableOpacity 
                onPress={() => {
                navigation.replace("Settings")}}
                style={styles.button}
                > 
                    <Text style={styles.buttonText}>Settings</Text>
            </TouchableOpacity>
        </View>
    </View>
    
  )
}
export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e1f'
  },
  subContainer: {
   flexDirection:'row',
   flexWrap: 'wrap',
   justifyContent: 'center',
   alignItems: 'center'

  },
   button: {
    backgroundColor: '#151517',
    width: 350,
    height: 140,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
    marginHorizontal: 10,
    justifyContent:'center',
  },
  buttonText: {
    color: '#b1fab9',
    fontWeight: '900',
    fontSize: 30,
  },
})