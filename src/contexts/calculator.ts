import { createContext } from 'react'
import * as Regalia from '../regalia'

export type CalculatorContextProps = Partial<{
  removeRegalia: (id: string) => void
  setRegaliaDefinition: (id: string, definition: Regalia.Definition) => void
  setRegaliaLevel: (id: string, level: Regalia.Level) => void
  setRegaliaRank: (id: string, rank: Regalia.Rank) => void
  setRegaliaRarity: (id: string, rarity: Regalia.Rarity) => void
  setRegaliaUpgrade: (id: string, upgrade: Regalia.Upgrade) => void
}>

export const CalculatorContext = createContext<CalculatorContextProps>({})
