import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function SearchScreen() {
    const navigation = useNavigation();
    return(
        <SafeAreaView>
            <View className = "mx-4">
                {/* Header */}
                <View className = "flex flex-row" >
                    <AntDesign name="arrowleft" size={hp(3)} color="black" onPress={() => navigation.goBack()} />
                    <TextInput className = "flex-1 ml-3 border-b-2 border-neutral-600" placeholder = "Search" />
                </View>
                <View>
                    <View className = "mt-8">
                        <View className = "flex-row items-center justify-between">
                            <View className = "flex-row items-center">
                                <AntDesign name="clockcircleo" size={24} color="gray" />
                                <Text style = {{fontSize: 15}} className = "font-semibold ml-4">mortgage interest rate</Text>
                            </View>
                            <AntDesign name="close" size={24} color="gray" />
                        </View>
                    </View>
                    <View className = "mt-6">
                        <View className = "flex-row items-center justify-between">
                            <View className = "flex-row items-center">
                                <AntDesign name="clockcircleo" size={24} color="gray" />
                                <Text style = {{fontSize: 15}} className = "ml-4 font-semibold">mortgage interest rate</Text>
                            </View>
                            <AntDesign name="close" size={24} color="gray" />
                        </View>
                    </View>
                    <View className = "mt-6">
                        <View className = "flex-row items-center justify-between">
                            <View className = "flex-row items-center">
                                <AntDesign name="clockcircleo" size={24} color="gray" />
                                <Text style = {{fontSize: 15}} className = "font-semibold ml-4">mortgage interest rate</Text>
                            </View>
                            <AntDesign name="close" size={24} color="gray" />
                        </View>
                    </View>
                    <View className = "border-b-4 border-neutral-200 pb-6" style = {{width: wp(100), alignSelf: 'center'}} />
                    <View>
                        <Text style = {{fontSize: 20}} className = "font-semibold mt-6">Topics</Text>
                        <View>
                            <View className = "flex-row items-center mt-6 justify-between">
                                    <View className = "flex-row items-center">
                                        <View className = "flex rounded-full items-center justify-center" style = {{width: hp(4), height: hp(4), backgroundColor: "rgba(21, 128, 61, 0.4)"}}>
                                            <FontAwesome6 name="soccer-ball" size={22} color="green" />
                                        </View>
                                        <Text className = "font-semibold text-lg ml-4">Soccer</Text>
                                    </View>
                                    <FontAwesome6 name="bookmark" size={24} color="gray" />
                                </View>
                                <View className = "flex-row items-center mt-4 justify-between">
                                    <View className = "flex-row items-center">
                                        <View className = "flex rounded-full items-center justify-center" style = {{width: hp(4), height: hp(4), backgroundColor: "rgba(220, 38, 38, 0.4)"}}>
                                            <FontAwesome6 name="shield-halved" size={20} color="rgb(220 38 38)" />
                                        </View>
                                        <Text className = "font-semibold text-lg ml-4">Cybersecurity</Text>
                                    </View>
                                    <FontAwesome6 name="bookmark" size={24} color="gray" />
                                </View>
                                <View className = "flex-row items-center mt-4 justify-between">
                                    <View className = "flex-row items-center">
                                        <View className = "flex rounded-full items-center justify-center bg-purple-600" style = {{width: hp(4), height: hp(4), backgroundColor: "rgba(147, 51, 234, 0.35)"}}>
                                            <FontAwesome6 name="rocket" size={20} color="rgb(147 51 234)" />
                                        </View>
                                        <Text className = "font-semibold text-lg ml-4">Space exploration</Text>
                                    </View>
                                    <FontAwesome6 name="bookmark" size={24} color="gray" />
                                </View>
                                <View className = "flex-row items-center mt-4 justify-between">
                                    <View className = "flex-row items-center">
                                        <View className = "flex rounded-full items-center justify-center" style = {{width: hp(4), height: hp(4), backgroundColor: "rgba(249, 115, 22, 0.3)"}}>
                                            <MaterialCommunityIcons name="popcorn" size={22} color="rgb(249 115 22)" />
                                        </View>
                                        <Text className = "font-semibold text-lg ml-4">Pop culture</Text>
                                    </View>
                                    <FontAwesome6 name="bookmark" size={24} color="gray" />
                                </View>
                                <View className = "flex-row items-center mt-4 justify-between">
                                    <View className = "flex-row items-center">
                                        <View className = "flex rounded-full items-center justify-center" style = {{width: hp(4), height: hp(4), backgroundColor: "rgba(37, 99, 235, 0.4)"}}>
                                            <FontAwesome6 name="computer" size={20} color="rgb(37 99 235)" />
                                        </View>
                                        <Text className = "font-semibold text-lg ml-4">Technology</Text>
                                    </View>
                                    <FontAwesome6 name="bookmark" size={24} color="gray" />
                                </View>
                            </View>
                        </View>
                </View>
            </View>
        </SafeAreaView>
    )
}