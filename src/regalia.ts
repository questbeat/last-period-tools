import BigNumber from 'bignumber.js'
import shortid from 'shortid'
import _definitions from './definitions.json'

export const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const
export const ranks = ['C', 'B', 'A', 'S'] as const
export const rarities = [1, 2, 3, 4] as const
export const upgrades = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const

export type Level = typeof levels[number]
export type Rank = typeof ranks[number]
export type Rarity = typeof rarities[number]
export type Upgrade = typeof upgrades[number]

export interface BaseValue {
  min: number
  max: number
}

export type AbilityType = 'value' | 'percentage'

export interface Ability {
  name: string
  type: AbilityType
  digits: number
  baseValues: BaseValue[]
}

export interface Definition {
  name: string
  abilities: Ability[]
}

export interface Value {
  ability: Ability
  value: number
}

export interface Regalia {
  id: string
  definition: Definition
  level: Level
  rank: Rank
  rarity: Rarity
  upgrade: Upgrade
}

export const rankValues: { [key in Rank]: number } = {
  C: 1.0,
  B: 1.1,
  A: 1.2,
  S: 1.4,
}

export const definitions = Array.from(_definitions).sort((a, b) => {
  if (a.name < b.name) return -1
  if (a.name > b.name) return 1
  return 0
}) as Definition[]

export const definitionsByName: {
  [key: string]: Definition
} = Object.fromEntries(definitions.map((d) => [d.name, d]))

export const floor = (num: number, digits: number) => {
  const base = Math.pow(10, digits)
  return Math.floor(num * base) / base
}

export const computeValue = (props: {
  ability: Ability
  level: Level
  rank: Rank
  rarity: Rarity
  upgrade: Upgrade
}): Value => {
  const base = props.ability.baseValues[props.rarity - 1]

  // number型で計算すると誤差が生じるため、BigNumberで計算します
  // const value = (
  //     base.min // 基礎能力値
  //     + (base.max - base.min) * (props.level - 1) / 9 // レベル補正値
  //   )
  //   * rankValue                   // ランク補正値
  //   * (1 + 0.045 * props.upgrade) // 進化補正値

  const one = new BigNumber(1)
  const nine = new BigNumber(9)
  const bonus = new BigNumber(0.045)
  const min = new BigNumber(base.min)
  const max = new BigNumber(base.max)
  const rank = new BigNumber(rankValues[props.rank])
  const upgrade = new BigNumber(props.upgrade)
  const level = new BigNumber(props.level)

  const value = min // 基礎能力値
    .plus(max.minus(min).times(level.minus(one)).dividedBy(nine)) // レベル補正値
    .times(rank) // ランク補正値
    .times(one.plus(bonus.times(upgrade))) // 進化補正値

  return {
    ability: props.ability,
    value: value.toNumber(),
  }
}

export const computeValues = (props: {
  definition: Definition
  level: Level
  rank: Rank
  rarity: Rarity
  upgrade: Upgrade
}): Value[] => {
  const { definition, ...statuses } = props
  return props.definition.abilities.map((ability) =>
    computeValue({
      ability,
      ...statuses,
    })
  )
}

export const getDisplayValue = (res: Value, onlyValue = false) => {
  let value = res.value
  if (res.ability.type === 'percentage') value *= 100
  value = floor(value, res.ability.digits)

  let desc = ''
  if (!onlyValue) desc += `${res.ability.name} +`
  desc += `${value}`
  if (res.ability.type === 'percentage') desc += '%'

  return desc
}

export const createRegalia = (): Regalia => ({
  id: shortid.generate(),
  definition: definitions[0],
  level: 10,
  rank: 'C',
  rarity: 1,
  upgrade: 1,
})
