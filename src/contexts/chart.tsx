import React from 'react'
import {
  ChartAction,
  ChartState,
  chartInitialState,
  chartReducer,
} from '../modules/chart'

interface ChartContextProps {
  dispatch: React.Dispatch<ChartAction>
  state: ChartState
}

export const ChartContext = React.createContext<ChartContextProps>({
  dispatch: () => {},
  state: chartInitialState,
})

export const ChartContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(chartReducer, chartInitialState)

  return (
    <ChartContext.Provider value={{ dispatch, state }}>
      {children}
    </ChartContext.Provider>
  )
}
