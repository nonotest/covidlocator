//@ts-nocheck

import React from 'react'
import { View } from 'react-native'
import { Button, Surface, Text } from 'react-native-paper'

function AuthStep({ navigation }) {
  // TODO: skip if already authenticated.
  return (
    <View style={{ padding: 10, flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text>
          We won't use your details however we need to verify that you exists.{' '}
        </Text>

        <Surface style={{ marginVertical: 10 }}>
          <Button
            style={{ margin: 10 }}
            onPress={() => alert('todo')}
            mode="outlined"
          >
            <Text>Authenticate with Facebook</Text>
          </Button>
          <Button
            style={{ margin: 10 }}
            onPress={() => alert('todo')}
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
      >
        <Text>Continue</Text>
      </Button>
    </View>
  )
}

export default AuthStep
