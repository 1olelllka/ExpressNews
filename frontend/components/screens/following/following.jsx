import React from "react";
import Header from "./header";
import { SafeAreaView } from "react-native-safe-area-context";
import Body from "./body";

export default function Following() {
  return (
    <SafeAreaView>
      <Header />
      <Body />
    </SafeAreaView>
  );
}
