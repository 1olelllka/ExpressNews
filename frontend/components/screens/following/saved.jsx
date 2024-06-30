import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Platform,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { format } from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome6 } from "@expo/vector-icons";
import { KeyboardAvoidingView } from "react-native";
import Modal from "react-native-modal";

export default function Saved() {
  const navigation = useNavigation();
  const [saved, setSaved] = useState([]);
  const [token, setToken] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [description, setDescription] = useState("");

  const tokenValue = async () => {
    const value = await AsyncStorage.getItem("userData");
    if (value !== null) {
      const data = JSON.parse(value);
      if (data.token && data.expiry > Date.now()) {
        setToken(data.token);
      }
    }
  };
  const [buttonSave, setButtonSave] = React.useState(() => {
    const initialState = {};
    saved.forEach((item) => {
      initialState[item._id] = true;
    });
    return initialState;
  });
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

  useEffect(() => {
    tokenValue();
    fetch("http://localhost:8000/api/v1/user/saved-articles", {
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setSaved(data));
  }, [token]);
  function formattedDate(date) {
    return format(date, "dd/MM/yyyy H:mma");
  }

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
        <View className="m-4 flex-row items-center space-x-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">Saved</Text>
        </View>
        <View className="border-b-2 border-neutral-200" />
        <View className="mt-4 mx-4">
          <FlatList
            style={{ height: hp(80) }}
            data={saved}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
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
                      {item?.source.name}
                    </Text>
                    <Text className="font-bold text-base mt-2">
                      {item.title}
                    </Text>
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
                    {formattedDate(item.publishedAt)}
                  </Text>
                  <View className="flex-row space-x-4 space-evenly">
                    <TouchableOpacity
                      onPress={() => {
                        handleButtonPress(item._id);
                        unsave(item._id);
                      }}
                    >
                      <MaterialIcons
                        name={
                          buttonSave[item._id] ? "bookmark-outline" : "bookmark"
                        }
                        size={30}
                        color={buttonSave[item._id] ? "gray" : "#EE6D33"}
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
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
