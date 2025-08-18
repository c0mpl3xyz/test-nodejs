import { IUser } from './interfaces/i_user'

export class User {
  private readonly id: string
  private name: string
  private email: string
  private passwordHash: string
  private readonly createdAt: Date

  constructor (data: IUser) {
    this.id = data.id
    this.name = data.name
    this.email = data.email
    this.passwordHash = data.passwordHash
    this.createdAt = data.createdAt
  }

  getId (): string {
    return this.id
  }

  getName (): string {
    return this.name
  }

  getEmail (): string {
    return this.email
  }

  getCreatedAt (): Date {
    return this.createdAt
  }

  updateName (newName: string) {
    if (!newName || newName.trim() === '') {
      throw new Error('Name cannot be empty')
    }
    this.name = newName
  }

  updateEmail (newEmail: string) {
    if (!newEmail.includes('@')) {
      throw new Error('Invalid email address')
    }
    this.email = newEmail
  }

  updatePassword (newHash: string) {
    if (!newHash) {
      throw new Error('Password cannot be empty')
    }
    this.passwordHash = newHash
  }

  toObj (): IUser {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      passwordHash: this.passwordHash,
      createdAt: this.createdAt
    }
  }
}
