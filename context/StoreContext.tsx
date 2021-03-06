import React, { Dispatch, createContext, useContext, useEffect } from 'react'
import * as Location from 'expo-location'
import { markers } from '../mock/markers'

export interface StoreProviderProps {
  children?: React.ReactNode
}
export interface StoreProviderState {
  location: Location.LocationData
  markers: { data: Array<Object> }
  clusters: { data: Array<Object> }
  authed: boolean
  locPermission: boolean
  submitted: boolean
}

function getInitialStore(): StoreProviderState {
  return {
    location: null,
    markers,
    clusters: { data: [] },
    authed: false,
    locPermission: false,
    submitted: false
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
  SET_AUTHENTICATION: 'SET_AUTHENTICATION',
  SET_SUBMITTED: 'SET_SUBMITTED',
  UPDATE_CLUSTERS_AUTO: 'UPDATE_CLUSTERS_AUTO'
}

function storeReducer(
  state: StoreProviderState,
  action: Actions
): StoreProviderState {
  switch (action.type) {
    case storeActions.LOCATION_RECEIVED:
      return {
        ...state,
        ...action.payload
      }
    case storeActions.SET_AUTHENTICATION:
      return {
        ...state,
        authed: action.payload.authed
      }
    case storeActions.SET_SUBMITTED:
      return {
        ...state,
        submitted: action.payload.submitted
      }
    case storeActions.UPDATE_CLUSTERS_AUTO:
      return {
        ...state,
        clusters: { data: action.payload.clusters }
      }
    default:
      return state
  }
}
