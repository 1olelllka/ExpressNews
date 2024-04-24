import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import Home from './screens/home';
import Headlines from './screens/headlines';
import Following from './screens/following';
import Sources from './screens/sources';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <NavigationContainer>
        <Tab.Navigator screenOptions={{headerShown: false, tabBarShowLabel: false, tabBarStyle: {height: hp(11)}}}>
            <Tab.Screen name="Home" component={Home} options={{
                tabBarIcon: ({focused}) => {
                    return (
                        <View className = "items-center justify-center">
                            <Ionicons name="home" size={hp(3)} color={focused ? "#EE6D33" : "gray"} />
                            <Text style = {{color: focused ? "#EE6D33": "gray", fontWeight: '700'}}>For You</Text>
                        </View>
                    )
                }
            }}/>
            <Tab.Screen name="Headlines" component={Headlines} options={{
                tabBarIcon: ({focused}) => {
                    return (
                        <View className = "items-center justify-center">
                            <Ionicons name="compass-outline" size={hp(3)} color={focused ? "#EE6D33" : "gray"} />
                            <Text style = {{color: focused ? "#EE6D33": "gray", fontWeight: '700'}}>Headlines</Text>
                        </View>
                    )
                }
            }}/>
            <Tab.Screen name="Following" component={Following} options={{
                tabBarIcon: ({focused}) => {
                    return (
                        <View className = "items-center justify-center">
                            <Ionicons name="bookmark-outline" size={hp(3)} color={focused ? "#EE6D33" : "gray"} />
                            <Text style = {{color: focused ? "#EE6D33": "gray", fontWeight: '700'}}>Following</Text>
                        </View>
                    )
                }
            }}/>
            <Tab.Screen name="Sources" component={Sources} options={{
                tabBarIcon: ({focused}) => {
                    return (
                        <View className = "items-center justify-center">
                            <Ionicons name="star-outline" size={hp(3)} color={focused ? "#EE6D33" : "gray"} />
                            <Text style = {{color: focused ? "#EE6D33": "gray", fontWeight: '700'}}>Sources</Text>
                        </View>
                    )
                }
            }}/>
        </Tab.Navigator>
    </NavigationContainer>
  );
}