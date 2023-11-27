import React, { useState, useEffect, useRef } from 'react';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { View, Text, StyleSheet, useWindowDimensions, TouchableHighlight, Image } from 'react-native';
import * as Notifications from 'expo-notifications';

export default function App({ route, navigation }) {
  const [isPlaying, setIsPlaying] = useState(true);
  let { width, height } = useWindowDimensions();
  const { hr, mins, secs } = route.params;
  let duration = hr * 60 * 60 + mins * 60 + secs;
  const [situation, setSituation] = useState(false);
  const [start, setStart] = useState(true);
  const [rm, setRm] = useState(0);
  const [notificationID, setNotificationID] = useState('');
  const [countDownEnded, setCountDownEnded] = useState(false);

  useEffect(() => {
    const checkNotificationPermission = async () => {
      try {
        // Get the current notification permissions status
        const { status } = await Notifications.getPermissionsAsync();
        console.log(status); // Log the current permission status
  
        // If notification permissions are not granted, request them
        if (status !== 'granted') {
          const { status: newStatus } = await Notifications.requestPermissionsAsync();
  
          // If the new permission status is still not granted, show an alert
          if (newStatus !== 'granted') {
            alert('Permission to receive notifications was denied!');
          }
        }
      } catch (error) {
        // Handle any errors that occur during the permission check or request
        console.error('Error checking or requesting notification permissions:', error);
      }
    };
  
    try {
      // Call the function to check and request notification permissions
      checkNotificationPermission();
  
      // Set up the notification handler
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });
    } catch (error) {
      // Handle any errors that occur during the setup of the notification handler
      console.error('Error setting up notification handler:', error);
    }
  }, []);
  

  useEffect(() => {
    setRm(duration);
  }, [duration]);

  function remainingTimee(rmtime) {
    let hr = 0,
      min = 0;

    while (rmtime >= 3600) {
      hr += 1;
      rmtime -= 3600;
    }

    while (rmtime >= 60) {
      min += 1;
      rmtime -= 60;
    }

    let shr = hr.toString();
    let smin = min.toString();
    let ssec = rmtime.toString();

    if (hr < 10) shr = '0' + shr;
    if (min < 10) smin = '0' + smin;
    if (ssec < 10) ssec = '0' + ssec;

    return (
      <View>
        <Text style={styles.circletext}>{shr}:{smin}:{ssec}</Text>
      </View>
    );
  }

  const Notifie = async () => {
    let newNotificationID;

    if (!situation || notificationID === '') {
      newNotificationID = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Time's Up",
          body: 'Your Countdown Timer Has Ended.',
        },
        trigger: { seconds: rm },
      });
      console.log('Notification with ID', newNotificationID, 'scheduled');
      setNotificationID(newNotificationID);
    } else {
      if (notificationID !== '') {
        await Notifications.cancelAllScheduledNotificationsAsync(notificationID);
        console.log('Notification with ID', notificationID, 'has been cancelled');
      }
    }
  };

  return (
    <View style={styles.container}>
      {!countDownEnded && start && <Text style={styles.title}>Start!</Text>}
      {!countDownEnded && !start && situation && <Text style={styles.title}>Counting</Text>}
      {!countDownEnded && !start && !situation && <Text style={styles.title}>Paused</Text>}
      {countDownEnded && <Text style={styles.title}>Time's Up</Text>}
      <CountdownCircleTimer
        isPlaying={situation}
        style={styles.circle}
        duration={duration}
        colors="#4654cf"
        size={width - 25}
        trailColor="#e335e6"
        strokeWidth={13}
        strokeLinecap="round"
        onComplete={() => {
          navigation.navigate('TimeUp');
        }}
      >
        {({ remainingTime }) => remainingTimee(remainingTime)}
      </CountdownCircleTimer>
      <TouchableHighlight
        onPress={() => {
          setSituation(!situation);
          setStart(false);
          Notifie();
        }}
        underlayColor={'null'}
        style={styles.button}
      >
        <View style={styles.circle}>
          {!situation && <Image source={require('../Img/play.png')} style={styles.img} />}
          {situation && <Image source={require('../Img/pause.png')} style={styles.img} />}
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  circletext: {
    color: '#ffffff',
    fontSize: 45,
    letterSpacing: 8,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  title: {
    color: '#ffffff',
    fontSize: 40,
    letterSpacing: 8,
    fontWeight: '900',
    fontFamily: 'monospace',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#2e2e2e',
    flex: 1,
    justifyContent: 'space-evenly',
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 80,
    backgroundColor: '#383838',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  img: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },
  button: {
    // add your button styles here
  },
});
