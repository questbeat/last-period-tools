import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Redux from 'redux'
import { State } from '../modules'
import { ChartAction, ChartState, chartInitialState } from '../modules/chart'

interface ChartContextProps {
  dispatch?: Redux.Dispatch<ChartAction>
  state: ChartState
}

export const ChartContext = React.createContext<ChartContextProps>({
  state: chartInitialState,
})

export const ChartContextProvider: React.FC = props => {
  const dispatch = useDispatch()
  const state = useSelector<State, ChartState>(state => state.chart)

  return (
    <ChartContext.Provider value={{ dispatch, state }}>
      {props.children}
    </ChartContext.Provider>
  )
}
