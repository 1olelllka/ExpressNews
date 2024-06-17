import { View, Text, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

export default function ProfileSources() {
    const navigation = useNavigation();
    const [button, setButton] = useState(false)
  return (
    <SafeAreaView>
        <View>
            <View className = "flex-row items-center space-x-4 ml-5 mt-4">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={30} color="black" />
                </TouchableOpacity>
                <Text className = "text-2xl font-semibold">Profile</Text>
            </View>
        </View>
        <View className = "border-b-2 border-neutral-200 mt-4" />
        <View className = "mt-4 ml-4">
            <View className = "flex-row">
                <Image className = "rounded-full" style = {{width: hp(12), height: hp(12)}} source = {require('../../../assets/images/image.png')} />
                <View className = "ml-5">
                    <Text className = "text-2xl font-bold mt-1">Economic Staff</Text>
                    <Text className = "text-md mt-1 text-neutral-400 font-semibold">Economic</Text>
                    <TouchableOpacity onPress={() => setButton(!button)}>
                        <View className = "rounded-md items-center justify-center mt-2" style = {{width: wp(20), height: hp(4), backgroundColor: button ? "#EE6D33" : "rgb(229, 229, 229)", borderWidth: button ? 0 : 1, borderColor: "rgb(200,200,200)"}}>
                            <Text className = "font-semibold text-md" style = {{color: button ? "white" : "gray"}}>{button ? "Follow" : "Following"}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        <View className = "border-b-2 border-neutral-200 mt-4" />
        <ScrollView>
        <View className = "mt-4 mx-4 space-y-2" style = {{paddingBottom: hp(25)}}>
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
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}