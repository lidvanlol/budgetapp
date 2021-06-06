import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  AddIncome,
  AddExpanse,
  Login,
  Register,
  Wallet,
  Statistics,
  More,
  Image,
  CarouselCards

} from '../../screens/';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const Tab = createBottomTabNavigator();

const wallet = require('../../../assets/wallet.png');
const walletActive = require('../../../assets/greenw.png');

 

const TabNav = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#5E9C60',
        inactiveTintColor: '#000000B2',

        style: {
          height: 83,
        },
        tabStyle: {
          height: 83,
          backgroundColor: '#fff',
          flex: 1,
        },
      }}>
      <Tab.Screen
        name="Wallet"
        component={Wallet}
        options={({route}) => ({
         
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="wallet-outline"
              color={color}
              size={size}
            />
          ),

          tabBarLabel: ({focused, color}) => (
            <Text
              style={{
                color: focused ? '#5E9C60' : '#000000B2',
                fontFamily: 'Lato-Regular',
                fontSize: 10,
                lineHeight: 12,
                paddingBottom: 25,
              }}>
              Wallet
            </Text>
          ),
        })}
      
      />

      <Tab.Screen
        name="Stats"
        component={Statistics}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="analytics-sharp" color={color} size={size} />
          ),
          tabBarLabel: ({focused, color}) => (
            <Text
              style={{
                color: focused ? '#5E9C60' : '#000000B2',
                fontFamily: 'Lato-Regular',
                fontSize: 10,
                lineHeight: 12,
                paddingBottom: 25,
              }}>
              Stats
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={More}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="menu" color={color} size={size} />
          ),
          tabBarLabel: ({focused, color}) => (
            <Text
              style={{
                color: focused ? '#5E9C60' : '#000000B2',
                fontFamily: 'Lato-Regular',
                fontSize: 10,
                lineHeight: 12,
                paddingBottom: 25,
              }}>
              More
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};


export default TabNav;
