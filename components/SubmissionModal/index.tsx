// Paper throws ts errors so mute them lol

import React from 'react'
import { Modal } from 'react-native-paper'
import { createStackNavigator } from '@react-navigation/stack'

import { ModalProvider } from './context'

import SeverityStep from './SeverityStep/index'
import SocialStep from './SocialStep/index'
import AuthStep from './AuthStep/index'

const Stack = createStackNavigator()

function SubmissionModal({ navigation }) {
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
        <Stack.Navigator>
          <Stack.Screen
            name="SubmissionModalStep1"
            component={AuthStep}
            options={{ title: 'Step 1 - Authentication' }}
          />
          <Stack.Screen
            name="SubmissionModalStep2"
            component={SeverityStep}
            options={{ title: 'Step 2 - Severity' }}
          />
          <Stack.Screen
            name="SubmissionModalStep3"
            component={SocialStep}
            options={{ title: 'Step 3 - My Network' }}
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
