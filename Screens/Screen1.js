import React from 'react';
import {View, StyleSheet, useWindowDimensions, Text, Image, TouchableHighlight,} from 'react-native';


export default function Screen1({navigation})
{let {width,height}=useWindowDimensions()
height=height/2+30
    return(
        <View style={styles.container}>
    <View>
      <Image source={require("../Img/time.png")} style={[styles.img,{width,height}]}/>
      </View> 
      <View style={styles.innercontainer}>    
      <Text style={styles.text1}>
         Time is money
      </Text>
      <Text style={styles.text2}>
        Never lose track of time
      </Text>
      <TouchableHighlight style={styles.button} onPress={()=>{navigation.navigate('SetTime')}}>
        <Text style={styles.innertext}>
          Get Started
        </Text>
      </TouchableHighlight>
    </View>
    </View>
)};

const styles=StyleSheet.create({
    container:
    {
        flex:1,
        backgroundColor:'#2e2e2e',
        alignItems:"center",
       
    },
    text1:
    {
        fontSize:50,
        color:"#FFFFFF",
        fontFamily:"sans-serif-medium",
        letterSpacing:10,
        textAlign:"center",
       
        fontWeight:"500"
    },
    text2:
    {
        color:'#898989',
        fontSize:23,
        letterSpacing:4,
        fontWeight:'500'
    },
    button:
    {
        backgroundColor:'#e9b121',
        width:'100',
        height:55,
        borderRadius:100,
        justifyContent:'center'
        
    },
    innertext:
    {
        textAlign:'center',
        fontSize:25,
        letterSpacing:4,
        fontWeight:'400',
    },
    innercontainer:
    {
        justifyContent:'space-evenly',
        flex:1
    }


})