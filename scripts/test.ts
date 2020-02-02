import fs from 'fs'
import yaml from 'js-yaml'
import xlsx from 'xlsx'
import * as Regalia from '../src/regalia'

interface Mappings {
  [regaliaName: string]: {
    sheet: string
    ability: string
    type: Regalia.AbilityType
  }[]
}

const book = xlsx.readFile('data/regalia.xlsx')
const definitions: Regalia.Definition[] = JSON.parse(
  fs.readFileSync('src/definitions.json').toString()
)
const mappings: Mappings = yaml.safeLoad(
  fs.readFileSync('data/mappings.yml').toString()
)

Object.entries(mappings).forEach(([regaliaName, abilities]) => {
  const definition = definitions.find(d => d.name === regaliaName)
  if (!definition) return

  abilities.forEach(abilityData => {
    const { sheet: sheetName, ability: abilityName } = abilityData
    const ability = definition.abilities.find(a => a.name === abilityName)
    if (!ability) return

    const sheet = book.Sheets[sheetName]

    Regalia.ranks.forEach((rank, rankIndex) => {
      Regalia.rarities.forEach((rarity, rarityIndex) => {
        const upgrades = rarity < 4 ? [rarity - 1] : [3, 4, 5, 6, 7, 8, 9, 10]
        upgrades.forEach((upgrade, upgradeIndex) => {
          Regalia.levels.forEach((level, levelIndex) => {
            const row = 3 + 11 * rankIndex + rarityIndex + upgradeIndex
            const col = 5 + levelIndex
            const value = sheet[xlsx.utils.encode_cell({ r: row, c: col })].v

            const result = Regalia.computeValue({
              ability,
              level,
              rank,
              rarity,
              upgrade: upgrade as Regalia.Upgrade,
            })
            const expectedValue = Regalia.floor(value, ability.digits)
            const actualValue = Regalia.floor(result.value, ability.digits)

            if (actualValue !== expectedValue) {
              console.log(
                `${regaliaName} ${abilityName} ${rank} +${rarity} Lv.${level}:  ${expectedValue} / ${actualValue}`
              )
            }
          })
        })
      })
    })
  })
})
