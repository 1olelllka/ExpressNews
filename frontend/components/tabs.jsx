import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import Home from './screens/home';
import Following from './screens/following/following';
import Sources from './screens/sources/sources';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
        <Tab.Navigator screenOptions={{headerShown: false, tabBarShowLabel: false, tabBarStyle: {height: hp(11)}}}>
            <Tab.Screen name="For You" component={Home} options={{
                tabBarIcon: ({focused}) => {
                    return (
                        <View className = "items-center justify-center">
                            <Ionicons name="home" size={hp(3)} color={focused ? "#EE6D33" : "gray"} />
                            <Text style = {{color: focused ? "#EE6D33": "gray", fontWeight: '600'}}>For You</Text>
                        </View>
                    )
                }
            }}/>
            <Tab.Screen name="Following" component={Following} options={{
                tabBarIcon: ({focused}) => {
                    return (
                        <View className = "items-center justify-center">
                            <Ionicons name="bookmark-outline" size={hp(3)} color={focused ? "#EE6D33" : "gray"} />
                            <Text style = {{color: focused ? "#EE6D33": "gray", fontWeight: '600'}}>Following</Text>
                        </View>
                    )
                }
            }}/>
            <Tab.Screen name="Sources" component={Sources} options={{
                tabBarIcon: ({focused}) => {
                    return (
                        <View className = "items-center justify-center">
                            <Ionicons name="star-outline" size={hp(3)} color={focused ? "#EE6D33" : "gray"} />
                            <Text style = {{color: focused ? "#EE6D33": "gray", fontWeight: '600'}}>Sources</Text>
                        </View>
                    )
                }
            }}/>
        </Tab.Navigator>
  );
}