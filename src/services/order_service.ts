import { IOrderRepository } from '../domain/entities/order/interfaces/order_repository_i'
import { Order } from '../domain/entities/order/order'
import { IOrder } from '../domain/entities/order/interfaces/order_i'

export class OrderService {
  constructor(private repo: IOrderRepository) {}

  async findAll(): Promise<Order[]> {
    return this.repo.findByUserId('') // optionally return all or filtered
  }

  async findById(id: string): Promise<Order | null> {
    return this.repo.findById(id)
  }

  async findByUserId(userId: string): Promise<Order[]> {
    return this.repo.findByUserId(userId)
  }

  async createOrder(data: IOrder): Promise<Order> {
    const order = new Order(data)
    await this.repo.save(order)
    return order
  }
}
