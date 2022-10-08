import { StatusBar } from 'react-native';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import logo from '../../assets/logo.png'
import apple from '../../assets/apple_login.png'
import google from '../../assets/google_login.png'
import fb from '../../assets/facebook_login.png'
import twitter from '../../assets/twitter_login.png'
import { auth } from '../loginUtils/firebase'
import {signInWithEmailAndPassword, updateProfile, getAuth, signInWithPopup,signInWithRedirect, GoogleAuthProvider} from 'firebase/auth'
import React, {useState} from 'react'
import MyStack from '../../Components/register/Main.js'




export default function Login( {navigation}) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const navigation = useNavigation()

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      navigation.navigate('main')
    })
    .catch((error) => {
      alert(error.message)
    })
  }

// const handleGoogleLogin = () => {
//     const credential = GoogleAuthProvider.credential(id_token)
//     const provider = new GoogleAuthProvider();
//     provider.addScope('email')
//     const result = signInWithPopup(auth, provider)
//     const user = result.user;
//     console.log(user)
//   };



  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.inputContainer}>
      <Image source={logo} style={styles.logo}/>

      <View >
        <TextInput
          placeholder="Username"
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
      </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

        </View>

        <Text style={styles.textLink}>Forgot Password?</Text>

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{flex: 1, height: 1, backgroundColor: 'white'}} />
      <View>
        <Text style={{width: 50, textAlign: 'center', color: 'white'}}>OR</Text>
      </View>
      <View style={{flex: 1, height: 1, backgroundColor: 'white'}} />
    </View>

    <View style={styles.iconsContainer}>
            <Image source={apple} style={styles.icons} />
            <Image source={twitter} style={styles.icons}/>
            <Image source={fb} style={styles.icons} />
            <Image source={google} style={styles.icons} />
        </View>

    <View style={{marginTop:20, marginBottom:20}}>
    <Text style={{textAlign: 'center', color: '#999999'}}>Don't have an account?
    <Text style={styles.textLink} onPress={() => navigation.navigate('register')}> Sign up</Text>
    </Text>
    </View>

    </SafeAreaView>
    </TouchableWithoutFeedback>
    <StatusBar barStyle={'light-content'}/>
  </KeyboardAvoidingView>
)
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    width: '60%'
  },
  input: {
    backgroundColor: 'white',
    padding: 12,
    paddingVertical: 10,
    borderRadius: 5,
    margin: 8,
    width:244
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    width: '60%'
  },
  button: {
    backgroundColor: '#0077B6',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: 242
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0077B6',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0077B6',
    fontWeight: '700',
    fontSize: 16,
  },
  textLink: {
    color:'#90E0EF',
    padding: 50,
    marginLeft: 10
  },
  iconsContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 100,
    marginTop: 20,
    marginRight: 15
  },
  icons:{
    marginLeft: 10
  },
  logo: {
    height: 250,
    width: 350,
    marginBottom: 40
  }
})