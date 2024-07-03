import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SeeMore() {
  const navigation = useNavigation();
  const route = useRoute();
  const title = route.params.title;
  const [button, setButton] = useState(() => {
    const initialStates = {};
    route.params.data.forEach((item) => {
      initialStates[item._id] = false;
    });
    return initialStates;
  });
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
    fetch("http://localhost:8000/api/v1/sources/my-following", {
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data.forEach((item) => {
          setButton((prevState) => ({
            ...prevState,
            [item._id]: true,
          }));
        });
      });
  }, [token]);

  const handleButtonPress = (id) => {
    setButton((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const follow = (sourceId) => {
    fetch("http://localhost:8000/api/v1/sources/follow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify({
        sourceId: sourceId,
      }),
    });
  };

  const unfollow = (sourceId) => {
    fetch("http://localhost:8000/api/v1/sources/unfollow", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify({
        sourceId: sourceId,
      }),
    });
  };
  return (
    <SafeAreaView>
      <View className="m-4 flex-row items-center space-x-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold">{title}</Text>
      </View>
      <View className="border-neutral-300" style={{ borderBottomWidth: 1 }} />
      <View className="mx-4">
        <FlatList
          style={{ height: hp(80) }}
          showsVerticalScrollIndicator={false}
          data={route.params.data}
          renderItem={({ item }) => (
            <View
              className="justify-center space-y-1 items-center mb-2"
              style={{ width: wp(30), height: hp(20) }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ProfileSources", { source: item })
                }
              >
                <Image
                  style={{ width: hp(12), height: hp(12) }}
                  className="rounded-full"
                  source={require("../../../assets/images/image.jpg")}
                />
              </TouchableOpacity>
              <Text className="text-lg">{item?.name.slice(0, 11)}</Text>
              <TouchableOpacity
                onPress={() => {
                  if (button[item._id]) {
                    unfollow(item._id);
                  } else {
                    follow(item._id);
                  }
                  handleButtonPress(item._id);
                }}
              >
                <View
                  className="rounded-md items-center justify-center"
                  style={{
                    width: wp(20),
                    height: hp(4),
                    backgroundColor: button[item._id]
                      ? "rgb(229, 229, 229)"
                      : "#EE6D33",
                    borderWidth: button[item._id] ? 1 : 0,
                    borderColor: "rgb(200,200,200)",
                  }}
                >
                  <Text
                    className="font-semibold text-md"
                    style={{ color: button[item._id] ? "gray" : "white" }}
                  >
                    {button[item._id] ? "Following" : "Follow"}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          numColumns={3}
        />
      </View>
    </SafeAreaView>
  );
}
