import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, FontAwesome6 } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { format } from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAvoidingView } from "react-native";
import Modal from "react-native-modal";

export default function SearchResult({ navigation, route }) {
  const [search, setSearch] = React.useState([]);
  const [saved, setSaved] = React.useState([]);
  const [buttonSave, setButtonSave] = React.useState(() => {
    const initialState = {};
    saved.forEach((item) => {
      initialState[item._id] = false;
    });
    return initialState;
  });
  const [token, setToken] = useState("");
  const [description, setDescription] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const tokenValue = async () => {
    const value = await AsyncStorage.getItem("userData");
    if (value !== null) {
      const data = JSON.parse(value);
      if (data.token && data.expiry > Date.now()) {
        setToken(data.token);
      }
    }
  };

  const handleButtonPress = (id) => {
    setButtonSave((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Toggle the state for the specific button[item.id]
    }));
  };

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

  React.useEffect(() => {
    tokenValue();
    fetch(
      `http://localhost:8000/api/v1/home/search/?query=${route.params.search}`,
      {
        method: "GET",
        headers: {
          Authorization: `JWT ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setSearch(data);
      });
  }, [token]);

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
                  value={description}
                  onChangeText={setDescription}
                />
              </View>
              <View className="border-b-2 border-neutral-200 mt-5" />
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="m-4 flex-row items-center space-x-4">
          <TouchableOpacity
            onPress={() =>
              navigation.goBack({
                search: route.params.search,
              })
            }
          >
            <MaterialIcons name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">{route.params.search}</Text>
        </View>
        <View className="border-b-2 border-neutral-200" />
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
