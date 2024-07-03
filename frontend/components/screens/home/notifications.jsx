import { View, Text, TouchableOpacity, FlatList } from "react-native";
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
  const [userId, setUserId] = useState("");

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
    fetch("http://localhost:8000/api/v1/user/profile/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserId(data._id);
      });
  });

  useEffect(() => {
    const socket = io("http://localhost:8000/", {
      auth: { userId: userId },
    });
    socket.on("breaking_news", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    return () => {
      socket.off("breaking_news");
      socket.disconnect();
    };
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
          {messages.length == 0 && (
            <View>
              <Text
                style={{ fontSize: hp(3), marginTop: hp(2), marginLeft: wp(2) }}
              >
                No Breaking News For Now.
              </Text>
              <Text
                style={{ fontSize: hp(2), marginTop: hp(2), marginLeft: wp(2) }}
              >
                You should also consider adding some new preferences in your
                profile settings.
              </Text>
            </View>
          )}
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
