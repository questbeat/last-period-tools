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
const mappings: Mappings = yaml.safeLoad(fs.readFileSync('data/mappings.yml').toString())

const definitions: Regalia.Definition[] = Object.entries(mappings).map(([regaliaName, abilities]) => {
  const definition: Regalia.Definition = {
    name: regaliaName,
    abilities: [],
  }

  abilities.forEach(ability => {
    const { sheet: sheetName, ability: abilityName, type } = ability
    const sheet = book.Sheets[sheetName]
    const digits = (type === 'value') ? 0 : 1
    const baseValues: Regalia.BaseValue[] = [3, 4, 5, 6].map(row => ({
      min: sheet[xlsx.utils.encode_cell({ r: row, c: 17 })].v,
      max: sheet[xlsx.utils.encode_cell({ r: row, c: 26 })].v,
    }))

    definition.abilities.push({
      name: abilityName,
      type: type,
      digits: digits,
      baseValues: baseValues,
    })
  })

  return definition
})

fs.writeFileSync('src/definitions.json', JSON.stringify(definitions))
