import BigNumber from 'bignumber.js'
import shortid from 'shortid'

export type Level = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
export type Rank = 'A' | 'B' | 'C' | 'S'
export type Rarity = 1 | 2 | 3 | 4
export type Upgrade = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

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

export const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const
export const ranks = ['C', 'B', 'A', 'S'] as const
export const rarities = [1, 2, 3, 4] as const
export const upgrades = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const

export const rankValues: { [key in Rank]: number } = {
  C: 1.0,
  B: 1.1,
  A: 1.2,
  S: 1.4,
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const definitions: Definition[] = require('./definitions.json')
definitions.sort((a, b) => {
  if (a.name < b.name) {
    return -1
  }
  if (a.name > b.name) {
    return 1
  }
  return 0
})
export { definitions }

export function floor(num: number, digits: number): number {
  const base = Math.pow(10, digits)
  return Math.floor(num * base) / base
}

export function computeValue(props: {
  ability: Ability
  level: Level
  rank: Rank
  rarity: Rarity
  upgrade: Upgrade
}): Value {
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
    .plus(
      max
        .minus(min)
        .times(level.minus(one))
        .dividedBy(nine)
    ) // レベル補正値
    .times(rank) // ランク補正値
    .times(one.plus(bonus.times(upgrade))) // 進化補正値

  return {
    ability: props.ability,
    value: value.toNumber(),
  }
}

export function computeValues(props: {
  definition: Definition
  level: Level
  rank: Rank
  rarity: Rarity
  upgrade: Upgrade
}): Value[] {
  const { definition, ...statuses } = props
  return props.definition.abilities.map(ability =>
    computeValue({
      ability,
      ...statuses,
    })
  )
}

export function getDisplayValue(res: Value, onlyValue = false): string {
  let value = res.value
  if (res.ability.type === 'percentage') value *= 100
  value = floor(value, res.ability.digits)

  let desc = ''
  if (!onlyValue) desc += `${res.ability.name} +`
  desc += `${value}`
  if (res.ability.type === 'percentage') desc += '%'

  return desc
}

export function createRegalia(): Regalia {
  return {
    id: shortid.generate(),
    definition: definitions[0],
    level: 10,
    rank: 'C',
    rarity: 1,
    upgrade: 1,
  }
}
