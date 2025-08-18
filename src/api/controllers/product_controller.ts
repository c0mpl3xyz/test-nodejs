import { Controller, Route, Get, Post, Path, Body, Tags } from 'tsoa'
import { Db } from 'mongodb'
import { ProductService } from '../../services/product_service'
import { ProductRepositoryImpl } from '../../infra/mongo_client/product_repository_impl'
import { Product } from '../../domain/entities/product/product'
import { IProduct } from '../../domain/entities/product/interfaces/product_i'

@Route('products')
@Tags('Products')
export class ProductController extends Controller {
  private service: ProductService
  private static db: Db

  // Static setter to inject MongoDB instance
  static injectDb(db: Db) {
    ProductController.db = db
  }

  constructor() {
    super()
    if (!ProductController.db) {
      throw new Error('MongoDB instance not injected')
    }
    const repo = new ProductRepositoryImpl(ProductController.db)
    this.service = new ProductService(repo)
  }

  @Get('/')
  public async getAllProducts(): Promise<IProduct[]> {
    const products: Product[] = await this.service.findAll()
    return products.map(p => p.toObj())
  }

  @Get('{id}')
  public async getProductById(@Path() id: string): Promise<IProduct> {
    const product = await this.service.findById(id)
    if (!product) throw new Error('Product not found')
    return product.toObj()
  }

  @Post('/')
  public async createProduct(@Body() body: IProduct): Promise<IProduct> {
    const product = await this.service.createProduct(body)
    return product.toObj()
  }
}
