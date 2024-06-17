import { View, Text, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const data = [
    {id: 1, title: "Economics"},
    {id: 2, title: "Economics"},
    {id: 3, title: "Economics"},
]

export default function Body() {
    const navigation = useNavigation();
    const [button, setButton] = useState(() => {
        const initialStates = {};
            data.forEach((item) => {
            initialStates[item.id] = true; // Set all buttons to 'OFF' state
        });
        return initialStates;
    })
    const handleButtonPress = (id) => {
        setButton((prevState) => ({
          ...prevState,
          [id]: !prevState[id], // Toggle the state for the specific button
        }));
      };
    
  return (
    <View className = "m-5" style = {{paddingBottom: hp(10)}}>
        <ScrollView style = {{width: wp(100)}} showsVerticalScrollIndicator={false}>
            <View>
                <Text className = "font-bold text-2xl">Economics</Text>
                    <View className = "flex-row space-x-2">
                        {/* Economics */}
                        <FlatList
                            horizontal
                            data = {data}
                            scrollEnabled = {false}
                            renderItem={({item}) => (
                                <View className = "justify-center space-y-1 items-center mb-2" style = {{width: wp(30), height: hp(20)}}>
                                    <TouchableOpacity onPress = {() => navigation.navigate("Profile")}>
                                        <Image style = {{width: hp(12), height: hp(12)}} className = "rounded-full" source = {require("../../../assets/images/image.png")} />
                                    </TouchableOpacity>
                                    <Text className = "text-lg">Economic</Text>
                                    <TouchableOpacity onPress={() => handleButtonPress(item.id)}>
                                        <View className = "rounded-md items-center justify-center" style = {{width: wp(20), height: hp(4), backgroundColor: button[item.id] ? "#EE6D33" : "rgb(229, 229, 229)", borderWidth: button[item.id] ? 0 : 1, borderColor: "rgb(200,200,200)"}}>
                                            <Text className = "font-semibold text-md" style = {{color: button[item.id] ? "white" : "gray"}}>{button[item.id] ? "Follow" : "Following"}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                         />
                    </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.push("SeeMore", {title: "Economics"})}>
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
                        <FlatList
                            horizontal
                            data = {data}
                            scrollEnabled = {false}
                            renderItem={({item}) => (
                                <View className = "justify-center space-y-1 items-center mb-2" style = {{width: wp(30), height: hp(20)}}>
                                    <TouchableOpacity onPress = {() => navigation.push("Profile")}>
                                        <Image style = {{width: hp(12), height: hp(12)}} className = "rounded-full" source = {require("../../../assets/images/image.png")} />
                                    </TouchableOpacity>
                                    <Text className = "text-lg">Economic</Text>
                                    <TouchableOpacity onPress={() => handleButtonPress(item.id)}>
                                        <View className = "rounded-md items-center justify-center" style = {{width: wp(20), height: hp(4), backgroundColor: button[item.id] ? "#EE6D33" : "rgb(229, 229, 229)", borderWidth: button[item.id] ? 0 : 1, borderColor: "rgb(200,200,200)"}}>
                                            <Text className = "font-semibold text-md" style = {{color: button[item.id] ? "white" : "gray"}}>{button[item.id] ? "Follow" : "Following"}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                         />
                    </View>
                <View>
                    <TouchableOpacity onPress = {() => navigation.navigate('SeeMore', {title: "Entertaiment"})}>
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
                        <FlatList
                            horizontal
                            data = {data}
                            scrollEnabled = {false}
                            renderItem={({item}) => (
                                <View className = "justify-center space-y-1 items-center mb-2" style = {{width: wp(30), height: hp(20)}}>
                                    <TouchableOpacity onPress = {() => navigation.push("Profile")}>
                                        <Image style = {{width: hp(12), height: hp(12)}} className = "rounded-full" source = {require("../../../assets/images/image.png")} />
                                    </TouchableOpacity>
                                    <Text className = "text-lg">Economic</Text>
                                    <TouchableOpacity onPress={() => handleButtonPress(item.id)}>
                                        <View className = "rounded-md items-center justify-center" style = {{width: wp(20), height: hp(4), backgroundColor: button[item.id] ? "#EE6D33" : "rgb(229, 229, 229)", borderWidth: button[item.id] ? 0 : 1, borderColor: "rgb(200,200,200)"}}>
                                            <Text className = "font-semibold text-md" style = {{color: button[item.id] ? "white" : "gray"}}>{button[item.id] ? "Follow" : "Following"}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                         />
                    </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate("SeeMore", {title: "Sport"})}>
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