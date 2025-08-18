import { Product } from '../product'

export interface IProductRepository {
  findById(id: string): Promise<Product | null>
  findAll(): Promise<Product[]>
  save(product: Product): Promise<void>
}
