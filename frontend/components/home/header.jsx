import { View, Text, Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function Header() {
  return (
    <View className = "flex ml-5 mr-5 flex-row border-b-2 border-neutral-200">
        <View className = "flex-1 justify-start flex-row items-center">
        <Ionicons name="menu" size={hp(4)} color="black" />
        <Text style = {{fontSize: hp(3)}} className = "ml-4 font-semibold">For You</Text>
        </View>
        <View className = "flex-1 flex-row justify-end items-center">
        <Ionicons name="search" size={hp(4)} color="black" />
        <Image source = {require('../../assets/icon.png')} style = {{width: hp(5), height: hp(5)}} className = "rounded-full ml-4" />
        </View>
    </View>
  )
}