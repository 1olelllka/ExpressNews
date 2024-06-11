import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { MaterialIcons } from '@expo/vector-icons'

export default function Body() {
  return (
    <View className = "m-5" style = {{paddingBottom: hp(10)}}>
        <ScrollView style = {{width: wp(100)}} showsVerticalScrollIndicator={false}>
            <View>
                <Text className = "font-bold text-2xl">Economics</Text>
                    <View className = "flex-row space-x-2">
                        <View className = "justify-center space-y-1 items-center">
                            <TouchableOpacity>
                                <Image style = {{width: hp(12), height: hp(12)}} className = "rounded-full" source = {require("../../../assets/images/image.png")} />
                            </TouchableOpacity>
                            <Text className = "text-lg">Economic staff</Text>
                            <TouchableOpacity>
                                <View className = "bg-neutral-300 rounded-lg items-center justify-center" style = {{height: hp(4), width: wp(20)}}>
                                    <Text>Follow</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View className = "justify-center space-y-1 items-center">
                            <TouchableOpacity>
                                <Image style = {{width: hp(12), height: hp(12)}} className = "rounded-full" source = {require("../../../assets/images/image.png")} />
                            </TouchableOpacity>
                            <Text className = "text-lg">Economic staff</Text>
                            <TouchableOpacity>
                                <View className = "bg-neutral-300 rounded-lg items-center justify-center" style = {{height: hp(4), width: wp(20)}}>
                                    <Text>Follow</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View className = "justify-center space-y-1 items-center">
                            <TouchableOpacity>
                                <Image style = {{width: hp(12), height: hp(12)}} className = "rounded-full" source = {require("../../../assets/images/image.png")} />
                            </TouchableOpacity>
                            <Text className = "text-lg">Economic staff</Text>
                            <TouchableOpacity>
                                <View className = "bg-neutral-300 rounded-lg items-center justify-center" style = {{height: hp(4), width: wp(20)}}>
                                    <Text>Follow</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                <View>
                    <TouchableOpacity>
                        <View className = "items-center flex-row justify-center mt-4">
                            <Text className = "text-lg" style = {{color: '#EE6D33'}}>See more Economics</Text>
                            <MaterialIcons name="arrow-forward" size={24} color="#EE6D33" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View className = "border-neutral-300 mr-8 mt-4 pr-4" style = {{borderWidth: 1}} />
            <View className = "mt-4">
                <Text className = "font-bold text-2xl">Entertaiment</Text>
                    <View className = "flex-row space-x-2">
                        <View className = "justify-center space-y-1 items-center">
                            <TouchableOpacity>
                                <Image style = {{width: hp(12), height: hp(12)}} className = "rounded-full" source = {require("../../../assets/images/image.png")} />
                            </TouchableOpacity>
                            <Text className = "text-lg">Economic staff</Text>
                            <TouchableOpacity>
                                <View className = "bg-neutral-300 rounded-lg items-center justify-center" style = {{height: hp(4), width: wp(20)}}>
                                    <Text>Follow</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View className = "justify-center space-y-1 items-center">
                            <TouchableOpacity>
                                <Image style = {{width: hp(12), height: hp(12)}} className = "rounded-full" source = {require("../../../assets/images/image.png")} />
                            </TouchableOpacity>
                            <Text className = "text-lg">Economic staff</Text>
                            <TouchableOpacity>
                                <View className = "bg-neutral-300 rounded-lg items-center justify-center" style = {{height: hp(4), width: wp(20)}}>
                                    <Text>Follow</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View className = "justify-center space-y-1 items-center">
                            <TouchableOpacity>
                                <Image style = {{width: hp(12), height: hp(12)}} className = "rounded-full" source = {require("../../../assets/images/image.png")} />
                            </TouchableOpacity>
                            <Text className = "text-lg">Economic staff</Text>
                            <TouchableOpacity>
                                <View className = "bg-neutral-300 rounded-lg items-center justify-center" style = {{height: hp(4), width: wp(20)}}>
                                    <Text>Follow</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                <View>
                    <TouchableOpacity>
                        <View className = "items-center flex-row justify-center mt-4">
                            <Text className = "text-lg" style = {{color: '#EE6D33'}}>See more Entertaiment</Text>
                            <MaterialIcons name="arrow-forward" size={24} color="#EE6D33" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View className = "border-neutral-300 mr-8 mt-4 pr-4" style = {{borderWidth: 1}} />
            <View className = "mt-4">
                <Text className = "font-bold text-2xl">Sport</Text>
                    <View className = "flex-row space-x-2">
                        <View className = "justify-center space-y-1 items-center">
                            <TouchableOpacity>
                                <Image style = {{width: hp(12), height: hp(12)}} className = "rounded-full" source = {require("../../../assets/images/image.png")} />
                            </TouchableOpacity>
                            <Text className = "text-lg">Economic staff</Text>
                            <TouchableOpacity>
                                <View className = "bg-neutral-300 rounded-lg items-center justify-center" style = {{height: hp(4), width: wp(20)}}>
                                    <Text>Follow</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View className = "justify-center space-y-1 items-center">
                            <TouchableOpacity>
                                <Image style = {{width: hp(12), height: hp(12)}} className = "rounded-full" source = {require("../../../assets/images/image.png")} />
                            </TouchableOpacity>
                            <Text className = "text-lg">Economic staff</Text>
                            <TouchableOpacity>
                                <View className = "bg-neutral-300 rounded-lg items-center justify-center" style = {{height: hp(4), width: wp(20)}}>
                                    <Text>Follow</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View className = "justify-center space-y-1 items-center">
                            <TouchableOpacity>
                                <Image style = {{width: hp(12), height: hp(12)}} className = "rounded-full" source = {require("../../../assets/images/image.png")} />
                            </TouchableOpacity>
                            <Text className = "text-lg">Economic staff</Text>
                            <TouchableOpacity>
                                <View className = "bg-neutral-300 rounded-lg items-center justify-center" style = {{height: hp(4), width: wp(20)}}>
                                    <Text>Follow</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                <View>
                    <TouchableOpacity>
                        <View className = "items-center flex-row justify-center mt-4">
                            <Text className = "text-lg" style = {{color: '#EE6D33'}}>See more Sport</Text>
                            <MaterialIcons name="arrow-forward" size={24} color="#EE6D33" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View className = "border-neutral-300 mt-4 mr-8" style = {{borderWidth: 1}} />
            </View>
      </ScrollView>
    </View>
  )
}