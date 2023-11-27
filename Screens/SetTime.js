import React,{useState} from 'react';
import {View, StyleSheet, Text,Image,TouchableHighlight} from 'react-native';
import Picker from '../Components/Picker.js';


export default function SetTime({navigation})
{   const [hr,setHr]=useState(0)
    const [mins,setMin]=useState(0)
    const [secs,setSecs]=useState(0)
  
    return(
        <View style={styles.container}>
            <View>
            <Text style={styles.title}>
                Set Timer
            </Text>
            </View>
            <View style={styles.innercontainer}>
                
                <Text style={styles.innertext}>hr</Text>
                <Text style={styles.innertext}>mins</Text>
                <Text style={styles.innertext}>secs</Text>
                
                
            </View>
            <View style={styles.innercontainer}>
            <Picker p={100} sendnumber={(value)=>{setHr(value)}}  /> 
            <Picker p={60} sendnumber={(value)=>{setMin(value)}} />
            <Picker p={60} sendnumber={(value)=>setSecs(value)} />
           </View>
           
           
           <TouchableHighlight onPress={()=>{if (!((hr==0)&&(secs==0)&&(mins==0)))navigation.navigate("Counter",{hr,mins,secs})}} underlayColor={'null'} style={styles.button}>
           <View style={styles.circle}>
           <Image source={require('../Img/clock.png')} style={styles.img}/>
           </View>
           </TouchableHighlight>
        </View> 
    )
    
}
const styles=StyleSheet.create({
    container:
    {   flex:1,
        backgroundColor:'#2e2e2e',
        paddingTop:80,
        justifyContent:'space-evenly',
    },
    innercontainer:
    {   
        flexDirection:'row',
        justifyContent:'space-around',
    },
    innertext:
    {
        color:'white',
        fontSize:25,
        letterSpacing:6,
        margin:30,
        fontWeight:'700'
    },
    title:
    {
        fontSize:35,
        fontWeight:'500',
        color:'white',
        textAlign:'center',
        fontFamily:'monospace',
        fontWeight:'900',
        letterSpacing:8,
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
    button:
    {
        marginHorizontal:200,
        alignContent:'center',
    }
})