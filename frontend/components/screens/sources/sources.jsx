import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from './header'
import Body from './body'

export default function Sources() {
  return (
    <SafeAreaView>
      <Header />
      <Body />
    </SafeAreaView>
  )
}