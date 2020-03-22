import React, { useState } from 'react'
import { Text, Dimensions } from 'react-native'
import Map from '../Map'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view'

const initialLayout = { width: Dimensions.get('window').width }

const LazyPlaceholder = ({ route }) => (
  <View style={styles.scene}>
    <Text>Loading {route.title}…</Text>
  </View>
)

function Main() {
  const [index, setIndex] = useState(0)
  const [routes, setRoutes] = useState([
    { key: 'map', title: 'Map' },
    { key: 'list', title: 'List' }
  ])

  return (
    <TabView
      lazy
      renderLazyPlaceholder={({ route }) => <LazyPlaceholder route={route} />}
      navigationState={{
        index,
        routes
      }}
      renderScene={SceneMap({
        map: () => <Map />,
        list: () => <Text>TTT</Text>
      })}
      onIndexChange={index => setIndex(index)}
      initialLayout={{ width: Dimensions.get('window').width }}
      style={styles.container}
    />
  )
}

export default Main
