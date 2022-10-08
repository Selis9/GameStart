import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Keyboard, Button, TouchableOpacity, ImageBackground} from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import CardTiles from './CardTiles.js';

export default function RegisterConsoles ({navigation, route}) {
  const [consoles, setConsoles] = useState([]);
  const {userID} = route.params;
  const [list, setList] = useState({Xbox: false, Playstation: false, NintendoSwitch: false, Pc: false});

  const systemImg = [{system: 'Xbox', url: 'https://www.freepnglogos.com/uploads/xbox-one-logo-vector-24.png'}, {system: 'Playstation', url: 'https://i.ibb.co/myLWzfJ/Play-Station-Logo-wine.png'}, {system: 'NintendoSwitch', url: 'https://i.ibb.co/pZdYnzh/8ad56e93021d1d5a33af4a54f7ab1e3f.jpg'}, {system: 'Pc', url: 'https://www.pngall.com/wp-content/uploads/2/Windows-Logo-PNG-Transparent-HD-Photo.png'}];

  const addConsole = (system) => {
    setConsoles(prev => [...prev, system])
    setList({
    ...list,
    [system]: true
    })
  }

  const removeConsole = (system) => {
    setConsoles(consoles.filter(item => item !== system));
    setList({
      ...list,
      [system]: false
    })
  }

  const submitConsoles = (consoles, userID) => {
    consoles.forEach(system => {
      axios.post('http://localhost:8000/api/users/consoles', {
        system: system,
        userID: userID
      })
      .then(() => {
        console.log('success')
        navigation.navigate('location', {userID: userID})
      })
      .catch((err) => {
        console.log(err.response)
      })
    })
  }

  console.log(route.params)

  return(
    <View style={styles.container} >
      <LinearGradient
        colors={['black', '#03045E', 'black']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 1}}>
      <ImageBackground source={require('./icons/gamestart.png')} imageStyle={{opacity: 0.35, height: '70%', width: '100%', justifyContent: 'center'}}>
      <Text style={styles.statement}> Choose your equipment! </Text>
      <View style={styles.cardContainer}>
        {systemImg.map((image, index) => {
          return(
          <CardTiles system={image.system} key={index} url={image.url} list={list} addConsole={addConsole} removeConsole={removeConsole}/>
          )
        })}
      </View>
      <TouchableOpacity style={styles.button} onPress={() => submitConsoles(consoles, userID)}>
        <Text style={{marginTop:10, textAlign: 'center', fontSize: 25, fontWeight: '300', color: 'white', borderRadius: 5, overflow: 'hidden'}}>
          Proceed
        </Text>
      </TouchableOpacity>
      </ImageBackground>
      </LinearGradient>
    </View>

  )
}

const styles = StyleSheet.create({
  cardContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: '70%',
    width: '100%'

  },
  statement: {
    marginTop: '30%',
    color: 'white',
    alignSelf: 'center',
    fontSize: 25,
    height: '15%',
    textShadowColor: '#90E0EF',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 4,
    fontWeight: '500'
  },
  container: {
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  button: {
    color: 'white',
    width: '40%',
    height: '7%',
    marginBottom: '-35%',
    backgroundColor: '#0077B6',
    alignSelf: 'center',
    borderRadius: 15
  }

})