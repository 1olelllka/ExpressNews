import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

export default function Body() {
  const navigation = useNavigation();
  const [subscribed, setSubscribed] = React.useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/sources/my-following", {
      method: "GET",
      headers: {
        Authorization:
          "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjU2MWFjZTQ1ZTZiZmMzZDY1ZTZmNzciLCJ1c2VybmFtZSI6IjFvbGVsbGxrYSIsImlhdCI6MTcxODY1MjkxNiwiZXhwIjoxNzE4NjU2NTE2fQ.H6n60QSYWruNVN9Iasz8bDfrefsUiIgFrHoaXYdZH5E",
      },
    })
      .then((response) => response.json())
      .then((data) => setSubscribed(data));
  }, []);
  console.log(subscribed);
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
            <TouchableOpacity>
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
