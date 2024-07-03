import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { format } from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused, useNavigation } from "@react-navigation/native";

function getFormattedDate(date) {
  const day = date.toLocaleDateString("en-US", { weekday: "long" });
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const dayOfMonth = date.getDate();

  return `${day}, ${month} ${dayOfMonth}`;
}

export default function Body() {
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const [popularArticles, setPopularArticles] = useState({});
  const [description, setDescription] = useState("");
  const [token, setToken] = useState("");
  const [restStories, setRestStories] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const focused = useIsFocused();

  const [buttonSave, setButtonSave] = React.useState(() => {
    const initialState = {};
    restStories.forEach((item) => {
      initialState[item._id] = false;
    });
    return initialState;
  });
  const handleButtonPress = (id) => {
    setButtonSave((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Toggle the state for the specific button[item.id]
    }));
  };

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
    const unsubscribe = navigation.addListener("focus", () => {
      setButtonSave(false);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (focused) {
      fetch("http://localhost:8000/api/v1/user/saved-articles", {
        method: "GET",
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          data.forEach((item) => {
            setButtonSave((prevState) => ({
              ...prevState,
              [item._id]: true,
            }));
          });
        });
    }
  }, [token, focused]);

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

  useEffect(() => {
    tokenValue();
    fetch(`http://localhost:8000/api/v1/home/?page=${page}`, {
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(true);
        if (page == 1) {
          setRestStories(data.slice(5));
        } else {
          setRestStories((prevStories) => [...prevStories, ...data]);
        }
      });
    setLoading(false);
  }, [token, page]);
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
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          Alert.alert("Error", data.errors[0].msg);
        }
      });
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
  const unsave = (id) => {
    fetch("http://localhost:8000/api/v1/user/delete-article", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify({
        storyId: id,
      }),
    });
  };

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const _carousel = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  function formattedDate(date) {
    return format(date, "dd/MM/yyyy H:mma");
  }
  return (
    <ScrollView
      className="ml-4 mt-5 mr-4"
      showsVerticalScrollIndicator={false}
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          setPage((prevPage) => prevPage + 1);
        }
      }}
      scrollEventThrottle={1000}
    >
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
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ArticleDetails", {
                      article: item,
                    })
                  }
                >
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
                    <View className="flex-row space-x-4 space-evenly">
                      <TouchableOpacity
                        onPress={() => {
                          if (!buttonSave[item._id]) {
                            saveArticle(item._id);
                          } else {
                            unsave(item._id);
                          }
                          handleButtonPress(item._id);
                        }}
                      >
                        <MaterialIcons
                          name={
                            buttonSave[item._id]
                              ? "bookmark"
                              : "bookmark-outline"
                          }
                          size={30}
                          color={buttonSave[item._id] ? "#EE6D33" : "gray"}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        className="mt-1 pb-1"
                        onPress={() => setModalVisible(true)}
                      >
                        <FontAwesome6
                          name="paper-plane"
                          size={24}
                          color="gray"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
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
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
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
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <FontAwesome6 name="xmark" size={30} color="black" />
                </TouchableOpacity>
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
      <View className="mt-4 mb-10">
        {restStories.map((item) => (
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
                  {item?.source?.name}
                </Text>
                <Text className="font-bold text-base mt-2">{item.title}</Text>
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
                {item?.publishedAt && formattedDate(item.publishedAt)}
              </Text>
              <View className="flex-row space-x-4 space-evenly">
                <TouchableOpacity
                  onPress={() => {
                    if (!buttonSave[item._id]) {
                      saveArticle(item._id);
                    } else {
                      unsave(item._id);
                    }
                    handleButtonPress(item._id);
                  }}
                >
                  <MaterialIcons
                    name={
                      buttonSave[item._id] ? "bookmark" : "bookmark-outline"
                    }
                    size={30}
                    color={buttonSave[item._id] ? "#EE6D33" : "gray"}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  className="mt-1 pb-1"
                  onPress={() => setModalVisible(true)}
                >
                  <FontAwesome6 name="paper-plane" size={24} color="gray" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        {loading && (
          <View className="row justify-center items-center mt-10 mb-10">
            <ActivityIndicator size="large" color="#EE6D33" />
            <Text className="mt-2 mb-2 text-neutral-700">Loading...</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
