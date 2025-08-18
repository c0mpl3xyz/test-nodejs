import { Currency } from '../currency/currency'
import { IMoney } from './money_i'
import { ICurrency } from '../currency/currency_i'

export class Money {
  private readonly amount: number
  private readonly currency: Currency

  constructor (data: IMoney) {
    if (data.amount < 0) {
      throw new Error('Amount cannot be negative')
    }
    this.amount = data.amount
    this.currency = new Currency(data.currency) // build Currency from ICurrency
  }

  public getAmount (): number {
    return this.amount
  }

  public getCurrency (): Currency {
    return this.currency
  }

  public getCurrencyObj (): ICurrency {
    return this.currency.toObj()
  }

  public toObj (): IMoney {
    return {
      amount: this.amount,
      currency: this.currency.toObj()
    }
  }
}
