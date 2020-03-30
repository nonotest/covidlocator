//@ts-nocheck

import React from 'react'
import { View } from 'react-native'
import { Button, Surface, Text } from 'react-native-paper'
import * as Location from 'expo-location'
import MapView from '../../RNMap'
import { generateClusters } from '../../../services/location'
import {
  useStore,
  storeActions,
  useDispatch
} from '../../../context/StoreContext'

function LocationStep({ navigation }) {
  const store = useStore()
  const dispatch = useDispatch()

  let content
  if (store.locPermission === false) {
    content = (
      <View>
        <Text>
          You have initially blocked access to your location. We need your
          permission to access your location and share your status. Unblock us
          in your permission settings and click Share. Example on chrome,
          navigate to chrome://settings/content/location
        </Text>
        <Button
          mode="contained"
          onPress={async () => {
            let location = await Location.getCurrentPositionAsync({})
            const clusters = generateClusters(location.coords)
            dispatch({
              type: storeActions.LOCATION_RECEIVED,
              payload: {
                location,
                locPermission: true,
                clusters
              }
            })
          }}
        >
          <Text>Share</Text>
        </Button>
      </View>
    )
  } else {
    content = (
      <View
        style={{
          width: 340,
          height: 200,
          justifyContent: 'center'
        }}
      >
        <MapView
          defaultZoom={13}
          region={store.location.coords}
          style={{ flex: 1 }}
          provider="google"
          options={{
            mapTypeControl: false,
            streetViewControl: false,
            zoomControl: false,
            fullscreenControl: false
          }}
        />
      </View>
    )
  }

  return (
    <View style={{ padding: 10, flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Surface style={{ padding: 10 }}>{content}</Surface>
      </View>
      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate('SubmissionModalStep4')
        }}
        disabled={store.locPermission === false}
      >
        <Text>Continue</Text>
      </Button>
    </View>
  )
}

export default LocationStep
