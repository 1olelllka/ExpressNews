import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./home/header";
import Body from "./home/body";
import { StatusBar } from "expo-status-bar";

export default function Home() {
  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <Header />
      <Body />
    </SafeAreaView>
  );
}
