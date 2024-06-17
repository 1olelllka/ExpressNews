import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function Profile() {
    const navigation = useNavigation();
  return (
    <SafeAreaView>
        <View className = "m-4 flex-row items-center space-x-4">
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialIcons name="arrow-back" size = {30} color = "black" />
            </TouchableOpacity>
            <Text className = "text-xl font-semibold">Profile</Text>
        </View>
        <View className = "border-neutral-300" style = {{borderBottomWidth: 1}} />
    </SafeAreaView>
  )
}