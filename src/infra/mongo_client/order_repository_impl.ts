import { Db, ObjectId } from 'mongodb'
import { IOrderRepository } from '../../domain/entities/order/interfaces/order_repository_i'
import { Order } from '../../domain/entities/order/order'
import { Money } from '../../domain/value_objects/money/money'

export class OrderRepositoryImpl implements IOrderRepository {
  private collection

  constructor(private db: Db) {
    this.collection = db.collection('orders')
  }

  async findById(id: string): Promise<Order | null> {
    const doc = await this.collection.findOne({ _id: new ObjectId(id) })
    if (!doc) return null

    return new Order({
      id: doc._id.toHexString(),
      userId: doc.userId,
      items: doc.items, // string[]
      totalAmount: new Money(doc.totalAmount),
      status: doc.status,
      createdAt: doc.createdAt
    })
  }

  async findByUserId(userId: string): Promise<Order[]> {
    const docs = await this.collection.find({ userId }).toArray()
    return docs.map(doc => new Order({
      id: doc._id.toHexString(),
      userId: doc.userId,
      items: doc.items,
      totalAmount: new Money(doc.totalAmount),
      status: doc.status,
      createdAt: doc.createdAt
    }))
  }

  async save(order: Order): Promise<void> {
    const _id = order.getId() ? new ObjectId(order.getId()) : new ObjectId()

    await this.collection.updateOne(
      { _id },
      {
        $set: {
          userId: order.getUserId(),
          items: order.getItems(), // string[]
          totalAmount: order.getTotalAmount().toObj(),
          status: order.getStatus(),
          createdAt: new Date()
        }
      },
      { upsert: true }
    )
  }
}
