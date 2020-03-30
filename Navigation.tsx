// Main is our main app screen
import React from 'react'
import SubmissionModal from './components/SubmissionModal'
import Main from './components/Main'

import { createStackNavigator } from '@react-navigation/stack'

const MainStack = createStackNavigator()
const RootStack = createStackNavigator()

function MainStackScreen() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Main"
        component={Main}
        options={{ header: () => null }}
      />
    </MainStack.Navigator>
  )
}

function Navigation() {
  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="Main"
        component={MainStackScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="SubmissionModal"
        component={SubmissionModal}
        options={{
          headerShown: false,
          cardStyle: {
            shadowRadius: 0,
            shadowOpacity: 0,
            backgroundColor: 'transparent'
          }
        }}
      />
    </RootStack.Navigator>
  )
}
export default Navigation
