//@ts-nocheck

import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Text, Subheading, Surface, Switch } from 'react-native-paper'
import { useModalContext, useDispatch, modalActions } from '../context'

function SocialStep({ navigation }) {
  const modalContext = useModalContext()
  const dispatch = useDispatch()
  const [twitter, setTwitter] = useState(modalContext.social.twitter)
  const [facebook, setFacebook] = useState(modalContext.social.facebook)

  return (
    <View style={{ padding: 10, flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Surface style={{ padding: 10 }}>
          <Subheading>Allow my Facebook friends to see my status.</Subheading>
          <Switch onValueChange={setFacebook} value={facebook}></Switch>
          <Subheading>Allow my Twitter friends to see my status.</Subheading>
          <Switch onValueChange={setTwitter} value={twitter}></Switch>
        </Surface>
      </View>
      <Button
        mode="contained"
        onPress={() => {
          dispatch({
            type: modalActions.SET_SOCIAL,
            payload: { social: { twitter, facebook } }
          })
          navigation.navigate('SubmissionModalStep4')
        }}
      >
        <Text>Continue</Text>
      </Button>
    </View>
  )
}

export default SocialStep
