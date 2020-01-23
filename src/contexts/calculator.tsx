import React from 'react'
import {
  CalculatorAction,
  CalculatorState,
  calculatorInitialState,
  calculatorReducer,
} from '../modules/calculator'

interface CalculatorContextProps {
  dispatch: React.Dispatch<CalculatorAction>
  state: CalculatorState
}

export const CalculatorContext = React.createContext<CalculatorContextProps>({
  dispatch: () => {},
  state: calculatorInitialState,
})

export const CalculatorContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    calculatorReducer,
    calculatorInitialState
  )

  return (
    <CalculatorContext.Provider value={{ dispatch, state }}>
      {children}
    </CalculatorContext.Provider>
  )
}
