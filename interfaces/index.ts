import { TMethods, TStorageTypes } from '../types'

export interface IOptions {
  method?: TMethods
  args?: any[]
  settings?: {
    maxSize?: number
    extensions?: string[]
  }
  storage?: {
    dist?: string
    type?: TStorageTypes
  }
}
