import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MaterialIcons } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Body() {
  const navigation = useNavigation();
  const [sources, setSources] = useState([]);
  const focused = useIsFocused();

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
    const unsubscribe = navigation.addListener("focus", () => {
      setButton(false);
    });
    return unsubscribe;
  }, [navigation]);

  const [button, setButton] = useState(() => {
    tokenValue();
    const initialStates = {};
    sources.forEach((item) => {
      initialStates[item._id] = true;
    });

    return initialStates;
  });
  const handleButtonPress = (id) => {
    setButton((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/sources/", {
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSources(data);
      });
  }, [token]);

  useEffect(() => {
    if (focused) {
      fetch("http://localhost:8000/api/v1/sources/my-following", {
        method: "GET",
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          data.forEach((item) => {
            setButton((prevState) => ({
              ...prevState,
              [item._id]: true,
            }));
          });
        });
    }
  }, [focused, token]);

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

  return (
    <View className="m-5" style={{ paddingBottom: hp(10) }}>
      <ScrollView
        style={{ width: wp(100) }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text className="font-bold text-2xl">General</Text>
          <View className="flex-row space-x-2">
            <FlatList
              horizontal
              data={sources
                .filter((item) => item.category === "general")
                .slice(0, 3)}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View
                  className="justify-center space-y-1 items-center mb-2"
                  style={{ width: wp(30), height: hp(20) }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("ProfileSources", { source: item })
                    }
                  >
                    <Image
                      style={{ width: hp(12), height: hp(12) }}
                      className="rounded-full"
                      source={require("../../../assets/images/image.jpg")}
                    />
                  </TouchableOpacity>
                  <Text className="text-lg">{item.name?.slice(0, 11)}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      if (button[item._id]) {
                        unfollow(item._id);
                      } else {
                        follow(item._id);
                      }
                      handleButtonPress(item._id);
                    }}
                  >
                    <View
                      className="rounded-md items-center justify-center"
                      style={{
                        width: wp(20),
                        height: hp(4),
                        backgroundColor: button[item._id]
                          ? "rgb(229, 229, 229)"
                          : "#EE6D33",
                        borderWidth: button[item._id] ? 1 : 0,
                        borderColor: "rgb(200,200,200)",
                      }}
                    >
                      <Text
                        className="font-semibold text-md"
                        style={{ color: button[item._id] ? "gray" : "white" }}
                      >
                        {button[item._id] ? "Following" : "Follow"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.push("SeeMore", {
                  title: "General",
                  data: sources.filter((item) => item.category === "general"),
                })
              }
            >
              <View className="items-center flex-row justify-center mt-4">
                <Text className="text-lg" style={{ color: "#EE6D33" }}>
                  See more General
                </Text>
                <MaterialIcons name="arrow-forward" size={24} color="#EE6D33" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          className="border-neutral-300 mr-8 mt-4 pr-4"
          style={{ borderWidth: 1 }}
        />
        <View className="mt-4">
          <Text className="font-bold text-2xl">Technology</Text>
          <View className="flex-row space-x-2">
            <FlatList
              horizontal
              data={sources
                .filter((item) => item.category === "technology")
                .slice(0, 3)}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View
                  className="justify-center space-y-1 items-center mb-2"
                  style={{ width: wp(30), height: hp(20) }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      navigation.push("ProfileSources", { source: item })
                    }
                  >
                    <Image
                      style={{ width: hp(12), height: hp(12) }}
                      className="rounded-full"
                      source={require("../../../assets/images/image.jpg")}
                    />
                  </TouchableOpacity>
                  <Text className="text-lg">{item?.name.slice(0, 11)}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      if (button[item._id]) {
                        unfollow(item._id);
                      } else {
                        follow(item._id);
                      }
                      handleButtonPress(item._id);
                    }}
                  >
                    <View
                      className="rounded-md items-center justify-center"
                      style={{
                        width: wp(20),
                        height: hp(4),
                        backgroundColor: button[item._id]
                          ? "rgb(229, 229, 229)"
                          : "#EE6D33",
                        borderWidth: button[item._id] ? 1 : 0,
                        borderColor: "rgb(200,200,200)",
                      }}
                    >
                      <Text
                        className="font-semibold text-md"
                        style={{ color: button[item._id] ? "gray" : "white" }}
                      >
                        {button[item._id] ? "Following" : "Follow"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("SeeMore", {
                  title: "Technology",
                  data: sources.filter(
                    (item) => item.category === "technology"
                  ),
                })
              }
            >
              <View className="items-center flex-row justify-center mt-4">
                <Text className="text-lg" style={{ color: "#EE6D33" }}>
                  See more Technology
                </Text>
                <MaterialIcons name="arrow-forward" size={24} color="#EE6D33" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          className="border-neutral-300 mr-8 mt-4 pr-4"
          style={{ borderWidth: 1 }}
        />
        <View className="mt-4">
          <Text className="font-bold text-2xl">Business</Text>
          <View className="flex-row space-x-2">
            <FlatList
              horizontal
              data={sources
                .filter((item) => item.category === "business")
                .slice(0, 3)}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View
                  className="justify-center space-y-1 items-center mb-2"
                  style={{ width: wp(30), height: hp(20) }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      navigation.push("ProfileSources", { source: item })
                    }
                  >
                    <Image
                      style={{ width: hp(12), height: hp(12) }}
                      className="rounded-full"
                      source={require("../../../assets/images/image.jpg")}
                    />
                  </TouchableOpacity>
                  <Text className="text-lg">{item?.name.slice(0, 11)}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      if (button[item._id]) {
                        unfollow(item._id);
                      } else {
                        follow(item._id);
                      }
                      handleButtonPress(item._id);
                    }}
                  >
                    <View
                      className="rounded-md items-center justify-center"
                      style={{
                        width: wp(20),
                        height: hp(4),
                        backgroundColor: button[item._id]
                          ? "rgb(229, 229, 229)"
                          : "#EE6D33",
                        borderWidth: button[item._id] ? 1 : 0,
                        borderColor: "rgb(200,200,200)",
                      }}
                    >
                      <Text
                        className="font-semibold text-md"
                        style={{ color: button[item._id] ? "gray" : "white" }}
                      >
                        {button[item._id] ? "Following" : "Follow"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("SeeMore", {
                  title: "Business",
                  data: sources.filter((item) => item.category === "business"),
                })
              }
            >
              <View className="items-center flex-row justify-center mt-4">
                <Text className="text-lg" style={{ color: "#EE6D33" }}>
                  See more Business
                </Text>
                <MaterialIcons name="arrow-forward" size={24} color="#EE6D33" />
              </View>
            </TouchableOpacity>
          </View>
          <View
            className="border-neutral-300 mt-4 mr-8"
            style={{ borderWidth: 1 }}
          />
        </View>
        <View className="mt-4">
          <Text className="font-bold text-2xl">Sports</Text>
          <View className="flex-row space-x-2">
            <FlatList
              horizontal
              data={sources
                .filter((item) => item.category === "sports")
                .slice(0, 3)}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View
                  className="justify-center space-y-1 items-center mb-2"
                  style={{ width: wp(30), height: hp(20) }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      navigation.push("ProfileSources", { source: item })
                    }
                  >
                    <Image
                      style={{ width: hp(12), height: hp(12) }}
                      className="rounded-full"
                      source={require("../../../assets/images/image.jpg")}
                    />
                  </TouchableOpacity>
                  <Text className="text-lg">{item?.name.slice(0, 11)}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      if (button[item._id]) {
                        unfollow(item._id);
                      } else {
                        follow(item._id);
                      }
                      handleButtonPress(item._id);
                    }}
                  >
                    <View
                      className="rounded-md items-center justify-center"
                      style={{
                        width: wp(20),
                        height: hp(4),
                        backgroundColor: button[item._id]
                          ? "rgb(229, 229, 229)"
                          : "#EE6D33",
                        borderWidth: button[item._id] ? 1 : 0,
                        borderColor: "rgb(200,200,200)",
                      }}
                    >
                      <Text
                        className="font-semibold text-md"
                        style={{ color: button[item._id] ? "gray" : "white" }}
                      >
                        {button[item._id] ? "Following" : "Follow"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("SeeMore", {
                  title: "Sports",
                  data: sources.filter((item) => item.category === "sports"),
                })
              }
            >
              <View className="items-center flex-row justify-center mt-4">
                <Text className="text-lg" style={{ color: "#EE6D33" }}>
                  See more Sports
                </Text>
                <MaterialIcons name="arrow-forward" size={24} color="#EE6D33" />
              </View>
            </TouchableOpacity>
          </View>
          <View
            className="border-neutral-300 mt-4 mr-8"
            style={{ borderWidth: 1 }}
          />
        </View>
        <View className="mt-4">
          <Text className="font-bold text-2xl">Entertainment</Text>
          <View className="flex-row space-x-2">
            <FlatList
              horizontal
              data={sources
                .filter((item) => item.category === "entertainment")
                .splice(0, 3)}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View
                  className="justify-center space-y-1 items-center mb-2"
                  style={{ width: wp(30), height: hp(20) }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      navigation.push("ProfileSources", { source: item })
                    }
                  >
                    <Image
                      style={{ width: hp(12), height: hp(12) }}
                      className="rounded-full"
                      source={require("../../../assets/images/image.jpg")}
                    />
                  </TouchableOpacity>
                  <Text className="text-lg">{item?.name.slice(0, 11)}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      if (button[item._id]) {
                        unfollow(item._id);
                      } else {
                        follow(item._id);
                      }
                      handleButtonPress(item._id);
                    }}
                  >
                    <View
                      className="rounded-md items-center justify-center"
                      style={{
                        width: wp(20),
                        height: hp(4),
                        backgroundColor: button[item._id]
                          ? "rgb(229, 229, 229)"
                          : "#EE6D33",
                        borderWidth: button[item._id] ? 1 : 0,
                        borderColor: "rgb(200,200,200)",
                      }}
                    >
                      <Text
                        className="font-semibold text-md"
                        style={{ color: button[item._id] ? "gray" : "white" }}
                      >
                        {button[item._id] ? "Following" : "Follow"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("SeeMore", {
                  title: "Entertainment",
                  data: sources.filter(
                    (item) => item.category === "entertainment"
                  ),
                })
              }
            >
              <View className="items-center flex-row justify-center mt-4">
                <Text className="text-lg" style={{ color: "#EE6D33" }}>
                  See more Entertainment
                </Text>
                <MaterialIcons name="arrow-forward" size={24} color="#EE6D33" />
              </View>
            </TouchableOpacity>
          </View>
          <View
            className="border-neutral-300 mt-4 mr-8"
            style={{ borderWidth: 1 }}
          />
        </View>
        <View className="mt-4">
          <Text className="font-bold text-2xl">Health</Text>
          <View className="flex-row space-x-2">
            <FlatList
              horizontal
              data={sources
                .filter((item) => item.category === "health")
                .splice(0, 3)}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View
                  className="justify-center space-y-1 items-center mb-2"
                  style={{ width: wp(30), height: hp(20) }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      navigation.push("ProfileSources", { source: item })
                    }
                  >
                    <Image
                      style={{ width: hp(12), height: hp(12) }}
                      className="rounded-full"
                      source={require("../../../assets/images/image.jpg")}
                    />
                  </TouchableOpacity>
                  <Text className="text-lg">{item?.name.slice(0, 11)}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      if (button[item._id]) {
                        unfollow(item._id);
                      } else {
                        follow(item._id);
                      }
                      handleButtonPress(item._id);
                    }}
                  >
                    <View
                      className="rounded-md items-center justify-center"
                      style={{
                        width: wp(20),
                        height: hp(4),
                        backgroundColor: button[item._id]
                          ? "rgb(229, 229, 229)"
                          : "#EE6D33",
                        borderWidth: button[item._id] ? 1 : 0,
                        borderColor: "rgb(200,200,200)",
                      }}
                    >
                      <Text
                        className="font-semibold text-md"
                        style={{ color: button[item._id] ? "gray" : "white" }}
                      >
                        {button[item._id] ? "Following" : "Follow"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("SeeMore", {
                  title: "Health",
                  data: sources.filter((item) => item.category === "health"),
                })
              }
            >
              <View className="items-center flex-row justify-center mt-4">
                <Text className="text-lg" style={{ color: "#EE6D33" }}>
                  See more Health
                </Text>
                <MaterialIcons name="arrow-forward" size={24} color="#EE6D33" />
              </View>
            </TouchableOpacity>
          </View>
          <View
            className="border-neutral-300 mt-4 mr-8"
            style={{ borderWidth: 1 }}
          />
        </View>
        <View className="mt-4">
          <Text className="font-bold text-2xl">Science</Text>
          <View className="flex-row space-x-2">
            <FlatList
              horizontal
              data={sources
                .filter((item) => item.category === "science")
                .splice(0, 3)}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View
                  className="justify-center space-y-1 items-center mb-2"
                  style={{ width: wp(30), height: hp(20) }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      navigation.push("ProfileSources", { source: item })
                    }
                  >
                    <Image
                      style={{ width: hp(12), height: hp(12) }}
                      className="rounded-full"
                      source={require("../../../assets/images/image.jpg")}
                    />
                  </TouchableOpacity>
                  <Text className="text-lg">{item?.name.slice(0, 11)}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      if (button[item._id]) {
                        unfollow(item._id);
                      } else {
                        follow(item._id);
                      }
                      handleButtonPress(item._id);
                    }}
                  >
                    <View
                      className="rounded-md items-center justify-center"
                      style={{
                        width: wp(20),
                        height: hp(4),
                        backgroundColor: button[item._id]
                          ? "rgb(229, 229, 229)"
                          : "#EE6D33",
                        borderWidth: button[item._id] ? 1 : 0,
                        borderColor: "rgb(200,200,200)",
                      }}
                    >
                      <Text
                        className="font-semibold text-md"
                        style={{ color: button[item._id] ? "gray" : "white" }}
                      >
                        {button[item._id] ? "Following" : "Follow"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("SeeMore", {
                  title: "Science",
                  data: sources.filter((item) => item.category === "science"),
                })
              }
            >
              <View className="items-center flex-row justify-center mt-4">
                <Text className="text-lg" style={{ color: "#EE6D33" }}>
                  See more Science
                </Text>
                <MaterialIcons name="arrow-forward" size={24} color="#EE6D33" />
              </View>
            </TouchableOpacity>
          </View>
          <View
            className="border-neutral-300 mt-4 mr-8"
            style={{ borderWidth: 1 }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
