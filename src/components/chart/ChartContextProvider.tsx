import React, { createContext, useReducer } from 'react'
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

export const ChartContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(chartReducer, initialState)

  return (
    <ChartContext.Provider value={{ dispatch, state }}>
      {children}
    </ChartContext.Provider>
  )
}
