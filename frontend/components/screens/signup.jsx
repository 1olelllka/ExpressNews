import { View, Text, Image, TextInput, TouchableOpacity} from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function Signup() {
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
        <View className = "h-full w-full flex justify-around pt-48 pb-10">
            {/* Title */}
            <View  className = "flex items-center">
                <Animated.Text entering={FadeInUp.duration(1000).springify()} className = "text-white font-bold text-5xl tracking-wider">Sign Up</Animated.Text>
            </View>

            {/* Form */}
            <View className = "flex items-center mx-4 space-y-4">
                <KeyboardAwareScrollView showsVerticalScrollIndicator = {false} style = {{width: wp(100)}} className = "flex space-y-4" contentContainerStyle = {{alignItems: 'center', marginLeft: hp(1), marginRight: hp(1)}}>
                    <Animated.View entering={FadeInDown.duration(1000).springify()} className = "bg-black/5 p-5 rounded-2xl w-full ">
                        <TextInput placeholder='Email' placeholderTextColor={"gray"}  />
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className = "bg-black/5 p-5 rounded-2xl w-full ">
                        <TextInput placeholder='Username' placeholderTextColor={"gray"}  />
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} className = "bg-black/5 p-5 rounded-2xl w-full mb-3">
                        <TextInput placeholder='Password' placeholderTextColor={"gray"} secureTextEntry  />
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} className = "w-full">
                        <TouchableOpacity className = "w-full p-3 rounded-2xl" style = {{backgroundColor: '#EE6D33'}}>
                            <Text className = "text-xl font-bold text-white text-center">Sign Up</Text>
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(800).duration(1000).springify()} className = "flex-row justify-center">
                        <Text>Already have an account? </Text>
                        <TouchableOpacity onPress = {() => navigation.push("Login")}>
                            <Text className = "text-sky-600">Login</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </KeyboardAwareScrollView>
            </View>
        </View>
    </View>   
  )
}