//@ts-nocheck

import React from 'react'
import { View } from 'react-native'
import { Button, Surface, Text } from 'react-native-paper'
import { useStore } from '../../../context/StoreContext'

function LocationStep({ navigation }) {
  const store = useStore()
  return (
    <View style={{ padding: 10, flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Surface style={{ padding: 10 }}>
          {store.location ? (
            <View style={{ paddingVertical: 5 }}>
              <Text>lat: {store.location.coords.latitude}</Text>
              <Text>long: {store.location.coords.longitude}</Text>
            </View>
          ) : (
            <Text>Button to allow location</Text>
          )}
        </Surface>
      </View>
      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate('SubmissionModalStep4')
        }}
      >
        <Text>Continute</Text>
      </Button>
    </View>
  )
}

export default LocationStep
