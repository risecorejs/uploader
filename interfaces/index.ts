import { TMethods, TStorageTypes } from '../types'

export interface IOptions {
  method?: TMethods
  args?: any[]
  storage?: {
    dist?: string
    type?: TStorageTypes
  }
  settings?: {
    maxSize?: number
    extensions?: string[]
  }
}
