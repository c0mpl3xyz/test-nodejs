import { IOrder } from './interfaces/order_i'
import { Money } from '../../value_objects/money/money'

export class Order {
  private readonly id: string
  private readonly userId: string
  private readonly items: string[] // just product IDs
  private readonly createdAt: Date
  private status: 'pending' | 'paid' | 'shipped' | 'cancelled'
  private totalAmount: Money

  constructor(data: IOrder) {
    this.id = data.id
    this.userId = data.userId
    this.items = data.items
    this.createdAt = data.createdAt
    this.status = data.status
    this.totalAmount = data.totalAmount
  }

  getId(): string {
    return this.id
  }

  getUserId(): string {
    return this.userId
  }

  getStatus(): string {
    return this.status
  }

  getItems(): string[] {
    return this.items
  }

  getTotalAmount(): Money {
    return this.totalAmount
  }

  toObj(): IOrder {
    return {
      id: this.id,
      userId: this.userId,
      items: this.items,
      totalAmount: this.totalAmount,
      createdAt: this.createdAt,
      status: this.status
    }
  }
}
