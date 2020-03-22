import React, { useState } from 'react'
import { View, Button, Picker, StyleSheet, Text, TextInput } from 'react-native'
import { Modal, Portal, Headline, Subheading } from 'react-native-paper'
import { useStore } from '../../context/StoreContext'

function SubmissionForm() {
  const [modalVisible, setModalVisible] = useState(false)
  const [symptomSeverity, setSymptomSeverity] = useState('')
  const [comments, setComments] = useState('')
  const store = useStore()
  return (
    <>
      <Portal>
        <Modal
          contentContainerStyle={{
            backgroundColor: 'white',
            height: 300,
            width: 380,
            alignSelf: 'center',
            justifyContent: 'flex-start'
          }}
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
        >
          <View style={{ padding: 10 }}>
            <Headline>
              <Text>Submit</Text>
            </Headline>
            <View style={{ paddingVertical: 5 }}>
              <Subheading>Symptoms Severity</Subheading>
              <Picker
                selectedValue={symptomSeverity}
                onValueChange={setSymptomSeverity}
              >
                {['Mild', 'Severe', 'Critical'].map(severity => (
                  <Picker.Item key={severity} label={severity} />
                ))}
              </Picker>
            </View>
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
            {store.location && (
              <View style={{ paddingVertical: 5 }}>
                <Text>lat: {store.location.coords.latitude}</Text>
                <Text>long: {store.location.coords.longitude}</Text>
              </View>
            )}
            <View style={{ paddingVertical: 5 }}>
              <Button
                accessibilityLabel="Send"
                contentStyle={{ width: 50 }}
                onPress={() => setModalVisible(true)}
                mode="outlined"
                title="Send"
              >
                <Text>Send</Text>
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
      <View
        style={{
          width: 200,
          position: 'absolute',
          bottom: 50,
          alignSelf: 'center',
          alignItems: 'center'
        }}
      >
        <Button
          accessibilityLabel="Make a submission"
          contentStyle={{ width: 50 }}
          onPress={() => setModalVisible(true)}
          mode="outlined"
          title="Make a submission"
        >
          <Text>Make a submission</Text>
        </Button>
      </View>
    </>
  )
}

export default SubmissionForm
