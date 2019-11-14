import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Redux from 'redux'
import { State } from '../modules'
import {
  CalculatorAction,
  calculatorInitialState,
  CalculatorState,
} from '../modules/calculator'

interface CalculatorContextProps {
  dispatch?: Redux.Dispatch<CalculatorAction>
  state: CalculatorState
}

export const CalculatorContext = React.createContext<CalculatorContextProps>({
  state: calculatorInitialState,
})

export const CalculatorContextProvider: React.FC = props => {
  const dispatch = useDispatch()
  const state = useSelector<State, CalculatorState>(state => state.calculator)

  return (
    <CalculatorContext.Provider value={{ dispatch, state }}>
      {props.children}
    </CalculatorContext.Provider>
  )
}
