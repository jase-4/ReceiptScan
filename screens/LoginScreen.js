import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth()

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation =  useNavigation()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          if (user) {
            navigation.replace("Home")
          }
        })
    
        return unsubscribe
      }, [])

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Registered with:', user.email);
          })
          .catch(error => alert(error.message))
    }

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email,password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Login with:', user.email);
        })
        .catch(error => alert(error.message))
    }

      return (
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
        >
          <View style={styles.inputContainer}>
            <TextInput
              clearButtonMode='always'
              placeholder="Email"
              value={email}
              onChangeText={text => setEmail(text)}
              style={styles.input}
              keyboardAppearance = 'dark'
            />
            <TextInput
              clearButtonMode='always'
              placeholder="Password"
              value={password}
              onChangeText={text => setPassword(text)}
              style={styles.input}
              keyboardAppearance = 'dark'
              secureTextEntry
            />
          </View>
    
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleLogin}
             style={styles.button}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSignUp}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#1e1e1f'
    },
    inputContainer: {
      width: '80%',  
    },
    input: {
     
      backgroundColor: '#b1fab9',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 40,
    },
    buttonContainer: {
      width: '80%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
    },
    button: {
      backgroundColor: '#151517',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 40,
    },
    buttonText: {
      color: '#b1fab9',
      fontWeight: '900',
      fontSize: 20,
    },
  })
  