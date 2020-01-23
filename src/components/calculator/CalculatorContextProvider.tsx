import React, { createContext, useReducer } from 'react'
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

export const CalculatorContext = createContext<CalculatorContextProps>({
  dispatch: () => {},
  state: initialState,
})

export const CalculatorContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState)

  return (
    <CalculatorContext.Provider value={{ dispatch, state }}>
      {children}
    </CalculatorContext.Provider>
  )
}
