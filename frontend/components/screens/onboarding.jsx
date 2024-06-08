import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Onboarding from 'react-native-onboarding-swiper';

export default function OnboardingScreen() {
  return (
      <View className = "flex-1 bg-white">
        <Onboarding
            pages={[
                {
                backgroundColor: '#fff',
                image: (
                    <View>
                        <Text>Hello worlds</Text>
                    </View>
                ),
                title: 'Onboarding',
                subtitle: 'Done with React Native Onboarding Swiper',
                },
                {
                    backgroundColor: '#fff',
                    image: (
                        <View>
                            <Text>Hello worlds</Text>
                        </View>
                    ),
                    title: 'Onboarding',
                    subtitle: 'Done with React Native Onboarding Swiper',
                    },         
            ]}
        />
      </View>
  )
}