// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View, FlatList } from "react-native";
// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigation from "./components/appNavigation";

// const socket = io("https://localhost:8000/", {
//   auth: { userId: "663f3be20fc92fb910ff3567" }, // Needs to be changed
// });
// console.log(socket.auth);
export default function App() {
  // const [news, setNews] = useState([]);

  // useEffect(() => {
  //   socket.on("breaking_news", (data) => {
  //     console.log(data);
  //     setNews((previous) => [...previous, data]);
  //   });
  //   return () => socket.disconnect();
  // }, []);

  // useEffect(() => {
  //   fetch("http://localhost:8000/api/v1/home/notifications/", {
  //     method: "GET",
  //     headers: {
  //       Authorization:
  //         "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjNmM2JlMjBmYzkyZmI5MTBmZjM1NjciLCJpYXQiOjE3MTU0MjA3ODYsImV4cCI6MTcxNTQyNDM4Nn0.AC6H9KcHym2jr793c07c8AAcOdOcDMIXB5WB8wskhvg",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (news.length == 0) {
  //         setNews(data);
  //       }
  //     });
  // }, []);
  // const renderItem = ({ item }) => (
  //   <View style={{ borderBottomWidth: 1, padding: 10 }}>
  //     <Text>{item.title}</Text>
  //   </View>
  // );
  return (
    <SafeAreaProvider>
      <AppNavigation />
    </SafeAreaProvider>
  );
  // <View>
  //   <FlatList
  //     data={news}
  //     renderItem={renderItem}
  //     keyExtractor={(item) => item.id} // Replace with unique identifier for each news item
  //   />
  //   <Text>Open up App.js to start working on your app!</Text>
  //   <StatusBar style="auto" />
  // </View>
}
