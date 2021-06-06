import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
import {
  AddIncome,
  AddExpanse,
  Login,
  Register,
  Wallet,
  Statistics,
  More,
} from '../../screens/';
import {NavigationContainer} from '@react-navigation/native';
import TabNav from './tabNav';
function AppNav() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
       
        <Stack.Screen
          name="Wallet"
          component={TabNav}
          options={{headerShown: false}}
        />
        <Stack.Screen name="AddIncome" component={AddIncome} />

        <Stack.Screen name="AddExpanse" component={AddExpanse} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNav;
