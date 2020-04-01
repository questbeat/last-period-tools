import React, { createContext, useContext, useReducer } from 'react'
import * as Regalia from '../../regalia'
import { ChartAction, ChartState, chartReducer } from '../../modules/chart'

const initialState: ChartState = {
  definition: Regalia.definitions[0],
  rank: 'C',
}

interface ChartContextProps {
  dispatch: React.Dispatch<ChartAction>
  state: ChartState
}

export const ChartContext = createContext<ChartContextProps>({
  dispatch: () => {},
  state: initialState,
})

export const useChartContext = () => useContext(ChartContext)

export const withChartContext = <T extends {}>(
  Component: React.ComponentType<T>
): React.ComponentType<T> => (props) => {
  const [state, dispatch] = useReducer(chartReducer, initialState)
  return (
    <ChartContext.Provider value={{ dispatch, state }}>
      <Component {...props} />
    </ChartContext.Provider>
  )
}
