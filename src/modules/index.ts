import { combineReducers } from 'redux'
import { Reducer } from 'redux'
import { calculatorInitialState, calculatorReducer } from './calculator'

export const rootReducer = combineReducers({
  calculator: calculatorReducer,
})

type StateType<T> = T extends Reducer<infer S> ? S : never
export type State = StateType<typeof rootReducer>

export const initialState: State = {
  calculator: calculatorInitialState,
}
