import { Text } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Header from './home/header'
import Body from './home/body'


export default function Home() {
  return (
    <SafeAreaView>
        <Header /> 
        <Body />         
    </SafeAreaView>   
  )
}