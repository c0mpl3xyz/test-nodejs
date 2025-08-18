import { Controller, Route, Get, Post, Path, Body, Tags } from 'tsoa'
import { Db } from 'mongodb'
import { OrderService } from '../../services/order_service'
import { OrderRepositoryImpl } from '../../infra/mongo_client/order_repository_impl'
import { Order } from '../../domain/entities/order/order'
import { IOrder } from '../../domain/entities/order/interfaces/order_i'

@Route('orders')
@Tags('Orders')
export class OrderController extends Controller {
  private service: OrderService
  private static db: Db

  // Static setter to inject MongoDB instance
  static injectDb(db: Db) {
    OrderController.db = db
  }

  constructor() {
    super()
    if (!OrderController.db) {
      throw new Error('MongoDB instance not injected')
    }
    const repo = new OrderRepositoryImpl(OrderController.db)
    this.service = new OrderService(repo)
  }

  @Get('/')
  public async getAllOrders(): Promise<IOrder[]> {
    const orders: Order[] = await this.service.findAll()
    return orders.map(o => o.toObj())
  }

  @Get('{id}')
  public async getOrderById(@Path() id: string): Promise<IOrder> {
    const order = await this.service.findById(id)
    if (!order) throw new Error('Order not found')
    return order.toObj()
  }

  @Get('user/{userId}')
  public async getOrdersByUser(@Path() userId: string): Promise<IOrder[]> {
    const orders = await this.service.findByUserId(userId)
    return orders.map(o => o.toObj())
  }

  @Post('/')
  public async createOrder(@Body() body: IOrder): Promise<IOrder> {
    const order = await this.service.createOrder(body)
    return order.toObj()
  }
}
