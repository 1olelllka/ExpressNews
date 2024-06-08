import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons, Entypo } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function SearchResult() {
  return (
    <SafeAreaView>
      <View>
          <View className = "flex-row mx-6 items-center">
            <Ionicons name="arrow-back" size={30} color="black" />
            <Text className = "ml-6 ">Search result</Text>
          </View>
          <View className = "mt-5 mx-4">
            <View style = {{borderColor: '#EE6D33', borderBottomWidth: 1, paddingBottom: 15}}>
              <View className = "flex-row items-center justify-between">
                <Text className = "font-bold text-2xl">Search result</Text>
                <Ionicons name="bookmark-outline" size={24} color="gray" />
              </View>
              <Text className = "mt-3">Search results</Text>
            </View>
            <View>
              <View className = "mt-4">
                <View className = "pb-1 border-neutral-400" style = {{borderBottomWidth: 1}}>
                  <View className = "flex-row items-center justify-between">
                    <View style = {{width: wp(70)}}>
                      <Text className = "text-neutral-600 text-xs font-semibold">sporty.co</Text>
                      <Text className = 'font-bold text-base mt-2'>Celebrations erupt globally as underdog team's triumph </Text>
                    </View>
                    <Image className = "rounded-md" style = {{width: wp(25), height: wp(25)}} source = {require('../../../assets/images/searchResult/test_image.png')} />
                  </View>
                  <View className = "flex-row justify-between items-center mt-1">
                    <Text className = "text-neutral-500 text-xs">3h ago</Text>
                    <Entypo name="dots-three-horizontal" size={24} color="black" />
                  </View>
                </View>
                <View className = "mt-2 pb-1 border-neutral-400" style = {{borderBottomWidth: 1}}>
                  <View className = "flex-row items-center justify-between">
                    <View style = {{width: wp(70)}}>
                      <Text className = "text-neutral-600 text-xs font-semibold">sporty.co</Text>
                      <Text className = 'font-bold text-base mt-2'>Celebrations erupt globally as underdog team's triumph </Text>
                    </View>
                    <Image className = "rounded-md" style = {{width: wp(25), height: wp(25)}} source = {require('../../../assets/images/searchResult/test_image.png')} />
                  </View>
                  <View className = "flex-row justify-between items-center mt-1">
                    <Text className = "text-neutral-500 text-xs">3h ago</Text>
                    <Entypo name="dots-three-horizontal" size={24} color="black" />
                  </View>
                </View>
                <View className = "mt-2 pb-1 border-neutral-400" style = {{borderBottomWidth: 1}}>
                  <View className = "flex-row items-center justify-between">
                    <View style = {{width: wp(70)}}>
                      <Text className = "text-neutral-600 text-xs font-semibold">sporty.co</Text>
                      <Text className = 'font-bold text-base mt-2'>Celebrations erupt globally as underdog team's triumph </Text>
                    </View>
                    <Image className = "rounded-md" style = {{width: wp(25), height: wp(25)}} source = {require('../../../assets/images/searchResult/test_image.png')} />
                  </View>
                  <View className = "flex-row justify-between items-center mt-1">
                    <Text className = "text-neutral-500 text-xs">3h ago</Text>
                    <Entypo name="dots-three-horizontal" size={24} color="black" />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
    </SafeAreaView>
  )
}