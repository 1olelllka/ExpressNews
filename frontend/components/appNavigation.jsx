import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MyTabs from './tabs';
import Login from './screens/login';
import Signup from './screens/signup';
import SearchScreen from './screens/home/searchScreen';
import SearchResult from './screens/home/searchResult';
import ArticleDetails from './screens/home/articleDetails';

const Stack = createStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='ArticleDetails' screenOptions={{headerShown: false}}>
            <Stack.Screen name="MyTabs" component={MyTabs}  />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} /> 
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
            <Stack.Screen name="SearchResult" component={SearchResult} />
            <Stack.Screen name = "ArticleDetails" component = {ArticleDetails} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}