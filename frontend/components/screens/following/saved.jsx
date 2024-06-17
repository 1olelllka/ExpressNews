import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { format } from "date-fns";

export default function Saved() {
  const navigation = useNavigation();
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/user/saved-articles", {
      method: "GET",
      headers: {
        Authorization:
          "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjU2MWFjZTQ1ZTZiZmMzZDY1ZTZmNzciLCJ1c2VybmFtZSI6IjFvbGVsbGxrYSIsImlhdCI6MTcxODY1MjkxNiwiZXhwIjoxNzE4NjU2NTE2fQ.H6n60QSYWruNVN9Iasz8bDfrefsUiIgFrHoaXYdZH5E",
      },
    })
      .then((response) => response.json())
      .then((data) => setSaved(data));
  }, []);
  console.log(saved);
  function formattedDate(date) {
    return format(date, "dd/MM/yyyy H:mma");
  }
  return (
    <SafeAreaView>
      <View>
        <View className="m-4 flex-row items-center space-x-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">Saved</Text>
        </View>
        <View className="border-b-2 border-neutral-200" />
        <View className="mt-4 mx-4">
          <FlatList
            style={{ height: hp(80) }}
            data={saved}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="pb-1 border-neutral-400 mt-1"
                style={{ borderBottomWidth: 1 }}
                onPress={() =>
                  navigation.navigate("ArticleDetails", { article: item })
                }
              >
                <View className="flex-row items-center justify-between">
                  <View style={{ width: wp(70) }}>
                    <Text className="text-neutral-600 text-xs font-semibold">
                      {item?.source.name}
                    </Text>
                    <Text className="font-bold text-base mt-2">
                      {item.title}
                    </Text>
                  </View>
                  <Image
                    className="rounded-md"
                    style={{
                      width: wp(25),
                      height: wp(25),
                      resizeMode: "cover",
                    }}
                    source={{
                      uri: item.urlToImage
                        ? item.urlToImage
                        : "https://shorturl.at/WoBew",
                    }}
                  />
                </View>
                <View className="flex-row justify-between items-center mt-2 pb-1">
                  <Text className="text-neutral-500 text-xs">
                    {formattedDate(item.publishedAt)}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
