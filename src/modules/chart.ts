import * as Regalia from '../regalia'

enum ActionType {
  SetDefinition = 'CHART_SET_DEFINITION',
  SetRank       = 'CHART_SET_RANK',
}

export function setDefinition(definition: Regalia.Definition) {
  return {
    type: ActionType.SetDefinition as const,
    payload: { definition },
  }
}

export function setRank(rank: Regalia.Rank) {
  return {
    type: ActionType.SetRank as const,
    payload: { rank },
  }
}

export type Action = (
  | ReturnType<typeof setDefinition>
  | ReturnType<typeof setRank>
)

export interface ChartState {
  definition: Regalia.Definition
  rank: Regalia.Rank
}

export const chartInitialState: ChartState = {
  definition: Regalia.definitions[0],
  rank: 'C',
}

export function chartReducer(
  state = chartInitialState,
  action: Action
): ChartState {
  switch (action.type) {
    case ActionType.SetDefinition:
      return {
        ...state,
        definition: action.payload.definition,
      }

    case ActionType.SetRank:
      return {
        ...state,
        rank: action.payload.rank,
      }

    default:
      return state
  }
}
