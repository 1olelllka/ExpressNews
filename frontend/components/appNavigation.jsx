import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MyTabs from './tabs';
import Login from './screens/login';
import Signup from './screens/signup';

const Stack = createStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
            <Stack.Screen name="MyTabs" component={MyTabs}  />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} /> 
        </Stack.Navigator>
    </NavigationContainer>
  )
}