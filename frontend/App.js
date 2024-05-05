import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000/", {
  auth: { userId: "6637d44bc52b2037402a8f19" }, // Needs to be changed
});
console.log(socket.auth);
export default function App() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    socket.on("news_updates", (data) => {
      setNews((prevMessages) => [...prevMessages, data]);
    });
    return () => socket.disconnect();
  }, []);
  const renderItem = ({ item }) => (
    <View style={{ borderBottomWidth: 1, padding: 10 }}>
      <Text>{item.header}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={news}
        renderItem={renderItem}
        keyExtractor={(item) => item.id} // Replace with unique identifier for each news item
      />
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
