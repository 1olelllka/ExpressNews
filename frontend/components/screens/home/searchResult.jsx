import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Entypo } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { format } from "date-fns";

export default function SearchResult({ navigation, route }) {
  const [search, setSearch] = React.useState([]);

  React.useEffect(() => {
    fetch(
      `http://localhost:8000/api/v1/home/search/?query=${route.params.search}`,
      {
        method: "GET",
        headers: {
          Authorization:
            "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjU2MWFjZTQ1ZTZiZmMzZDY1ZTZmNzciLCJ1c2VybmFtZSI6IjFvbGVsbGxrYSIsImlhdCI6MTcxODY1MjkxNiwiZXhwIjoxNzE4NjU2NTE2fQ.H6n60QSYWruNVN9Iasz8bDfrefsUiIgFrHoaXYdZH5E",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setSearch(data);
      });
  }, []);
  function formattedDate(date) {
    return format(date, "dd/MM/yyyy H:mma");
  }
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row mx-6 items-center">
          <Ionicons
            name="arrow-back"
            size={30}
            color="black"
            onPress={() =>
              navigation.goBack({
                search: route.params.search,
              })
            }
          />
          <Text className="ml-6 ">{route.params.search}</Text>
        </View>
        <View className="mt-5 mx-4">
          <View
            style={{
              borderColor: "#EE6D33",
              borderBottomWidth: 1,
              paddingBottom: 15,
            }}
          >
            <View className="flex-row items-center justify-between">
              <Text className="font-bold text-2xl">{route.params.search}</Text>
            </View>
            <Text className="mt-3">Search Results</Text>
          </View>
          <View>
            {search.map((item) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ArticleDetails", { article: item })
                }
              >
                <View className="mt-4">
                  <View
                    className="pb-1 border-neutral-400"
                    style={{ borderBottomWidth: 1 }}
                  >
                    <View className="flex-row items-center justify-between">
                      <View style={{ width: wp(70) }}>
                        <Text className="text-neutral-600 text-xs font-semibold">
                          {item.source.name}
                        </Text>
                        <Text className="font-bold text-base mt-2">
                          {item.title}
                        </Text>
                      </View>
                      <Image
                        className="rounded-md"
                        style={{ width: wp(25), height: wp(25) }}
                        source={{ uri: item.urlToImage }}
                      />
                    </View>
                    <View className="flex-row justify-between items-center mt-1">
                      <Text className="text-neutral-500 text-xs">
                        {formattedDate(item.publishedAt)}
                      </Text>
                      <Entypo
                        name="dots-three-horizontal"
                        size={24}
                        color="black"
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
