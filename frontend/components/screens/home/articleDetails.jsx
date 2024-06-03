import { View, Text, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function ArticleDetails() {
    const [thumbsUpPressed, setThumbsUpPressed] = useState(false);
    const [thumbsDownPressed, setThumbsDownPressed] = useState(false);
    const changeThumbsUpPressed = () => {
        setThumbsUpPressed(!thumbsUpPressed);
        setThumbsDownPressed(false);
    }
    const changeThumbsDownPressed = () => {
        setThumbsDownPressed(!thumbsDownPressed);
        setThumbsUpPressed(false);
    }
  return (
    <SafeAreaView>
        <ScrollView>
            <View className = "" style = {{}}>
                <View className = "flex mx-6 mt-2 flex-row items-center justify-between pb-3">                 
                    <TouchableOpacity>
                        <Ionicons name="close" size={30} color="black" />                  
                    </TouchableOpacity> 
                    <Text className = "text-neutral-500">sporty.co</Text>              
                    <TouchableOpacity>
                        <Ionicons name="share-outline" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View className = "border-neutral-300" style = {{borderBottomWidth: 1}} />
                <View className = "m-4 rounded-md justify-center items-center" style = {{borderWidth: 1 ,height: hp(3.5), width: wp(15)}}>
                    <Text className = "font-medium text-xs">SPORT</Text>
                </View>
                <View className = 'mx-4'>
                    <Text className = "text-2xl font-bold">Celebrations erupt globally as underdog team's triumph</Text>
                    <View className = 'mt-4 flex-row items-center justify-between'>
                        <Text>By <Text className = 'font-semibold'>Layla Phillips</Text></Text>
                        <Text className = 'text-neutral-500'>May 31, 2020</Text>
                    </View>
                    <View className = "mt-4">
                        <Image className = "w-full rounded-lg" source = {require('../../../assets/images/searchResult/test_image.png')} />
                        <Text className = "mt-2 text-neutral-500">The historic moment in the final minutes - Photo credit: JOSHUA DAVIS/ SPORTY IMAGES</Text>
                    </View>
                    <View className = "mt-4">
                        <Text className = "text-base">
                            Tempor dolore anim culpa cupidatat ex ipsum amet aliqua et magna. Pariatur qui irure aliquip velit ut duis adipisicing. Qui consectetur ut et cupidatat ipsum consequat mollit deserunt dolore.

                            Exercitation nulla cupidatat consectetur voluptate. Sunt aliqua esse consectetur aute laborum aliquip culpa occaecat. Laborum nulla exercitation ut nulla sunt sunt reprehenderit occaecat consequat. Non labore ut deserunt adipisicing cupidatat esse commodo laboris irure irure nostrud. Nulla duis anim exercitation aliquip Lorem sunt amet proident qui eiusmod. Id cillum anim ut commodo. Exercitation amet quis magna ea proident et aliquip eiusmod id ipsum exercitation est cupidatat.

                            Sint eu amet cupidatat irure qui qui aliqua adipisicing mollit sunt laboris aliquip est. Nulla ex et labore ad sunt cupidatat. Duis enim quis officia non labore consequat eu nisi mollit adipisicing voluptate do qui.
                        </Text>
                    </View>
                </View>
            </View>
            <View className = "border-neutral-300 mt-4" style = {{borderBottomWidth: 1}} />
                <View className = "m-4 flex-row items-center justify-between">
                    <View className = 'flex-row items-center space-x-6'>
                        <TouchableOpacity onPress={() => changeThumbsUpPressed()}>
                            <MaterialIcons name={thumbsUpPressed ? "thumb-up-alt" : "thumb-up-off-alt"} size={35} color={thumbsUpPressed ? '#EE6D33' : 'gray'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => changeThumbsDownPressed()}>
                            <MaterialIcons name={thumbsDownPressed ? "thumb-down-alt" : "thumb-down-off-alt"} size={35} color={thumbsDownPressed ? '#EE6D33' : 'gray'} />
                        </TouchableOpacity>
                    </View>
                    <View className = "flex-row items-center space-x-6">
                        <TouchableOpacity>
                            <MaterialIcons name="arrow-back" size={30} color="black"  />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <MaterialIcons name="arrow-forward" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
        </ScrollView>
    </SafeAreaView>
  )
}