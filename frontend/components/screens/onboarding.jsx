import { View, Text } from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";

export default function OnboardingScreen() {
  return (
    <View className="flex-1 bg-white">
      <Onboarding
        pages={[
          {
            backgroundColor: "#fff",
            image: (
              <View>
                <Text>Hello worlds</Text>
              </View>
            ),
            title: "Onboarding",
            subtitle: "Done with React Native Onboarding Swiper",
          },
          {
            backgroundColor: "#fff",
            image: (
              <View>
                <Text>Hello worlds</Text>
              </View>
            ),
            title: "Onboarding",
            subtitle: "Done with React Native Onboarding Swiper",
          },
        ]}
      />
    </View>
  );
}
