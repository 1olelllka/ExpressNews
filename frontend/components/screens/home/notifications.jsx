import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { io } from "socket.io-client";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { format } from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Notifications() {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
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
  const socket = io("http://localhost:8000/", {
    auth: { userId: "66561ace45e6bfc3d65e6f77" }, // Needs to be changed
  });
  useEffect(() => {
    socket.on("breaking_news", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    return () => socket.disconnect();
  }, []);

  function formattedDate(date) {
    return format(date, "dd/MM/yyyy H:m");
  }

  useEffect(() => {
    tokenValue();
    fetch("http://localhost:8000/api/v1/home/notifications", {
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (messages?.length == 0) {
          setMessages(data);
        }
      });
  }, [token]);
  // FIELDS:
  // ! author, content, description, publishedAt, source (id, name), title, url, urlToImage
  return (
    <SafeAreaView>
      <View>
        <View className="m-4 flex-row items-center space-x-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">Breaking News</Text>
        </View>
        <View className="border-b-2 border-neutral-200" />
        <View>
          <FlatList
            style={{ height: hp(85) }}
            data={messages}
            renderItem={({ item }) => (
              <View>
                <View className="m-4 flex-row items-center space-x-4">
                  <View className="space-y-2">
                    <Text className="text-base">{item.title}</Text>
                    <Text className="text-neutral-500">
                      {formattedDate(item.publishedAt)}
                    </Text>
                  </View>
                </View>
                <View className="border-b-2 border-neutral-300" />
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
