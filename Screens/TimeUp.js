import React,{useEffect} from "react";
import {View,Text,StyleSheet, TouchableHighlight,Image} from 'react-native'
import {Audio} from 'expo-av'

export default function TimeUp({navigation})
{
    
        useEffect(() => {
          // Define the sound file
          const soundObject = new Audio.Sound();
      
          // Function to play the sound
          const playSound = async () => {
            try {
              await soundObject.loadAsync(require('../sounds/alarm.mp3'));
              await soundObject.playAsync();
            } catch (error) {
              console.error('Error loading or playing sound', error);
            }
          };
      
          // Play the sound when the component is mounted
          playSound();
      
          // Unload the sound when the component is unmounted
          return () => {
            soundObject.unloadAsync();
          };
        }, []);
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Time'Up</Text>
            <TouchableHighlight onPress={()=>{navigation.navigate("Screen1")}} underlayColor={'null'} style={styles.button}>
           <View style={styles.circle}>
           <Image source={require('../Img/restart.png')} style={styles.img}/>
           </View>
           </TouchableHighlight>
        </View>
    )
}

const styles =StyleSheet.create({
    container:
    {
        backgroundColor:'#2e2e2e',
        flex:1,
        justifyContent:'space-evenly'
    },
    text:
    {
        marginTop:80,
        fontSize:50,
        color:"white",
        textAlign:'center',
        textAlignVertical:'center',
        fontWeight:'bold',
        letterSpacing:12
    },
    circle:
    {   marginTop:50,
        width:70,
        height:70,
        borderRadius:80,
        backgroundColor:'#383838',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
    },
    img:
    {
        height:40,
        width:40,
        resizeMode:'contain'
    },
})