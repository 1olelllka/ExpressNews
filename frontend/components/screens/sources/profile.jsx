import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Platform,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, FontAwesome6 } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "react-native-modal";
import { KeyboardAvoidingView } from "react-native";

export default function ProfileSources({ route }) {
  const navigation = useNavigation();
  const [button, setButton] = useState(false);
  const [newsList, setNewsList] = useState([]);
  const [saved, setSaved] = useState([]);
  const [token, setToken] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);

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
      `http://localhost:8000/api/v1/sources/sources-news/${route.params.source.name}?page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: `JWT ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setLoading(true);
        setNewsList((prev) => [
          ...prev,
          ...data.filter(
            (item) => item.source.name === route.params.source.name
          ),
        ]);
      })
      .then(
        fetch("http://localhost:8000/api/v1/sources/my-following", {
          method: "GET",
          headers: {
            Authorization: `JWT ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            data.forEach((item) => {
              if (item.name === route.params.source.name) {
                setButton(true);
              }
            });
          })
      );
    setLoading(false);
  }, [token, page]);

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

  const [buttonSave, setButtonSave] = React.useState(() => {
    const initialState = {};
    saved.forEach((item) => {
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

  React.useEffect(() => {
    fetch("http://localhost:8000/api/v1/user/saved-articles", {
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSaved(data);
        data.forEach((item) => {
          setButtonSave((prevState) => ({
            ...prevState,
            [item._id]: true,
          }));
        });
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
    });
  };

  const save = (id) => {
    fetch("http://localhost:8000/api/v1/user/save-article", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify({
        storyId: id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setButtonSave((prevState) => ({
          ...prevState,
          [id]: true,
        }));
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

  function formattedDate(date) {
    return format(date, "dd/MM/yyyy H:mma");
  }

  return (
    <SafeAreaView>
      <View>
        <View className="modal">
          <Modal
            isVisible={modalVisible}
            backdropOpacity={0.5}
            onBackdropPress={() => setModalVisible(false)}
            style={{ margin: 0 }}
            animationIn={"fadeIn"}
            animationOut={"fadeOut"}
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
                      onPress={() => setModalVisible(false)}
                    />
                    <Text className="font-semibold text-lg">Send feedback</Text>
                    <TouchableOpacity
                      onPress={() => {
                        sendFeedback(description);
                        alert("Thank you for your feedback");
                        setModalVisible(false);
                      }}
                    >
                      <FontAwesome6
                        name="paper-plane"
                        size={24}
                        color="black"
                      />
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
                    value={description}
                    onChangeText={setDescription}
                  />
                </View>
                <View className="border-b-2 border-neutral-200 mt-5" />
              </View>
            </KeyboardAvoidingView>
          </Modal>
        </View>
        <View className="flex-row items-center space-x-4 ml-5 mt-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
          <Text className="text-2xl font-semibold">Profile</Text>
        </View>
      </View>
      <View className="border-b-2 border-neutral-200 mt-4" />
      <View className="mt-4 ml-4">
        <View className="flex-row">
          <Image
            className="rounded-full"
            style={{ width: hp(12), height: hp(12) }}
            source={require("../../../assets/images/image.jpg")}
          />
          <View className="ml-5">
            <Text className="text-2xl font-bold mt-1">
              {route.params.source.name}
            </Text>
            <Text className="text-md mt-1 text-neutral-400 font-semibold">
              {route.params.source.category[0].toUpperCase() +
                route.params.source.category.slice(1)}
            </Text>
            <TouchableOpacity
              onPress={() => {
                if (button) {
                  unfollow(route.params.source._id);
                } else {
                  follow(route.params.source._id);
                }
                setButton(!button);
              }}
            >
              <View
                className="rounded-md items-center justify-center mt-2"
                style={{
                  width: wp(20),
                  height: hp(4),
                  backgroundColor: button ? "rgb(229, 229, 229)" : "#EE6D33",
                  borderWidth: button ? 1 : 0,
                  borderColor: "rgb(200,200,200)",
                }}
              >
                <Text
                  className="font-semibold text-md"
                  style={{ color: button ? "gray" : "white" }}
                >
                  {button ? "Following" : "Follow"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="border-b-2 border-neutral-200 mt-4" />
      <View className="mt-4 mx-4 space-y-2" style={{ paddingBottom: hp(50) }}>
        <FlatList
          data={newsList}
          showsVerticalScrollIndicator={false}
          onEndReached={() => {
            setPage((prevPage) => prevPage + 1);
          }}
          ListFooterComponent={() => (
            <View className="row justify-center items-center mt-10 mb-10">
              <ActivityIndicator size="large" color="#EE6D33" />
              <Text className="mt-2 mb-2 text-neutral-700">Loading...</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <View
              className="pb-1 border-neutral-400 mt-2"
              style={{ borderBottomWidth: 1 }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ArticleDetails", { article: item })
                }
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
                    source={{
                      uri: item.urlToImage
                        ? item.urlToImage
                        : "https://shorturl.at/WoBew",
                    }}
                  />
                </View>
                <View className="flex-row justify-between items-center mt-3 pb-2">
                  <Text className="text-neutral-500 text-xs">
                    {formattedDate(item.publishedAt)}
                  </Text>
                  <View className="flex-row space-x-4 space-evenly">
                    <TouchableOpacity
                      onPress={() => {
                        handleButtonPress(item._id);
                        if (buttonSave[item._id]) {
                          unsave(item._id);
                        } else {
                          save(item._id);
                        }
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
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
