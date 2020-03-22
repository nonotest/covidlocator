// @generated: @expo/next-adapter@2.0.14
import React from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import Head from 'next/head'
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper'

import Main from '../components/Main'

export default function App() {
  return (
    <PaperProvider theme={DefaultTheme}>
      {Platform.OS === 'web' && (
        <>
          <Head>
            <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC9oamWEM6EVkEEi0L45R58kBfVlYLQnPE"></script>
          </Head>
        </>
      )}
      <Main />
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    fontSize: 16
  }
})
