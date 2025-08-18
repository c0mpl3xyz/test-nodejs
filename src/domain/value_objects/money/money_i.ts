import { ICurrency } from '../currency/currency_i'

export interface IMoney {
  amount: number
  currency: ICurrency
}
