import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MyTabs from './tabs';
import Login from './screens/login';
import Signup from './screens/signup';
import SearchScreen from './screens/home/searchScreen';

const Stack = createStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
            <Stack.Screen name="MyTabs" component={MyTabs}  />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} /> 
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}