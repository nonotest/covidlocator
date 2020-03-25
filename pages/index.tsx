// @generated: @expo/next-adapter@2.0.14
import 'react-native-gesture-handler'
import React from 'react'
import { enableScreens } from 'react-native-screens'
import { Platform } from 'react-native'
import Head from 'next/head'
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperLightTheme
} from 'react-native-paper'
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationLightTheme
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { StoreProvider } from '../context/StoreContext'
import SubmissionModal from '../components/SubmissionModal'

// Main is our main app screen
import Main from '../components/Main'

enableScreens()

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

const CombinedDarkTheme = { ...PaperDarkTheme, ...NavigationDarkTheme }
// const CombinedLightTheme = { ...PaperLightTheme, ...NavigationLightTheme }

export default function App() {
  return (
    <StoreProvider>
      <PaperProvider theme={PaperDarkTheme}>
        <NavigationContainer theme={CombinedDarkTheme}>
          {Platform.OS === 'web' && (
            <>
              <Head>
                <script
                  key={new Date().toLocaleTimeString()}
                  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC9oamWEM6EVkEEi0L45R58kBfVlYLQnPE"
                ></script>
              </Head>
            </>
          )}
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
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  )
}
