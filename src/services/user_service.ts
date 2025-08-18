import { IUserService } from '../domain/entities/user/interfaces/i_user_service'
import { IUserCreateRequestDTO } from '../domain/entities/user/interfaces/i_user'
import { IUserRepository } from '../domain/entities/user/interfaces/i_user_repository'
import { User } from '../domain/entities/user/user'

export class UserService implements IUserService {
  constructor(private repo: IUserRepository) {}

  async findAll(): Promise<User[]> {
    return this.repo.findAll()
  }

  async findById(id: string): Promise<User | null> {
    return this.repo.findById(id)
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repo.findByEmail(email)
  }

  async createUser(data: IUserCreateRequestDTO): Promise<User> {
    const user = new User({
      id: data.id,
      name: data.name,
      email: data.email,
      passwordHash: data.password, // hash if needed
      createdAt: new Date()
    })

    await this.repo.save(user)
    return user
  }

  async updateName(id: string, newName: string): Promise<User | null> {
    const user = await this.repo.findById(id)
    if (!user) return null

    user.updateName(newName)
    await this.repo.save(user)
    return user
  }
}
