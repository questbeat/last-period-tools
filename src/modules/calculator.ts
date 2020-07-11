import * as Regalia from '../regalia'

const CalculatorActionType = {
  AddRegalia: 'CALC_ADD_REGALIA',
  RemoveRegalia: 'CALC_REMOVE_REGALIA',
  SetRegaliaDefinition: 'CALC_SET_REGALIA_DEFINITION',
  SetRegaliaLevel: 'CALC_SET_REGALIA_LEVEL',
  SetRegaliaRank: 'CALC_SET_REGALIA_RANK',
  SetRegaliaRarity: 'CALC_SET_REGALIA_RARITY',
  SetRegaliaUpgrade: 'CALC_SET_REGALIA_UPGRADE',
  SetRegalias: 'CALC_SET_REGALIAS',
} as const

export const addRegalia = () => ({
  type: CalculatorActionType.AddRegalia,
})

export const removeRegalia = (id: string) => ({
  type: CalculatorActionType.RemoveRegalia,
  payload: { id },
})

export const setRegaliaDefinition = (
  id: string,
  definition: Regalia.Definition
) => ({
  type: CalculatorActionType.SetRegaliaDefinition,
  payload: { id, definition },
})

export const setRegaliaLevel = (id: string, level: Regalia.Level) => ({
  type: CalculatorActionType.SetRegaliaLevel,
  payload: { id, level },
})

export const setRegaliaRank = (id: string, rank: Regalia.Rank) => ({
  type: CalculatorActionType.SetRegaliaRank,
  payload: { id, rank },
})

export const setRegaliaRarity = (id: string, rarity: Regalia.Rarity) => ({
  type: CalculatorActionType.SetRegaliaRarity,
  payload: { id, rarity },
})

export const setRegaliaUpgrade = (id: string, upgrade: Regalia.Upgrade) => ({
  type: CalculatorActionType.SetRegaliaUpgrade,
  payload: { id, upgrade },
})

export const setRegalias = (regalias: Regalia.Regalia[]) => ({
  type: CalculatorActionType.SetRegalias,
  payload: { regalias },
})

export type CalculatorAction = ReturnType<
  | typeof addRegalia
  | typeof removeRegalia
  | typeof setRegaliaDefinition
  | typeof setRegaliaLevel
  | typeof setRegaliaRank
  | typeof setRegaliaRarity
  | typeof setRegaliaUpgrade
  | typeof setRegalias
>

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
        (id) => id !== action.payload.id
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
          byId: Object.assign({}, ...regalias.map((r) => ({ [r.id]: r }))),
          allIds: regalias.map((r) => r.id),
        },
      }
    }

    default:
      return state
  }
}
