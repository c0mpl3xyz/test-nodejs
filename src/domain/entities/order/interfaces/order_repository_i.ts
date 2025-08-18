import { Order } from '../order'

export interface IOrderRepository {
  findById(id: string): Promise<Order | null>
  findByUserId(userId: string): Promise<Order[]>
  save(order: Order): Promise<void>
}
