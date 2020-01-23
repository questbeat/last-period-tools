import * as Regalia from '../regalia'

enum CalculatorActionType {
  AddRegalia = 'CALC_ADD_REGALIA',
  RemoveRegalia = 'CALC_REMOVE_REGALIA',
  SetRegaliaDefinition = 'CALC_SET_REGALIA_DEFINITION',
  SetRegaliaLevel = 'CALC_SET_REGALIA_LEVEL',
  SetRegaliaRank = 'CALC_SET_REGALIA_RANK',
  SetRegaliaRarity = 'CALC_SET_REGALIA_RARITY',
  SetRegaliaUpgrade = 'CALC_SET_REGALIA_UPGRADE',
  SetRegalias = 'CALC_SET_REGALIAS',
}

export function addRegalia() {
  return {
    type: CalculatorActionType.AddRegalia as const,
  }
}

export function removeRegalia(id: string) {
  return {
    type: CalculatorActionType.RemoveRegalia as const,
    payload: { id },
  }
}

export function setRegaliaDefinition(
  id: string,
  definition: Regalia.Definition
) {
  return {
    type: CalculatorActionType.SetRegaliaDefinition as const,
    payload: { id, definition },
  }
}

export function setRegaliaLevel(id: string, level: Regalia.Level) {
  return {
    type: CalculatorActionType.SetRegaliaLevel as const,
    payload: { id, level },
  }
}

export function setRegaliaRank(id: string, rank: Regalia.Rank) {
  return {
    type: CalculatorActionType.SetRegaliaRank as const,
    payload: { id, rank },
  }
}

export function setRegaliaRarity(id: string, rarity: Regalia.Rarity) {
  return {
    type: CalculatorActionType.SetRegaliaRarity as const,
    payload: { id, rarity },
  }
}

export function setRegaliaUpgrade(id: string, upgrade: Regalia.Upgrade) {
  return {
    type: CalculatorActionType.SetRegaliaUpgrade as const,
    payload: { id, upgrade },
  }
}

export function setRegalias(regalias: Regalia.Regalia[]) {
  return {
    type: CalculatorActionType.SetRegalias as const,
    payload: { regalias },
  }
}

export type CalculatorAction =
  | ReturnType<typeof addRegalia>
  | ReturnType<typeof removeRegalia>
  | ReturnType<typeof setRegaliaDefinition>
  | ReturnType<typeof setRegaliaLevel>
  | ReturnType<typeof setRegaliaRank>
  | ReturnType<typeof setRegaliaRarity>
  | ReturnType<typeof setRegaliaUpgrade>
  | ReturnType<typeof setRegalias>

export interface CalculatorState {
  regalias: {
    byId: {
      [key: string]: Regalia.Regalia
    }
    allIds: string[]
  }
}

export const calculatorReducer: React.Reducer<
  CalculatorState,
  CalculatorAction
> = (state, action) => {
  switch (action.type) {
    case CalculatorActionType.AddRegalia: {
      const regalia = Regalia.createRegalia()

      return {
        ...state,
        regalias: {
          ...state.regalias,
          byId: {
            ...state.regalias.byId,
            [regalia.id]: regalia,
          },
          allIds: [...state.regalias.allIds, regalia.id],
        },
      }
    }

    case CalculatorActionType.RemoveRegalia: {
      const { [action.payload.id]: value, ...byIds } = state.regalias.byId
      const allIds = state.regalias.allIds.filter(
        id => id !== action.payload.id
      )

      return {
        ...state,
        regalias: {
          ...state.regalias,
          byId: byIds,
          allIds: allIds,
        },
      }
    }

    case CalculatorActionType.SetRegaliaDefinition:
      return {
        ...state,
        regalias: {
          ...state.regalias,
          byId: {
            ...state.regalias.byId,
            [action.payload.id]: {
              ...state.regalias.byId[action.payload.id],
              definition: action.payload.definition,
            },
          },
        },
      }

    case CalculatorActionType.SetRegaliaLevel:
      return {
        ...state,
        regalias: {
          ...state.regalias,
          byId: {
            ...state.regalias.byId,
            [action.payload.id]: {
              ...state.regalias.byId[action.payload.id],
              level: action.payload.level,
            },
          },
        },
      }

    case CalculatorActionType.SetRegaliaRank:
      return {
        ...state,
        regalias: {
          ...state.regalias,
          byId: {
            ...state.regalias.byId,
            [action.payload.id]: {
              ...state.regalias.byId[action.payload.id],
              rank: action.payload.rank,
            },
          },
        },
      }

    case CalculatorActionType.SetRegaliaRarity:
      return {
        ...state,
        regalias: {
          ...state.regalias,
          byId: {
            ...state.regalias.byId,
            [action.payload.id]: {
              ...state.regalias.byId[action.payload.id],
              rarity: action.payload.rarity,
            },
          },
        },
      }

    case CalculatorActionType.SetRegaliaUpgrade:
      return {
        ...state,
        regalias: {
          ...state.regalias,
          byId: {
            ...state.regalias.byId,
            [action.payload.id]: {
              ...state.regalias.byId[action.payload.id],
              upgrade: action.payload.upgrade,
            },
          },
        },
      }

    case CalculatorActionType.SetRegalias: {
      const regalias = action.payload.regalias

      return {
        ...state,
        regalias: {
          ...state.regalias,
          byId: Object.assign({}, ...regalias.map(r => ({ [r.id]: r }))),
          allIds: regalias.map(r => r.id),
        },
      }
    }

    default:
      return state
  }
}
