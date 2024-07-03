import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome6 } from "@expo/vector-icons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import Config from "react-native-config";

GoogleSignin.configure({
  webClientId: Config.GOOGLE_WEBCLIENT_ID,
  iosClientId: Config.GOOGLE_IOSCLIENT_ID,
  scopes: ["profile", "email"],
});
const GoogleLogin = async () => {
  await GoogleSignin.hasPlayServices();
  const userInfo = await GoogleSignin.signIn();
  return userInfo;
};

export default function Login() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const response = await GoogleLogin();
      const { idToken, user } = response;

      if (idToken) {
        fetch("http://localhost:8000/api/v1/auth/auth-google/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            googleId: user.id,
            username: user.name.replace(/\s+/g, ""),
            email: user.email,
            full_name: user.name,
            image: user.photo,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.token) {
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
      }
    } catch (apiError) {
      console.log(apiError);
      setError(
        apiError?.response?.data?.error?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const value = await AsyncStorage.getItem("userData");
      if (value !== null) {
        const data = JSON.parse(value);
        if (data.token && data.expiry > Date.now()) {
          navigation.navigate("MyTabs");
        }
      }
    };
    checkAuth();
  }, []);

  const login = () => {
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
        if (data.msg) {
          Alert.alert("Error", "Wrong username or password");
        }
        if (data.errors) {
          Alert.alert("Error", data.errors.map((e) => e.msg).join("\n"));
        }
        if (data.token) {
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
      behavior={"height"}
      keyboardVerticalOffset={Platform.select({
        ios: -hp(30),
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
        <View
          className="h-full w-full flex justify-around pb-10"
          style={{ paddingTop: Platform.OS === "ios" ? hp(35) : hp(35) }}
        >
          {/* Title */}
          <View className="absolute self-center" style={{ marginTop: hp(29) }}>
            <Animated.Text
              entering={FadeInUp.duration(1000).springify()}
              className="text-white font-bold text-5xl tracking-wider"
            >
              Login
            </Animated.Text>
          </View>

          {/* Form */}

          <View
            style={{ marginTop: Platform.OS === "android" ? hp(6) : hp(12) }}
          >
            <View className="flex space-y-4 mx-2">
              <Animated.View
                entering={FadeInDown.duration(1000).springify()}
                className="bg-black/5 p-5 rounded-2xl w-full"
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
                entering={FadeInDown.delay(400).duration(1000).springify()}
                className="w-full"
              >
                <TouchableOpacity
                  className="w-full p-3 rounded-2xl flex-row justify-center"
                  style={{
                    backgroundColor: "#7289da",
                    shadowColor: "rgba(0, 0, 0, 0.3)",
                    shadowOpacity: 0.8,
                    elevation: 6,
                    shadowRadius: 15,
                    shadowOffset: { width: 1, height: 13 },
                  }}
                  onPress={() =>
                    Alert.alert("Info", "This feature is in development...")
                  }
                >
                  <Text className="text-xl font-bold text-white text-center mr-2">
                    Continue with Discord
                  </Text>
                  <FontAwesome6 name="discord" size={24} color="white" />
                </TouchableOpacity>
              </Animated.View>
              <Animated.View
                entering={FadeInDown.delay(600).duration(1000).springify()}
                className="w-full"
              >
                <TouchableOpacity
                  className="w-full p-3 rounded-2xl flex-row justify-center border-neutral-500"
                  style={{
                    backgroundColor: "white",
                    shadowColor: "rgba(0, 0, 0, 0.4)",
                    shadowOpacity: 0.8,
                    elevation: 6,
                    shadowRadius: 15,
                    shadowOffset: { width: 1, height: 13 },
                  }}
                  onPress={handleGoogleLogin}
                >
                  <Text className="text-xl font-bold text-black text-center mr-2">
                    Continue with Google
                  </Text>
                  <FontAwesome6 name="google" size={24} color="black" />
                </TouchableOpacity>
              </Animated.View>
              <Animated.View
                entering={FadeInDown.delay(800).duration(1000).springify()}
                className="w-full"
              >
                <TouchableOpacity
                  className="w-full p-3 rounded-2xl"
                  style={{
                    backgroundColor: "#EE6D33",
                    shadowColor: "rgba(0, 0, 0, 0.3)",
                    shadowOpacity: 0.8,
                    elevation: 6,
                    shadowRadius: 15,
                    shadowOffset: { width: 1, height: 13 },
                  }}
                  onPress={login}
                >
                  <Text className="text-xl font-bold text-white text-center">
                    Login
                  </Text>
                </TouchableOpacity>
              </Animated.View>
              <Animated.View
                entering={FadeInDown.delay(1000).duration(1000).springify()}
                className="flex-row justify-center"
              >
                <Text>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.push("Signup")}>
                  <Text className="text-sky-600">Sign up</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
