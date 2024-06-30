import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Body() {
  const navigation = useNavigation();
  const [subscribed, setSubscribed] = React.useState([]);
  const focused = useIsFocused();

  const [token, setToken] = useState("");

  const tokenValue = async () => {
    const value = await AsyncStorage.getItem("userData");
    if (value !== null) {
      const data = JSON.parse(value);
      if (data.token && data.expiry > Date.now()) {
        setToken(data.token);
      }
    }
  };

  useEffect(() => {
    tokenValue();
    if (focused) {
      fetch("http://localhost:8000/api/v1/sources/my-following", {
        method: "GET",
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setSubscribed(data));
    }
  }, [focused, token]);
  return (
    <View>
      <View className="mx-4 mt-4 pb-4">
        <TouchableOpacity onPress={() => navigation.navigate("Saved")}>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center space-x-2">
              <MaterialIcons name="bookmark-outline" size={30} color="gray" />
              <Text className="text-lg text-neutral-500">Saved</Text>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ borderBottomWidth: 1 }} className="border-neutral-200" />
      <View className="m-4">
        <View>
          <Text className="font-semibold text-lg">Subscribed</Text>
        </View>
        <FlatList
          style={{ height: hp(56) }}
          data={subscribed}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ProfileSources", { source: item })
              }
            >
              <View className="flex-row items-center justify-between mt-4">
                <View className="flex-row items-center space-x-2">
                  <Image
                    source={require("../../../assets/images/image.png")}
                    style={{ height: hp(5), width: hp(5) }}
                  />
                  <Text className="text-lg">{item.name}</Text>
                </View>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={35}
                  color="gray"
                />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
