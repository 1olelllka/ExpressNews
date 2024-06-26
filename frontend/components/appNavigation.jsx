import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MyTabs from "./tabs";
import Login from "./screens/login";
import Signup from "./screens/signup";
import SearchScreen from "./screens/home/searchScreen";
import SearchResult from "./screens/home/searchResult";
import ArticleDetails from "./screens/home/articleDetails";
import Saved from "./screens/following/saved";
import ProfileSources from "./screens/sources/profile";
import Profile from "./screens/home/profile";
import SeeMore from "./screens/sources/seeMore";
import Notifications from "./screens/home/notifications";

const Stack = createStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="MyTabs" component={MyTabs} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="SearchResult" component={SearchResult} />
        <Stack.Screen name="ArticleDetails" component={ArticleDetails} />
        <Stack.Screen name="Saved" component={Saved} />
        <Stack.Screen name="ProfileSources" component={ProfileSources} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="SeeMore" component={SeeMore} />
        <Stack.Screen name="Notifications" component={Notifications} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
