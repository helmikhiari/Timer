import React  from 'react';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Screen1 from './Screens/Screen1.js'
import SetTime from './Screens/SetTime.js';
import Counter from './Screens/Counter.js'
import TimeUp from './Screens/TimeUp.js';


export default function App() 
{ const Stack=createNativeStackNavigator()
  return(
  <NavigationContainer>
    <Stack.Navigator initialRouteName='Screen1' screenOptions={{headerShown:false}}>
      <Stack.Screen name="Screen1" component={Screen1}/>
      <Stack.Screen name="SetTime" component={SetTime}/>
      <Stack.Screen name='Counter' component={Counter}/>
      <Stack.Screen name='TimeUp' component={TimeUp}/>
      
    </Stack.Navigator>
  </NavigationContainer>
  
)

}

const styles=StyleSheet.create({

})
