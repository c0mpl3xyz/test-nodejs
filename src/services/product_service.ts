import { Product } from '../domain/entities/product/product'
import { IProductRepository } from '../domain/entities/product/interfaces/product_repository_i'

export class ProductService {
  constructor(private repo: IProductRepository) {}

  async findById(id: string): Promise<Product | null> {
    return this.repo.findById(id)
  }

  async findAll(): Promise<Product[]> {
    return this.repo.findAll()
  }

  async createProduct(data: any): Promise<Product> {
    const product = new Product(data)
    await this.repo.save(product)
    return product
  }
}
