import React, { Dispatch, createContext, useContext, useEffect } from 'react'

type Social = {
  facebook: boolean
  twitter: boolean
}

export interface ModalProviderProps {
  children?: React.ReactNode
}
export interface ModalProviderState {
  severity: string
  social: Social
}

function getInitialContext(): ModalProviderState {
  return {
    severity: 'mild',
    social: {
      facebook: false,
      twitter: false
    }
  }
}

const ModalContext = createContext<ModalProviderState>(getInitialContext())
ModalContext.displayName = 'SubmissionModalContext'

const DispatchContext = createContext<Dispatch<Actions> | undefined>(undefined)

export function ModalProvider(props: ModalProviderProps) {
  const [state, dispatch] = React.useReducer(modalReducer, getInitialContext())

  return (
    <ModalContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </ModalContext.Provider>
  )
}

export const ModalConsumer = ModalContext.Consumer
;(ModalConsumer as any).displayName = 'ModalConsumer'

// useModalState
export function useModalContext() {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useCountState must be used within a ModalProvider')
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

export const modalActions = {
  SET_SEVERITY: 'SET_SEVERITY'
}

function modalReducer(state: ModalProviderState, action): ModalProviderState {
  switch (action.type) {
    case modalActions.SET_SEVERITY:
      return {
        ...state,
        severity: action.payload.severity
      }
    default:
      return state
  }
}
