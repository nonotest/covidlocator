// Paper throws ts errors so mute them lol

import React from 'react'
import { Modal, useTheme } from 'react-native-paper'
import { createStackNavigator } from '@react-navigation/stack'

import { ModalProvider } from './context'
import { useStore } from '../../context/StoreContext'
import SeverityStep from './SeverityStep/index'
import SocialStep from './SocialStep/index'
import AuthStep from './AuthStep/index'
import LocationStep from './LocationStep/index'
import FinalStep from './FinalStep'

const Stack = createStackNavigator()

function SubmissionModal({ navigation }) {
  const theme = useTheme()
  const store = useStore()

  return (
    <Modal
      contentContainerStyle={{
        position: 'absolute',
        top: 100,
        bottom: 200,
        backgroundColor: 'transparent',
        maxHeight: 400,
        width: 380,
        alignSelf: 'center',
        justifyContent: 'flex-start'
      }}
      visible
      onDismiss={() => navigation.navigate('Main')}
    >
      <ModalProvider>
        <Stack.Navigator
          screenOptions={{
            headerTintColor: theme.colors.text
          }}
        >
          {store.authed === false && (
            <Stack.Screen
              name="SubmissionModalStep1"
              component={AuthStep}
              options={{ title: 'Step 1 - Authentication' }}
            />
          )}
          <Stack.Screen
            name="SubmissionModalStep2"
            component={SeverityStep}
            options={{ title: 'Step 2 - Severity' }}
          />
          <Stack.Screen
            name="SubmissionModalStep3"
            component={LocationStep}
            options={{ title: 'Step 3 - My Location' }}
          />
          <Stack.Screen
            name="SubmissionModalStep4"
            component={SocialStep}
            options={{ title: 'Step 4 - My Network' }}
          />
          <Stack.Screen
            name="SubmissionModalFinalStep"
            component={FinalStep}
            options={{ title: 'Summary' }}
          />
        </Stack.Navigator>
      </ModalProvider>
    </Modal>
  )
}

export default SubmissionModal

// return (

// )

/*
headerMode: 'none',
  mode: 'modal',
  transparentCard: true,
  cardStyle: { opacity: 1 }
<View style={{ paddingVertical: 5 }}>
                <Subheading>Additional Comments</Subheading>
                <TextInput
                  placeholder="Comments"
                  value={comments}
                  onChangeText={setComments}
                  multiline
                  numberOfLines={4}
                  style={{
                    borderWidth: StyleSheet.hairlineWidth,
                    borderColor: '#f0f0f0'
                  }}
                />
              </View>
              */
