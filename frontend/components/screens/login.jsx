import { View, Text, Image, TextInput, TouchableOpacity, Platform, ScrollView} from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native';
import { FontAwesome6 } from '@expo/vector-icons';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function Login() {
    const navigation = useNavigation();
  return (
    <View className = "bg-white h-full w-full">
        <StatusBar style = "light" />
        <Image className = "h-full w-full absolute" source={require('../../assets/images/login/background.png')} />

        {/* lights */}
        <View className = "flex-row justify-around w-full absolute">
            <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify()} className = "h-[225] w-[90]" source={require('../../assets/images/login/light.png')} />
            <Animated.Image entering={FadeInUp.delay(400).duration(1000).springify()} className = "h-[160] w-[65]" source={require('../../assets/images/login/light.png')} />
        </View>

        {/* title and form */}
        <View className = "h-full w-full flex justify-around pb-10" style = {{paddingTop: Platform.OS === "ios" ? hp(35) : hp(35)}}>
            {/* Title */}
            <View  className = "flex items-center">
                <Animated.Text entering={FadeInUp.duration(1000).springify()} className = "text-white font-bold text-5xl tracking-wider">Login</Animated.Text>
            </View>

            {/* Form */}

                <View style = {{marginTop: Platform.OS === 'android' ? hp(6) : hp(10)}}>
                    <KeyboardAwareScrollView showsVerticalScrollIndicator = {false} style = {{width: wp(100)}} className = "flex space-y-4" contentContainerStyle = {{alignItems: 'center', marginLeft: hp(1), marginRight: hp(1)}}>
                    <Animated.View entering={FadeInDown.duration(1000).springify()} className = "bg-black/5 p-5 rounded-2xl w-full">
                            <TextInput placeholder='Email' placeholderTextColor={"gray"}   />
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className = "bg-black/5 p-5 rounded-2xl w-full mb-3">
                        <TextInput placeholder='Password' placeholderTextColor={"gray"} secureTextEntry  />
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} className = "w-full">
                        <TouchableOpacity className = "w-full p-3 rounded-2xl flex-row justify-center" style = {{backgroundColor: '#7289da',
                            shadowColor: 'rgba(0, 0, 0, 0.3)',
                            shadowOpacity: 0.8,
                            elevation: 6,
                            shadowRadius: 15 ,
                            shadowOffset : { width: 1, height: 13}
                        }}>
                            <Text className = "text-xl font-bold text-white text-center mr-2">Continue with Discord</Text>
                            <FontAwesome6 name="discord" size={24} color="white" />
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} className = "w-full">
                        <TouchableOpacity className = "w-full p-3 rounded-2xl flex-row justify-center border-neutral-500" style = {{
                            backgroundColor: 'white', 
                            shadowColor: 'rgba(0, 0, 0, 0.4)',
                            shadowOpacity: 0.8,
                            elevation: 6,
                            shadowRadius: 15 ,
                            shadowOffset : { width: 1, height: 13}}}>
                            <Text className = "text-xl font-bold text-black text-center mr-2">Continue with Google</Text>
                            <FontAwesome6 name="google" size={24} color="black" />
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(800).duration(1000).springify()} className = "w-full">
                        <TouchableOpacity className = "w-full p-3 rounded-2xl" style = {{backgroundColor: '#EE6D33',
                            shadowColor: 'rgba(0, 0, 0, 0.3)',
                            shadowOpacity: 0.8,
                            elevation: 6,
                            shadowRadius: 15 ,
                            shadowOffset : { width: 1, height: 13}
                        }}>
                            <Text className = "text-xl font-bold text-white text-center">Login</Text>
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(1000).duration(1000).springify()} className = "flex-row justify-center">
                        <Text>Don't have an account? </Text>
                        <TouchableOpacity onPress = {() => navigation.push("Signup")}>
                            <Text className = "text-sky-600">Sign up</Text>
                        </TouchableOpacity>
                    </Animated.View>
                    </KeyboardAwareScrollView>
                </View>
        </View>
    </View>   
  )
}