import React from 'react'
import * as Regalia from '../regalia'

enum ChartActionType {
  SetDefinition = 'CHART_SET_DEFINITION',
  SetRank = 'CHART_SET_RANK',
}

export const setDefinition = (definition: Regalia.Definition) => ({
  type: ChartActionType.SetDefinition as const,
  payload: { definition },
})

export const setRank = (rank: Regalia.Rank) => ({
  type: ChartActionType.SetRank as const,
  payload: { rank },
})

export type ChartAction =
  | ReturnType<typeof setDefinition>
  | ReturnType<typeof setRank>

export interface ChartState {
  definition: Regalia.Definition
  rank: Regalia.Rank
}

export const chartReducer: React.Reducer<ChartState, ChartAction> = (
  state,
  action
) => {
  switch (action.type) {
    case ChartActionType.SetDefinition:
      return {
        ...state,
        definition: action.payload.definition,
      }

    case ChartActionType.SetRank:
      return {
        ...state,
        rank: action.payload.rank,
      }

    default:
      return state
  }
}
