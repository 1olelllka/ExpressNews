import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons, FontAwesome6, FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const data = [
  {
    id: 1,
    title: "General",
    background: "rgba(0, 0, 0, 0.2)",
    iconColor: "rgb(70, 70, 70)",
    iconName: "earth-europe",
  },
  {
    id: 2,
    title: "Technology",
    background: "rgba(0, 51, 204, 0.4)",
    iconColor: "rgb(0, 51, 204)",
    iconName: "computer",
  },
  {
    id: 3,
    title: "Business",
    background: "rgba(0, 153, 153, 0.4)",
    iconColor: "rgb(0, 153, 153)",
    iconName: "money-bill-wave",
  },
  {
    id: 4,
    title: "Sports",
    background: "rgba(21,128,61, 0.4)",
    iconColor: "green",
    iconName: "soccer-ball",
  },
  {
    id: 5,
    title: "Entertainment",
    background: "rgba(255,153,51, 0.4)",
    iconColor: "rgb(255,153,51)",
    iconName: "umbrella-beach",
  },
  {
    id: 6,
    title: "Health",
    background: "rgba(204,0,0, 0.4)",
    iconColor: "rgb(204,0,0)",
    iconName: "suitcase-medical",
  },
  {
    id: 7,
    title: "Science",
    background: "rgba(153,51,153, 0.4)",
    iconColor: "rgb(153, 51, 153)",
    iconName: "rocket",
  },
];

export default function Profile() {
  const navigation = useNavigation();
  const [text1, onChangeText1] = React.useState("Useless username");
  const [text2, onChangeText2] = React.useState("Useless email");
  const [text3, onChangeText3] = React.useState("Useless full name");
  const [preferred, setPreferred] = React.useState({});
  const [button, setButton] = React.useState(() => {
    const initialState = {};
    data.forEach((item) => {
      initialState[item.title] = true;
    });
    return initialState;
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
  const handleButtonPress = (title) => {
    setButton((prevState) => ({
      ...prevState,
      [title]: !prevState[title], // Toggle the state for the specific button[item.id]
    }));
  };

  useEffect(() => {
    tokenValue();
    fetch("http://localhost:8000/api/v1/user/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        onChangeText1(data.username);
        onChangeText2(data.email);
        onChangeText3(data.full_name);
        setPreferred(data.preferred_topics);
        data.preferred_topics.forEach((item) => {
          handleButtonPress(item.slice(0, 1).toUpperCase() + item.slice(1));
        });
      });
  }, [token]);

  const logout = () => {
    fetch("http://localhost:8000/api/v1/auth/logout/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
    }).then(() => {
      AsyncStorage.removeItem("userData");
      navigation.navigate("Login");
    });
  };

  const changeCredentials = (username, email, full_name) => {
    fetch("http://localhost:8000/api/v1/user/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify({
        username: username,
        email: email,
        full_name: full_name,
      }),
    });
  };

  const deleteTopic = (topic) => {
    fetch("http://localhost:8000/api/v1/user/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify({
        preferred_topics: preferred.filter((item) => item !== topic),
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const addTopic = (topic) => {
    preferred.push(topic);
    console.log(preferred);
    fetch("http://localhost:8000/api/v1/user/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify({
        preferred_topics: preferred,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  const deleteUser = () => {
    Alert.alert("Are you sure you want to delete your account?", "", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          fetch("http://localhost:8000/api/v1/user/profile", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `JWT ${token}`,
            },
          });

          navigation.navigate("Login");
        },
      },
    ]);
  };

  return (
    <SafeAreaView>
      <View className="m-4 flex-row items-center justify-between">
        <View className="flex-row items-center space-x-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">Profile</Text>
        </View>
        <View className="flex-row items-center space-x-3">
          <TouchableOpacity onPress={logout}>
            <MaterialIcons name="logout" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={deleteUser}>
            <MaterialIcons name="delete-forever" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="border-neutral-300" style={{ borderBottomWidth: 1 }} />
      <View>
        <View className="m-4 space-y-3">
          <View className="space-y-2">
            <Text className="text-md font-semibold">Username</Text>
            <TextInput
              className="rounded-xl"
              style={{
                height: hp(4),
                paddingLeft: hp(1),
                borderWidth: 1,
              }}
              value={text1}
              onChangeText={onChangeText1}
            />
          </View>
          <View className="space-y-2">
            <Text className="text-md font-semibold">Email</Text>
            <TextInput
              className="rounded-xl"
              style={{
                height: hp(4),
                paddingLeft: hp(1),
                borderWidth: 1,
              }}
              value={text2}
              onChangeText={onChangeText2}
            />
          </View>
          <View className="space-y-2">
            <Text className="text-md font-semibold">Full name</Text>
            <TextInput
              className="rounded-xl"
              style={{
                height: hp(4),
                paddingLeft: hp(1),
                borderWidth: 1,
              }}
              value={text3}
              onChangeText={onChangeText3}
            />
          </View>
          <TouchableOpacity
            className="rounded-full w-full items-center justify-center"
            style={{ height: hp(5), backgroundColor: "#EE6D33" }}
            onPress={() => changeCredentials(text1, text2, text3)}
          >
            <Text className="text-base font-semibold text-white">Change</Text>
          </TouchableOpacity>
          <View
            className="border-neutral-300 pt-2"
            style={{ borderBottomWidth: 2 }}
          />
          <View>
            <Text className=" text-base font-semibold">
              Followed categories
            </Text>
            <FlatList
              style={{ height: hp(80) }}
              data={data}
              renderItem={({ item }) => (
                <View className="flex-row items-center justify-between mt-4">
                  <View className="flex-row items-center space-x-2">
                    <View
                      className="flex rounded-full items-center justify-center"
                      style={{
                        width: hp(4),
                        height: hp(4),
                        backgroundColor: item.background,
                      }}
                    >
                      <FontAwesome6
                        name={item.iconName}
                        size={22}
                        color={item.iconColor}
                      />
                    </View>
                    <Text className="text-lg">{item.title}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      if (button[item.title]) {
                        addTopic(item.title.toLowerCase());
                      } else {
                        deleteTopic(item.title.toLowerCase());
                      }
                      handleButtonPress(item.title);
                    }}
                  >
                    <FontAwesome
                      name={button[item.title] ? "heart-o" : "heart"}
                      size={30}
                      color={button[item.title] ? "gray" : "#EE6D33"}
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
