import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

export default function Body() {
    const navigation = useNavigation();
  return (
    <View>
        <View className = "mx-4 mt-4 pb-4">
            <TouchableOpacity onPress={() => navigation.navigate("Saved")}>
                <View className = "flex-row items-center justify-between">
                    <View className = "flex-row items-center space-x-2">
                        <MaterialIcons name="bookmark-outline" size={30} color="gray" />
                        <Text className = "text-lg text-neutral-500">Saved</Text>
                    </View>
                    <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View className = "flex-row items-center justify-between mt-4">
                    <View className = "flex-row items-center space-x-2">
                        <MaterialIcons name="access-time" size={30} color="gray" />
                        <Text className = "text-lg text-semibold text-neutral-500">History</Text>
                    </View>
                    <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                </View>
            </TouchableOpacity>
        </View>
        <View style = {{borderBottomWidth: 1}} className = "border-neutral-200" />
        <View className = "m-4">
            <View>
                <Text className = "font-semibold text-lg">Subscribed</Text>
            </View>
            <TouchableOpacity>
                <View className = "mt-4 flex-row items-center justify-between">
                    <View className = " flex-row items-center space-x-2">
                        <Image source = {require("../../../assets/images/image.png")} style = {{height: hp(5), width: hp(5)}} />
                        <Text className = "text-lg">TechCrunch</Text>
                    </View>
                    <MaterialIcons name="keyboard-arrow-right" size={35} color="gray" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View className = "mt-4 flex-row items-center justify-between">
                    <View className = " flex-row items-center space-x-2">
                        <Image source = {require("../../../assets/images/image.png")} style = {{height: hp(5), width: hp(5)}} />
                        <Text className = "text-lg">TechCrunch</Text>
                    </View>
                    <MaterialIcons name="keyboard-arrow-right" size={35} color="gray" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View className = "mt-4 flex-row items-center justify-between">
                    <View className = " flex-row items-center space-x-2">
                        <Image source = {require("../../../assets/images/image.png")} style = {{height: hp(5), width: hp(5)}} />
                        <Text className = "text-lg">TechCrunch</Text>
                    </View>
                    <MaterialIcons name="keyboard-arrow-right" size={35} color="gray" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View className = "mt-4 flex-row items-center justify-between">
                    <View className = " flex-row items-center space-x-2">
                        <Image source = {require("../../../assets/images/image.png")} style = {{height: hp(5), width: hp(5)}} />
                        <Text className = "text-lg">TechCrunch</Text>
                    </View>
                    <MaterialIcons name="keyboard-arrow-right" size={35} color="gray" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View className = "mt-4 flex-row items-center justify-between">
                    <View className = " flex-row items-center space-x-2">
                        <Image source = {require("../../../assets/images/image.png")} style = {{height: hp(5), width: hp(5)}} />
                        <Text className = "text-lg">TechCrunch</Text>
                    </View>
                    <MaterialIcons name="keyboard-arrow-right" size={35} color="gray" />
                </View>
            </TouchableOpacity>
        </View>
    </View>
  )
}