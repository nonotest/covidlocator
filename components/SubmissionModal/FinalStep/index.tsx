//@ts-nocheck

import React from 'react'
import { View } from 'react-native'
import { Button, Surface, Text } from 'react-native-paper'
import { useDispatch, storeActions } from '../../../context/StoreContext'
function FinalStep({ navigation }) {
  const dispatch = useDispatch()

  return (
    <View style={{ padding: 10, flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Surface style={{ padding: 10 }}>
          <Text>Summary is displayed...</Text>
        </Surface>
      </View>
      <Button
        mode="contained"
        onPress={() => {
          dispatch({
            type: storeActions.SET_SUBMITTED,
            payload: { authed: true }
          })
          navigation.navigate('Main')
        }}
      >
        <Text>Finish</Text>
      </Button>
    </View>
  )
}

export default FinalStep
