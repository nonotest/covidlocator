//@ts-nocheck

import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Surface, Text } from 'react-native-paper'
import {
  useStore,
  useDispatch,
  storeActions
} from '../../../context/StoreContext'

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function AuthStep({ navigation }) {
  // TODO: skip if already authenticated.
  const [fbAuthing, setFbAuthing] = useState(false)
  const [twiAuthing, setTwiAuthing] = useState(false)

  const dispatch = useDispatch()
  const store = useStore()
  const _authenticate = async (val, type) => {
    let set = () => {}
    if (type == 'twi') {
      set = setTwiAuthing
    } else {
      set = setFbAuthing
    }
    set(true)
    await timeout(1000)
    dispatch({
      type: storeActions.SET_AUTHENTICATION,
      payload: { authed: val }
    })
    set(false)
  }

  return (
    <View style={{ padding: 10, flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text>
          Please authenticate with at lease one provider. We won't use your
          details however we need to verify that you exists.{' '}
        </Text>

        <Surface style={{ marginVertical: 10 }}>
          <Button
            style={{ margin: 10 }}
            mode="outlined"
            loading={fbAuthing}
            onPress={async () => _authenticate(true, 'fb')}
          >
            <Text>Authenticate with Facebook</Text>
          </Button>
          <Button
            style={{ margin: 10 }}
            loading={twiAuthing}
            onPress={async () => _authenticate(true, 'twi')}
            mode="outlined"
          >
            <Text>Authenticate with Google</Text>
          </Button>
        </Surface>
      </View>
      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate('SubmissionModalStep2')
        }}
        disabled={store.authed === false}
      >
        <Text>Continue</Text>
      </Button>
    </View>
  )
}

export default AuthStep
