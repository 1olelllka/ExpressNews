import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Profile() {
  return (
    <SafeAreaView>
        <View>
            <View className = "flex-row items-center space-x-4 ml-5 mt-4">
                <MaterialIcons name="arrow-back" size={30} color="black" />
                <Text className = "text-2xl font-semibold">Profile</Text>
            </View>
        </View>
        <View className = "border-b-2 border-neutral-200 mt-4" />
        <View className = "mt-4 ml-4">
            <View className = "flex-row">
                <Image className = "rounded-full" style = {{width: hp(12), height: hp(12)}} source = {require('../../../assets/images/image.png')} />
                <View className = "ml-5">
                    <Text className = "text-2xl font-bold mt-2">Economic Staff</Text>
                    <Text className = "text-lg">Economic</Text>
                </View>
            </View>
        </View>
    </SafeAreaView>
  )
}