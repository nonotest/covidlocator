/**
 * Wraps the app
 */

import React from 'react'
import { View, StyleSheet } from 'react-native'
import Map from '../Map'

function Main() {
  return (
    <View style={styles.container}>
      <Map />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default Main
