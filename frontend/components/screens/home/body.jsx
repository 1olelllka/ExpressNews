import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Entypo, FontAwesome6, Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { format } from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";

function getFormattedDate(date) {
  const day = date.toLocaleDateString("en-US", { weekday: "long" });
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const dayOfMonth = date.getDate();

  return `${day}, ${month} ${dayOfMonth}`;
}

export default function Body({ navigation }) {
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const [popularArticles, setPopularArticles] = useState({});
  const [description, setDescription] = useState("");
  const [token, setToken] = useState("");

  const tokenValue = async () => {
    const value = await AsyncStorage.getItem("userData");
    if (value !== null) {
      const data = JSON.parse(value);
      if (data.token && data.expiry > Date.now()) {
        setToken(data.token);
      } else {
        alert("Your session has been expired!");
        navigation.navigate("Login");
      }
    }
  };

  useEffect(() => {
    tokenValue();
    fetch("http://localhost:8000/api/v1/home/", {
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPopularArticles(data.slice(0, 5));
      });
  }, [token]);

  const sendFeedback = (msg) => {
    fetch("http://localhost:8000/api/v1/feedback/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify({
        description: msg,
      }),
    }).then(() => console.log("Feedback was sent"));
  };

  const saveArticle = (article) => {
    fetch("http://localhost:8000/api/v1/user/save-article/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify({
        storyId: article,
      }),
    });
  };

  const _carousel = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const show = () => setModalVisible(true);
  const hide = () => setModalVisible(false);
  const show2 = () => setModalVisible2(true);
  const hide2 = () => setModalVisible2(false);
  const ModalSwitch = () => {
    hide();
    setTimeout(() => {
      show2();
    }, 400);
  };

  function formattedDate(date) {
    return format(date, "dd/MM/yyyy H:mma");
  }
  return (
    <View className="ml-4 mt-5 mr-4">
      <View>
        <Text
          className="text-neutral-500 font-medium"
          style={{ fontSize: hp(1.8) }}
        >
          {getFormattedDate(new Date())}
        </Text>
      </View>
      <View className="mt-5">
        <View className="flex-row justify-between items-center">
          <Text className="font-bold" style={{ fontSize: hp(3) }}>
            Top Stories
          </Text>
        </View>
        <View className="mt-4 mr-4 justify-center flex-col">
          <Carousel
            ref={_carousel}
            data={popularArticles}
            loop
            autoplay={true}
            autoplayInterval={5000}
            sliderWidth={wp(93)}
            itemWidth={wp(93)}
            onSnapToItem={(index) => setActiveDotIndex(index)}
            renderItem={({ item }) => {
              return (
                <View className="">
                  <Modal
                    isVisible={modalVisible}
                    onBackdropPress={hide}
                    backdropOpacity={0.2}
                    style={{ marginLeft: wp(20) }}
                    animationIn={"fadeIn"}
                    animationOut={"fadeOut"}
                  >
                    <View className="">
                      <View
                        className="flex self-center justify-center rounded-lg"
                        style={{
                          backgroundColor: "white",
                          width: wp(60),
                          height: hp(25),
                        }}
                      >
                        <View className="self-center" style={{ width: wp(50) }}>
                          <View className="border-b-2 pb-2 border-neutral-300">
                            <TouchableOpacity
                              onPress={() => saveArticle(item._id)}
                            >
                              <View className="flex-row items-center justify-between">
                                <Text className="text-lg text-neutral-600 font-semibold">
                                  Save article
                                </Text>
                                <FontAwesome6
                                  name="bookmark"
                                  size={24}
                                  color="gray"
                                />
                              </View>
                            </TouchableOpacity>
                            <View
                              className="flex-row items-center justify-between"
                              style={{ marginTop: hp(1.5) }}
                            >
                              <Text className="text-lg text-neutral-600 font-semibold">
                                Share article
                              </Text>
                              <FontAwesome6
                                name="share-nodes"
                                size={24}
                                color="gray"
                              />
                            </View>
                            <View
                              className="flex-row items-center justify-between"
                              style={{ marginTop: hp(1.5) }}
                            >
                              <Text className="text-lg text-neutral-600 font-semibold">
                                Copy link
                              </Text>
                              <FontAwesome6
                                name="copy"
                                size={24}
                                color="gray"
                              />
                            </View>
                          </View>
                          <View className="">
                            <View
                              className="flex-row items-center justify-between"
                              style={{ marginTop: hp(0.5) }}
                            >
                              <Text className="text-lg text-neutral-600 font-semibold">
                                Go to {item.link}
                              </Text>
                              <FontAwesome6
                                name="arrow-right"
                                size={24}
                                color="gray"
                              />
                            </View>
                            <TouchableOpacity onPress={ModalSwitch}>
                              <View
                                className="flex-row items-center justify-between"
                                style={{ marginTop: hp(1.5) }}
                              >
                                <Text className="text-lg text-neutral-600 font-semibold">
                                  Send a feedback
                                </Text>
                                <FontAwesome6
                                  name="paper-plane"
                                  size={24}
                                  color="gray"
                                />
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  </Modal>
                  <Image
                    source={{
                      uri: item.urlToImage
                        ? item.urlToImage
                        : "https://shorturl.at/WoBew",
                    }}
                    style={{ width: wp(92), height: wp(50) }}
                  />
                  <Text className="text-neutral-500 font-medium mt-4">
                    {item.source.name}
                  </Text>
                  <Text
                    className="mt-3 font-medium"
                    style={{ fontSize: hp(2) }}
                  >
                    {item.title}
                  </Text>
                  <View className="flex-row items-center justify-between mt-3 mr-2">
                    <Text className="text-neutral-500 font-medium">
                      {formattedDate(item.publishedAt)}
                    </Text>
                    <Entypo
                      name="dots-three-horizontal"
                      size={24}
                      color="gray"
                      onPress={show}
                    />
                  </View>
                </View>
              );
            }}
          />
          <View>
            <Pagination
              carouselRef={_carousel}
              activeDotIndex={activeDotIndex}
              dotsLength={popularArticles.length}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 0,
                backgroundColor: "#EE6D33",
              }}
              inactiveDotStyle={{
                backgroundColor: "gray",
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
          </View>
        </View>
      </View>
      <Modal
        isVisible={modalVisible2}
        onBackdropPress={hide2}
        backdropOpacity={0.2}
        style={{ margin: 0 }}
      >
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={Platform.select({
            ios: -hp(1),
            android: hp(5),
          })}
        >
          <View
            className="bg-white rounded-xl"
            style={{ width: wp(100), height: hp(30), marginTop: hp(70) }}
          >
            <View className="border-b-2 pb-3 border-neutral-200">
              <View className="mx-5 mt-5 flex-row items-center justify-between">
                <FontAwesome6
                  name="xmark"
                  size={30}
                  color="black"
                  onPress={hide2}
                />
                <Text className="font-semibold text-lg">Send feedback</Text>
                <TouchableOpacity
                  onPress={() => {
                    sendFeedback(description);
                  }}
                >
                  <FontAwesome6 name="paper-plane" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <View className="mx-5 mt-5" style={{ margin: "auto" }}>
              <Text className="font-bold text-sm">Describe the issue</Text>
              <TextInput
                style={{ borderWidth: 1, height: hp(15), padding: hp(1) }}
                placeholder="Describe the issue"
                multiline={true}
                textAlignVertical="top"
                onChange={(e) => setDescription(e.nativeEvent.text)}
              />
            </View>
            <View className="border-b-2 border-neutral-200 mt-5" />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}
