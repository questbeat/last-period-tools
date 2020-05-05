import base64js from 'base64-js'
import shortid from 'shortid'
import * as msgpack from '@msgpack/msgpack'
import * as Regalia from './regalia'

type Parameters = [
  string,
  Regalia.Level,
  Regalia.Rank,
  Regalia.Rarity,
  Regalia.Upgrade
]

const addBase64Padding = (code: string): string =>
  code.length % 4 === 0 ? code : code + '='.repeat(4 - (code.length % 4))

const makeUrlSafeBase64 = (code: string): string =>
  code.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

const parametersFromRegalias = (regalias: Regalia.Regalia[]): Parameters[] =>
  regalias.map((r) => [r.definition.name, r.level, r.rank, r.rarity, r.upgrade])

const regaliasFromParameters = (paramsArray: Parameters[]): Regalia.Regalia[] =>
  paramsArray.map((params) => {
    const [name, level, rank, rarity, upgrade] = params
    return {
      id: shortid.generate(),
      definition: Regalia.definitionsByName[name],
      level,
      rank,
      rarity,
      upgrade,
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
