import { IProduct } from './interfaces/product_i'
import { Money } from '../../value_objects/money/money'

export class Product {
  private readonly id: string
  private readonly name: string
  private readonly description?: string
  private readonly price: Money
  private stock: number

  constructor (data: IProduct) {
    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.price = new Money(data.price) // VO
    if (data.stock < 0) throw new Error('Stock cannot be negative')
    this.stock = data.stock
  }

  getId (): string {
    return this.id
  }

  getName (): string {
    return this.name
  }

  getDescription (): string | undefined {
    return this.description
  }

  getPrice (): Money {
    return this.price
  }

  getStock (): number {
    return this.stock
  }

  decreaseStock (amount: number): Product {
    if (amount > this.stock) {
      throw new Error('Insufficient stock')
    }
    this.stock -= amount
    return this
  }

  increaseStock (amount: number): Product {
    if (amount < 0) {
      throw new Error('Amount cannot be negative')
    }
    this.stock += amount
    return this
  }

  toObj (): IProduct {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price.toObj(),
      stock: this.stock
    }
  }
}
