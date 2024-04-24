import { Text } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Header from './home/header'


export default function Home() {
  return (
    <SafeAreaProvider>
        <SafeAreaView>
            <Header />          
        </SafeAreaView>   
    </SafeAreaProvider>
  )
}