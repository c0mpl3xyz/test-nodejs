import { IUser, IUserCreateRequestDTO } from './i_user' 
import { User } from '../user'
export interface IUserService {
  findAll(): Promise<User[]>                 // returns domain entities
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  createUser(data: IUserCreateRequestDTO): Promise<User>
  updateName(id: string, newName: string): Promise<User | null>
}
