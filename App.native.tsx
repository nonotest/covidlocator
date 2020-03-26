import 'react-native-gesture-handler'
import React from 'react'
import { enableScreens } from 'react-native-screens'
import { StyleSheet, SafeAreaView } from 'react-native'

import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperLightTheme
} from 'react-native-paper'
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationLightTheme
} from '@react-navigation/native'

import { StoreProvider } from './context/StoreContext'
import Navigation from './Navigation'

const CombinedDarkTheme = { ...PaperDarkTheme, ...NavigationDarkTheme }

enableScreens()

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StoreProvider>
        <PaperProvider theme={PaperDarkTheme}>
          <NavigationContainer theme={CombinedDarkTheme}>
            <Navigation />
          </NavigationContainer>
        </PaperProvider>
      </StoreProvider>
    </SafeAreaView>
  )
}
