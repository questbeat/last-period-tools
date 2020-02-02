import React, { createContext, useContext, useReducer } from 'react'
import * as Regalia from '../../regalia'
import {
  CalculatorAction,
  CalculatorState,
  calculatorReducer,
} from '../../modules/calculator'

const regalia = Regalia.createRegalia()
export const initialState: CalculatorState = {
  regalias: {
    byId: { [regalia.id]: regalia },
    allIds: [regalia.id],
  },
}

interface CalculatorContextProps {
  dispatch: React.Dispatch<CalculatorAction>
  state: CalculatorState
}

const CalculatorContext = createContext<CalculatorContextProps>({
  dispatch: () => {},
  state: initialState,
})

export const useCalculatorContext = () => useContext(CalculatorContext)

export const withCalculatorContext = <T extends {}>(
  Component: React.ComponentType<T>
): React.ComponentType<T> => props => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState)
  return (
    <CalculatorContext.Provider value={{ dispatch, state }}>
      <Component {...props} />
    </CalculatorContext.Provider>
  )
}
