/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const App = () => {
  const INIT_STATE = {
    score: 0,
    gameOver: false,
  };
  const [scores, setScores] = useState(0);
  const [over, setOver] = useState(false);

  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [number3, setNumber3] = useState(0);
  const [seconds, setSeconds] = useState(5000);
  const [choose, setChoose] = useState('=');

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => (seconds > 0 ? seconds - 1000 : 5000));
    }, 1000);

    return () => {
      clearInterval(interval), setSeconds(5000);
    };
  }, []);

  useEffect(() => {
    if (seconds === 5000) {
      setNumber1(Math.floor(Math.random() * 50) + 50);
      setNumber2(Math.floor(Math.random() * 50) + 50);
      setNumber3(Math.floor(Math.random() * 100) + 100);
    }
  }, [seconds]);

  function compare(choose) {
    console.log(choose)
    switch (choose) {
      case '1': {
        if (number3 == number2 + number1) {
          setScores(scores + 100);
        } else {
          setOver(true);
        }
        break;
      }
      case '2': {
        if (number3 > number2 + number1) {
          setScores(scores + 100);
        } else {
          setOver(true);
        }
        break;
      }
      case '3': {
        if (number3 < number2 + number1) {
          setScores(scores + 100);
        } else {
          setOver(true);
        }
        break;
      }
    }
  }

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Text>Score: {INIT_STATE.score}</Text>
        <Text>{seconds}</Text>
      </View>
      <View style={{flexDirection: 'row', flex: 1}}>
        <Text style={{flex: 1, textAlign: 'center'}}>{number1} </Text>
        <Text style={{flex: 1, textAlign: 'center'}}>+</Text>
        <Text style={{flex: 1, textAlign: 'center'}}> {number2}</Text>
        <Text style={{flex: 1, textAlign: 'center'}}>?</Text>
        <Text style={{flex: 1, textAlign: 'center'}}>{number3}</Text>
      </View>
      <View style={{flexDirection: 'row', flex: 1}}>
        <TouchableOpacity
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          onPress ={()=>compare(2)}
          >
          <Icon name="chevron-left" size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          onPress ={()=>compare(1)}
          >
          <Icon name="equal" size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          onPress ={()=>compare(3)}
          >
          <Icon name="chevron-right" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;
