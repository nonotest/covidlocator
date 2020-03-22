import React, { useState } from 'react'
import { StatusBar, View, StyleSheet, Text, Dimensions } from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view'

import SubmissionForm from '../SubmissionForm'
import Map from '../Map'

const initialLayout = { width: Dimensions.get('window').width }

const MapScene = () => (
  <View
    style={{
      flex: 1
    }}
  >
    <Map />
    <SubmissionForm />
  </View>
)
const ListScene = () => (
  <View
    style={{
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <Text>TTT</Text>
  </View>
)

function Main() {
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'map', title: 'Map' }
    // { key: 'list', title: 'List' }
  ])

  const renderScene = SceneMap({
    map: MapScene,
    listl: null, // hack
    list: ListScene
  })

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={{ marginTop: StatusBar.currentHeight, flex: 1 }}
    />
  )
}

const styles = StyleSheet.create({
  scene: {
    flex: 1
  }
})

export default Main
