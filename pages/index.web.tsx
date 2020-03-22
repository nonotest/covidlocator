// @generated: @expo/next-adapter@2.0.14
import React from 'react'
import { StyleSheet, View } from 'react-native'
import Head from 'next/head'
import Main from '../components/Main'

export default function App() {
  return (
    <>
      <Head>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC9oamWEM6EVkEEi0L45R58kBfVlYLQnPE"></script>
      </Head>
      <View style={styles.container}>
        <Main />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 16
  }
})
