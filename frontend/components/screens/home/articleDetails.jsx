import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { format } from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ArticleDetails({ navigation, route }) {
  const [article, setArticle] = useState({});
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
    fetch(
      `http://localhost:8000/api/v1/home/story/${route.params.article._id}`,
      {
        method: "GET",
        headers: {
          Authorization: `JWT ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setArticle(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);
  function formattedDate(date) {
    return format(date, "dd/MM/yyyy H:mma");
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <View className="flex mx-6 mt-2 flex-row items-center justify-between pb-3">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="close" size={30} color="black" />
            </TouchableOpacity>
            <Text className="text-neutral-500">{article.source?.name}</Text>
            <TouchableOpacity>
              <Ionicons
                name="share-outline"
                size={24}
                color="black"
                onPress={() => Alert.alert("Share", "Coming Soon")}
              />
            </TouchableOpacity>
          </View>
          <View
            className="border-neutral-300"
            style={{ borderBottomWidth: 1 }}
          />
          <View
            className="m-4 rounded-md justify-center items-center"
            style={{ borderWidth: 1, height: hp(3.5), width: wp(20) }}
          >
            <Text className="font-medium text-xs">
              {article.category?.toUpperCase()}
            </Text>
          </View>
          <View className="mx-4">
            <Text className="text-2xl font-bold">{article.title}</Text>
            <View className="mt-4 flex-row items-center justify-between">
              <Text>
                By{" "}
                <Text className="font-semibold">
                  {article?.author?.slice(0, 20)}
                </Text>
              </Text>
              <Text className="text-neutral-500">
                {article.publishedAt
                  ? formattedDate(article.publishedAt)
                  : null}
              </Text>
            </View>
            <View className="mt-4">
              <Image
                className="rounded-lg"
                source={{
                  uri: article.urlToImage,
                }}
                style={{ height: hp(25), resizeMode: "contain" }}
              />
              <Text className="mt-2 text-neutral-500">
                {article.description}
              </Text>
            </View>
            <View className="mt-4">
              <Text className="text-base">
                {article.content}
                Incididunt tempor nulla ut irure amet velit nostrud id mollit
                non in sint non excepteur. Pariatur pariatur cupidatat ex id
                tempor officia consectetur ad excepteur cupidatat enim qui
                ullamco. Cillum amet voluptate do eiusmod. Do nostrud
                reprehenderit anim id voluptate sint. Ipsum veniam fugiat tempor
                irure Lorem ullamco enim magna. Quis nulla veniam fugiat ullamco
                incididunt ad ipsum. Reprehenderit sunt amet in fugiat sunt
                dolor nulla. Deserunt quis elit sit ad do. Non sint aliqua qui
                dolor minim laborum veniam fugiat ut reprehenderit elit et amet
                laboris. Deserunt voluptate sunt eiusmod fugiat in aliqua aliqua
                ad anim duis ullamco excepteur id.
              </Text>
            </View>
          </View>
        </View>
        <View
          className="border-neutral-300 mt-4"
          style={{ borderBottomWidth: 1 }}
        />
        <View className="m-4 flex-row items-center justify-between">
          <Text> </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
