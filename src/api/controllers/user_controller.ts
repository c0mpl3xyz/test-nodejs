import { Controller, Route, Get, Post, Path, Body, Tags } from 'tsoa'
import { Db } from 'mongodb'
import { UserService } from '../../services/user_service'
import { UserRepositoryImpl } from '../../infra/mongo_client/user_repository_impl'
import { IUserCreateRequestDTO, IUserCreateResponseDTO } from '../../domain/entities/user/interfaces/i_user'
import { User } from '../../domain/entities/user/user'

@Route('users')
@Tags('Users')
export class UserController extends Controller {
  private service: UserService
  private static db: Db

  // Static setter to inject MongoDB instance
  static injectDb(db: Db) {
    UserController.db = db
  }

  constructor() {
    super()
    if (!UserController.db) {
      throw new Error('MongoDB instance not injected')
    }
    const repo = new UserRepositoryImpl(UserController.db)
    this.service = new UserService(repo)
  }

  @Get('/')
  public async getAllUsers(): Promise<IUserCreateResponseDTO[]> {
    const users: User[] = await this.service.findAll()
    return users.map(u => u.toObj())
  }

  @Get('{id}')
  public async getUserById(@Path() id: string): Promise<IUserCreateResponseDTO> {
    const user = await this.service.findById(id)
    if (!user) throw new Error('User not found')
    return user.toObj()
  }

  @Post('/')
  public async createUser(@Body() body: IUserCreateRequestDTO): Promise<IUserCreateResponseDTO> {
    const user = await this.service.createUser(body)
    return user.toObj()
  }
}
