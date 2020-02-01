import base64js from 'base64-js'
import shortid from 'shortid'
import * as msgpack from '@msgpack/msgpack'
import * as Regalia from '../regalia'

interface Parameters {
  name: string
  level: Regalia.Level
  rank: Regalia.Rank
  rarity: Regalia.Rarity
  upgrade: Regalia.Upgrade
}

const addBase64Padding = (code: string): string =>
  code.length % 4 === 0 ? code : code + '='.repeat(4 - (code.length % 4))

const makeUrlSafeBase64 = (code: string): string =>
  code
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')

const parametersFromRegalias = (regalias: Regalia.Regalia[]): Parameters[] =>
  regalias.map(regalia => ({
    name: regalia.definition.name,
    level: regalia.level,
    rank: regalia.rank,
    rarity: regalia.rarity,
    upgrade: regalia.upgrade,
  }))

const regaliasFromParameters = (paramsArray: Parameters[]): Regalia.Regalia[] =>
  paramsArray.map(params => {
    const definition = Regalia.definitionsByName[params.name]
    return {
      id: shortid.generate(),
      definition,
      level: params.level,
      rank: params.rank,
      rarity: params.rarity,
      upgrade: params.upgrade,
    }
  })

export const encodeRegalias = (regalias: Regalia.Regalia[]): string => {
  const params = parametersFromRegalias(regalias)
  const bytes = msgpack.encode(params)
  return makeUrlSafeBase64(base64js.fromByteArray(bytes))
}

export const decodeRegalias = (base64String: string): Regalia.Regalia[] => {
  const bytes = base64js.toByteArray(addBase64Padding(base64String))
  const params = msgpack.decode(bytes) as Parameters[]
  return regaliasFromParameters(params)
}
