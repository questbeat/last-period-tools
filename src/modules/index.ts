import { combineReducers } from 'redux'
import { Reducer } from 'redux'
import { calculatorInitialState, calculatorReducer } from './calculator'
import { chartInitialState, chartReducer } from './chart'

export const rootReducer = combineReducers({
  calculator: calculatorReducer,
  chart: chartReducer,
})

type StateType<T> = T extends Reducer<infer S> ? S : never
export type State = StateType<typeof rootReducer>

export const initialState: State = {
  calculator: calculatorInitialState,
  chart: chartInitialState,
}
