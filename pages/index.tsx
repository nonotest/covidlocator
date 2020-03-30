// @generated: @expo/next-adapter@2.0.14
import 'react-native-gesture-handler'
import React from 'react'
import Head from 'next/head'
import getConfig from 'next/config'

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

import { StoreProvider } from '../context/StoreContext'
import Navigation from './Navigation'

const CombinedDarkTheme = { ...PaperDarkTheme, ...NavigationDarkTheme }
// const CombinedLightTheme = { ...PaperLightTheme, ...NavigationLightTheme }

export default function App() {
  let gmap
  if (process.env.NODE_ENV !== 'production') {
    const { publicRuntimeConfig } = getConfig()
    const { GOOGLE_MAP_API_KEY } = publicRuntimeConfig
    gmap = GOOGLE_MAP_API_KEY
  } else {
    gmap = process.env.GOOGLE_MAP_API_KEY
  }
  return (
    <StoreProvider>
      <PaperProvider theme={PaperDarkTheme}>
        <NavigationContainer theme={CombinedDarkTheme}>
          <Head>
            <script
              key={new Date().toLocaleTimeString()}
              src={`https://maps.googleapis.com/maps/api/js?key=${gmap}`}
            ></script>
          </Head>
          <Navigation />
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  )
}
