import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default function ArticleDetails({ navigation, route }) {
  const [thumbsUpPressed, setThumbsUpPressed] = useState(false);
  const [thumbsDownPressed, setThumbsDownPressed] = useState(false);
  const [article, setArticle] = useState({});
  console.log("MY ROUTE", route);
  const changeThumbsUpPressed = () => {
    setThumbsUpPressed(!thumbsUpPressed);
    setThumbsDownPressed(false);
  };
  const changeThumbsDownPressed = () => {
    setThumbsDownPressed(!thumbsDownPressed);
    setThumbsUpPressed(false);
  };
  useEffect(() => {
    fetch(
      `http://localhost:8000/api/v1/home/story/${route.params.article._id}`,
      {
        method: "GET",
        headers: {
          Authorization:
            "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjU2MWFjZTQ1ZTZiZmMzZDY1ZTZmNzciLCJ1c2VybmFtZSI6IjFvbGVsbGxrYSIsImlhdCI6MTcxODAzNDMwOSwiZXhwIjoxNzE4MDM3OTA5fQ.HGRJqGNQ70Y4WTE62Sg__Nj3jIjNNYWJbUoidlY9dQc",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setArticle(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
              <Ionicons name="share-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View
            className="border-neutral-300"
            style={{ borderBottomWidth: 1 }}
          />
          <View
            className="m-4 rounded-md justify-center items-center"
            style={{ borderWidth: 1, height: hp(3.5), width: wp(15) }}
          >
            <Text className="font-medium text-xs">
              {article.category?.toUpperCase()}
            </Text>
          </View>
          <View className="mx-4">
            <Text className="text-2xl font-bold">{article.title}</Text>
            <View className="mt-4 flex-row items-center justify-between">
              <Text>
                By <Text className="font-semibold">{article.author}</Text>
              </Text>
              <Text className="text-neutral-500">{article.publishedAt}</Text>
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
              <Text className="text-base">{article.content}</Text>
            </View>
          </View>
        </View>
        <View
          className="border-neutral-300 mt-4"
          style={{ borderBottomWidth: 1 }}
        />
        <View className="m-4 flex-row items-center justify-between">
          <View className="flex-row items-center space-x-6">
            <TouchableOpacity onPress={() => changeThumbsUpPressed()}>
              <MaterialIcons
                name={thumbsUpPressed ? "thumb-up-alt" : "thumb-up-off-alt"}
                size={35}
                color={thumbsUpPressed ? "#EE6D33" : "gray"}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeThumbsDownPressed()}>
              <MaterialIcons
                name={
                  thumbsDownPressed ? "thumb-down-alt" : "thumb-down-off-alt"
                }
                size={35}
                color={thumbsDownPressed ? "#EE6D33" : "gray"}
              />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center space-x-6">
            <TouchableOpacity>
              <MaterialIcons name="arrow-back" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons name="arrow-forward" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
