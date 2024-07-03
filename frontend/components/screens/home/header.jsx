import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

export default function Header() {
  const navigation = useNavigation();
  return (
    <View>
      <View className="flex ml-5 mr-5 pt-4 pb-2 flex-row">
        <View className="flex-1 justify-start flex-row items-center">
          <TouchableOpacity
            onPress={() => navigation.navigate("Notifications")}
          >
            <Text style={{ fontSize: hp(3) }} className="font-semibold">
              For You{"  "}
              <FontAwesome5 name="hand-point-left" size={24} color="#ad2d2d" />
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-1 flex-row justify-end items-center space-x-4">
          <TouchableOpacity onPress={() => navigation.navigate("SearchScreen")}>
            <Ionicons name="search" size={hp(4)} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Image
              source={require("../../../assets/user.png")}
              style={{ width: hp(5), height: hp(5) }}
              className="rounded-full"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View className="border-b-2 border-neutral-200" />
    </View>
  );
}
