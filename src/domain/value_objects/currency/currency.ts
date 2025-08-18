import { ICurrency } from './currency_i'
import { CurrencyType } from './currency_enum'

export class Currency {
  private readonly currencyType: CurrencyType
  private currencyRate: number

  constructor (data: ICurrency) {
    this.currencyType = data.currencyName
    this.currencyRate = data.currencyRate
  }

  updateRate (newRate: number): void {
    if (newRate <= 0) {
      throw new Error('Currency rate must be a positive number')
    }
    this.currencyRate = newRate
  }

  updateCurrencyType (newRate: number): void {
    if (newRate <= 0) {
      throw new Error('Currency rate must be a positive number')
    }
    this.currencyRate = newRate
  }

  toObj (): ICurrency {
    return {
      currencyName: this.currencyType,
      currencyRate: this.currencyRate
    }
  }
}
