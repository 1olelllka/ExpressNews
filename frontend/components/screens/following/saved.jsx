import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function Saved() {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View>
        <View className = "m-4 flex-row items-center space-x-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
          <Text className = "text-xl font-semibold">Saved</Text>
        </View>
        <View className = "border-b-2 border-neutral-200" />
        <View className = "mt-4 mx-4">
          <FlatList 
            style = {{height: hp(80)}}
            data = {[0,1,2,3,4,5,6]}
            showsVerticalScrollIndicator = {false}
            renderItem={() => (
              <View className = "pb-1 border-neutral-400 mt-1" style = {{borderBottomWidth: 1}}>
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
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}