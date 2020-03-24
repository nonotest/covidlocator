import React, { Dispatch, createContext, useContext, useEffect } from 'react'
import * as Location from 'expo-location'
import { clusters } from '../mock/clusters'
import { markers } from '../mock/markers'

export interface StoreProviderProps {
  children?: React.ReactNode
}
export interface StoreProviderState {
  location: Location.LocationData
  markers: { data: Array<Object> }
  clusters: { data: Array<Object> }
  authed: boolean
}

function getInitialStore(): StoreProviderState {
  return {
    location: null,
    markers,
    clusters,
    authed: false
  }
}

const StoreContext = createContext<StoreProviderState>(getInitialStore())
StoreContext.displayName = 'StoreContext'
const DispatchContext = createContext<Dispatch<Actions> | undefined>(undefined)

export function StoreProvider(props: StoreProviderProps) {
  const [state, dispatch] = React.useReducer(storeReducer, getInitialStore())

  return (
    <StoreContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </StoreContext.Provider>
  )
}

export const StoreConsumer = StoreContext.Consumer
;(StoreConsumer as any).displayName = 'StoreConsumer'

// useStoreState
export function useStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useCountState must be used within a StorePrivder')
  }
  return context
}

export function useDispatch() {
  const context = useContext(DispatchContext)
  if (context === undefined) {
    throw new Error('useDispatch must be used within a DispatchProvider')
  }
  return context
}

interface Actions {
  type: string
  payload: any
}

export const storeActions = {
  LOCATION_RECEIVED: 'LOCATION_RECEIVED',
  SET_AUTHENTICATION: 'SET_AUTHENTICATION'
}

function storeReducer(state: StoreProviderState, action): StoreProviderState {
  switch (action.type) {
    case storeActions.LOCATION_RECEIVED:
      return {
        ...state,
        location: action.payload.location
      }
    case storeActions.SET_AUTHENTICATION:
      return {
        ...state,
        authed: action.payload.authed
      }
    default:
      return state
  }
}
