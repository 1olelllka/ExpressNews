import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AntDesign,
  FontAwesome6,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default function SearchScreen() {
  const navigation = useNavigation();
  const focused = useIsFocused();

  const [searches, setSearches] = React.useState([]);

  React.useEffect(() => {
    if (focused) {
      fetch("http://localhost:8000/api/v1/user/searches", {
        method: "GET",
        headers: {
          Authorization:
            "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjU2MWFjZTQ1ZTZiZmMzZDY1ZTZmNzciLCJ1c2VybmFtZSI6IjFvbGVsbGxrYSIsImlhdCI6MTcxODY1MjkxNiwiZXhwIjoxNzE4NjU2NTE2fQ.H6n60QSYWruNVN9Iasz8bDfrefsUiIgFrHoaXYdZH5E",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setSearches(data);
        });
    }
  }, [focused]);

  const search = (item) => {
    navigation.navigate("SearchResult", { search: item });
  };

  return (
    <SafeAreaView>
      <View className="mx-4">
        {/* Header */}
        <View className="flex flex-row">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={hp(3)} color="black" />
          </TouchableOpacity>
          <TextInput
            className="flex-1 ml-3 border-b-2 border-neutral-600"
            placeholder="Search"
            onSubmitEditing={({ nativeEvent }) => search(nativeEvent.text)}
          />
        </View>
        <View style={{ paddingBottom: hp(15) }}>
          <FlatList
            data={searches.reverse().slice(0, 15)}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => search(item.slice(0, -1))}>
                <View className="mt-6">
                  <View className="flex-row items-center">
                    <AntDesign name="clockcircleo" size={24} color="gray" />
                    <Text
                      style={{ fontSize: 15 }}
                      className="font-semibold ml-4"
                    >
                      {item.slice(0, -1)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
          />
          <View
            className="border-b-4 border-neutral-200 pb-6"
            style={{ width: wp(100), alignSelf: "center" }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
