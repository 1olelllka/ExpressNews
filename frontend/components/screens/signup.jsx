import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Signup() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [full_name, setFullName] = useState("");

  const register = async (username, email, password, full_name) => {
    fetch("http://localhost:8000/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        full_name: full_name,
      }),
    }).then(() => {
      setTimeout(() => {
        login(username, password);
      }, 1000);
    });
  };

  const login = async (username, password) => {
    fetch("http://localhost:8000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data?.token) {
          AsyncStorage.setItem(
            "userData",
            JSON.stringify({
              token: data.token,
              expiry: Date.now() + 3600000, // 1 hour
            })
          );
          navigation.navigate("MyTabs");
        }
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={"padding"}
      keyboardVerticalOffset={Platform.select({
        ios: -hp(20),
        android: -hp(38),
      })}
      style={{ flex: 1 }}
    >
      <View className="bg-white h-full w-full">
        <StatusBar style="light" />
        <Image
          className="h-full w-full absolute"
          source={require("../../assets/images/login/background.png")}
        />

        {/* lights */}
        <View className="flex-row justify-around w-full absolute">
          <Animated.Image
            entering={FadeInUp.delay(200).duration(1000).springify()}
            className="h-[225] w-[90]"
            source={require("../../assets/images/login/light.png")}
          />
          <Animated.Image
            entering={FadeInUp.delay(400).duration(1000).springify()}
            className="h-[160] w-[65]"
            source={require("../../assets/images/login/light.png")}
          />
        </View>

        {/* title and form */}
        <View className="h-full w-full flex justify-around pt-48 pb-10">
          {/* Title */}
          <View className="flex items-center" style={{ marginTop: hp(5) }}>
            <Animated.Text
              entering={FadeInUp.duration(1000).springify()}
              className="text-white font-bold text-5xl tracking-wider"
            >
              Sign Up
            </Animated.Text>
          </View>

          {/* Form */}
          <View className="flex items-center mx-2 space-y-4">
            <View
              className="flex space-y-3 w-full"
              style={{ marginTop: hp(10) }}
            >
              <Animated.View
                entering={FadeInDown.duration(1000).springify()}
                className="bg-black/5 p-5 rounded-2xl w-full "
              >
                <TextInput
                  placeholder="Email"
                  placeholderTextColor={"gray"}
                  value={email}
                  onChangeText={setEmail}
                />
              </Animated.View>
              <Animated.View
                entering={FadeInDown.delay(200).duration(1000).springify()}
                className="bg-black/5 p-5 rounded-2xl w-full "
              >
                <TextInput
                  placeholder="Username"
                  placeholderTextColor={"gray"}
                  value={username}
                  onChangeText={setUsername}
                />
              </Animated.View>
              <Animated.View
                entering={FadeInDown.delay(200).duration(1000).springify()}
                className="bg-black/5 p-5 rounded-2xl w-full "
              >
                <TextInput
                  placeholder="Full name"
                  placeholderTextColor={"gray"}
                  value={full_name}
                  onChangeText={setFullName}
                />
              </Animated.View>
              <Animated.View
                entering={FadeInDown.delay(400).duration(1000).springify()}
                className="bg-black/5 p-5 rounded-2xl w-full mb-3"
              >
                <TextInput
                  placeholder="Password"
                  placeholderTextColor={"gray"}
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </Animated.View>
              <Animated.View
                entering={FadeInDown.delay(600).duration(1000).springify()}
                className="w-full"
              >
                <TouchableOpacity
                  className="w-full p-3 rounded-2xl"
                  style={{ backgroundColor: "#EE6D33" }}
                  onPress={() => register(username, email, password, full_name)}
                >
                  <Text className="text-xl font-bold text-white text-center">
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </Animated.View>
              <Animated.View
                entering={FadeInDown.delay(800).duration(1000).springify()}
                className="flex-row justify-center"
              >
                <Text>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.push("Login")}>
                  <Text className="text-sky-600">Login</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
