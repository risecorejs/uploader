import { IOptions } from '../interfaces/index'

export type TMethods = 'single' | 'array' | 'fields' | 'none' | 'any'
export type TStorageTypes = 'diskStorage' | 'memoryStorage'
export type TOptions = IOptions & {
  method: TMethods
  args: any[]
  storage: {
    type: TStorageTypes
  }
}
