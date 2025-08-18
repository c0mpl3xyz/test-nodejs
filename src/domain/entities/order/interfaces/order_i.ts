import { Money } from "../../../value_objects/money/money"

export interface IOrder {
  id: string
  userId: string
  items: string[]
  totalAmount: Money
  createdAt: Date
  status: 'pending' | 'paid' | 'shipped' | 'cancelled'
}