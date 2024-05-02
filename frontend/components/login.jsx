import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

export default function Login() {
  return (
    <SafeAreaView style= {{width: wp(95), alignSelf: 'center'}}>
      <View className = "flex items-center mt-5">
        <Text className = "font-semibold" style = {{fontSize: hp(3)}}>Sign in</Text>
        <Text className = "text-neutral-500 text-center mt-2">By continuing, you agree to our Terms of Services and Private Policy.</Text>
      </View>
      <View className = "mt-10">
        <Text className = "font-bold">Email or phone number</Text>
        <TextInput className = "border-neutral-400 mt-2 rounded-xl p-2" style = {{height: hp(4), borderWidth: 1}} />
      </View>
      
      <View className = "mt-5">
        <TouchableOpacity className = "items-center justify-center rounded-xl" style = {{backgroundColor: "#EE6D33", height: hp(5)}}>
          <Text className = "text-white font-semibold" style = {{fontSize: hp(1.7)}}>Continue with password</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}