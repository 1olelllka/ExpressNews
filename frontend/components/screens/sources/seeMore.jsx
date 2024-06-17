import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const data = [
    {id: 1, title: "Economics"},
    {id: 2, title: "Economics"},
    {id: 3, title: "Economics"},
    {id: 4, title: "Economics"},
    {id: 5, title: "Economics"},
    {id: 6, title: "Economics"},
    {id: 7, title: "Economics"},
    {id: 8, title: "Economics"},
    {id: 9, title: "Economics"},
    {id: 10, title: "Economics"},
    {id: 11, title: "Economics"},
    {id: 12, title: "Economics"},
    {id: 13, title: "Economics"},
    {id: 14, title: "Economics"},
    {id: 15, title: "Economics"},    
]

export default function SeeMore() {
    const navigation = useNavigation()
    const route = useRoute()
    const title = route.params.title
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
          [id]: !prevState[id], // Toggle the state for the specific button[item.id]
        }));
    }
  return (
    <SafeAreaView>
        <View className = "m-4 flex-row items-center space-x-4">
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialIcons name="arrow-back" size = {30} color = "black" />
            </TouchableOpacity>
            <Text className = "text-xl font-semibold">{title}</Text>
        </View>
        <View className = "border-neutral-300" style = {{borderBottomWidth: 1}} />
        <View className = "mx-4">
            <FlatList
                style = {{height: hp(80)}}
                showsVerticalScrollIndicator = {false} 
                data={data}
                renderItem={({item}) => (
                    <View className = "justify-center space-y-1 items-center mb-2" style = {{width: wp(30), height: hp(20)}}>
                        <TouchableOpacity onPress = {() => console.log(button[item.id])}>
                            <Image style = {{width: hp(12), height: hp(12)}} className = "rounded-full" source = {require("../../../assets/images/image.png")} />
                        </TouchableOpacity>
                        <Text className = "text-lg">{item.title}</Text>
                        <TouchableOpacity onPress={() => handleButtonPress(item.id)}>
                            <View className = "rounded-md items-center justify-center" style = {{width: wp(20), height: hp(4), backgroundColor: button[item.id] ? "#EE6D33" : "rgb(229,229,229)", borderWidth: button[item.id] ? 0 : 1, borderColor: "rgb(200,200,200)"}}>
                                <Text className = "font-semibold text-md" style = {{color: button[item.id] ? "white" : "gray"}}>{button[item.id] ? "Follow" : "Following"}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
                numColumns={3}
            />
            
        </View>
    </SafeAreaView>
  )
}