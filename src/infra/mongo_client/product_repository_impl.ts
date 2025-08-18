// src/infra/mongo_client/product_repository_impl.ts
import { Db, ObjectId } from 'mongodb'
import { IProductRepository } from '../../domain/entities/product/interfaces/product_repository_i'
import { Product } from '../../domain/entities/product/product'

export class ProductRepositoryImpl implements IProductRepository {
  private collection

  constructor(private db: Db) {
    this.collection = db.collection('products')
  }

  async findById(id: string): Promise<Product | null> {
    const doc = await this.collection.findOne({ _id: new ObjectId(id) })
    if (!doc) return null
    return new Product({
      id: doc._id.toHexString(),
      name: doc.name,
      description: doc.description,
      price: doc.price,
      stock: doc.stock
    })
  }

  async findAll(): Promise<Product[]> {
    const docs = await this.collection.find().toArray()
    return docs.map(
      doc =>
        new Product({
          id: doc._id.toHexString(),
          name: doc.name,
          description: doc.description,
          price: doc.price,
          stock: doc.stock
        })
    )
  }

  async save(product: Product): Promise<void> {
    const obj = product.toObj()
    const _id = new ObjectId()

    await this.collection.updateOne(
      { _id },
      {
        $set: {
          name: obj.name,
          description: obj.description,
          price: obj.price,
          stock: obj.stock
        }
      },
      { upsert: true }
    )
  }
}
