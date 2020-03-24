//@ts-nocheck

import React, { useState } from 'react'
import { View, Picker } from 'react-native'
import { Button, Text, Surface, useTheme } from 'react-native-paper'
import { useModalContext, useDispatch, modalActions } from '../context'

function getSeverityText(severity) {
  if (severity === 'mild') {
    return `Fever\nCough\nShortness of breath`
  } else if (severity === 'severe') {
    return `Trouble breathing \nPersistent pain or pressure in the chest \nNew confusion or inability to arouse \nBluish lips or face.`
  } else if (severity === 'critical') {
    return `I am already hospitalized`
  }
}

function SeverityStep({ navigation }) {
  const modalContext = useModalContext()
  const [symptomSeverity, setSymptomSeverity] = useState(modalContext.severity)
  const dispatch = useDispatch()
  const theme = useTheme()
  const severityText = getSeverityText(symptomSeverity)

  return (
    <View style={{ padding: 10, flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Picker
          selectedValue={symptomSeverity}
          onValueChange={setSymptomSeverity}
          /* might be itemstyle on native */
          style={{
            ...theme.fonts.medium,
            textTransform: 'capitalize',
            fontSize: 20
          }}
        >
          {['mild', 'severe', 'critical'].map(severity => (
            <Picker.Item key={severity} label={severity} />
          ))}
        </Picker>
        <Surface style={{ padding: 10, marginVertical: 10 }}>
          <Text style={{ ...theme.fonts.medium, fontSize: 20 }}>
            {severityText}
          </Text>
        </Surface>
      </View>
      <Button
        mode="contained"
        onPress={() => {
          dispatch({
            type: modalActions.SET_SEVERITY,
            payload: { severity: symptomSeverity }
          })
          navigation.navigate('SubmissionModalStep3')
        }}
      >
        <Text>Continue</Text>
      </Button>
    </View>
  )
}

export default SeverityStep
