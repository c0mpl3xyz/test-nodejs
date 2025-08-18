import { IMoney } from '../../../value_objects/money/money_i'

export interface IProduct {
  id: string
  name: string
  description?: string
  price: IMoney
  stock: number
}
