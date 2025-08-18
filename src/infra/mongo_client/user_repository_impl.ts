// src/infra/mongo_client/user_repository_impl.ts
import { Db, ObjectId } from 'mongodb'
import { IUserRepository } from '../../domain/entities/user/interfaces/i_user_repository'
import { User } from '../../domain/entities/user/user'
import { IUser } from '../../domain/entities/user/interfaces/i_user'

export class UserRepositoryImpl implements IUserRepository {
  private collection

  constructor(private db: Db) {
    this.collection = db.collection('users')
  }

  async findById(id: string): Promise<User | null> {
    const doc = await this.collection.findOne({ _id: new ObjectId(id) })
    if (!doc) return null
    return new User({
      id: doc._id.toHexString(),
      name: doc.name,
      email: doc.email,
      passwordHash: doc.passwordHash,
      createdAt: doc.createdAt
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    const doc = await this.collection.findOne({ email })
    if (!doc) return null
    return new User({
      id: doc._id.toHexString(),
      name: doc.name,
      email: doc.email,
      passwordHash: doc.passwordHash,
      createdAt: doc.createdAt
    })
  }

  async save(user: User): Promise<void> {
    const obj = user.toObj()
    const _id = new ObjectId()
    await this.collection.updateOne(
      { _id },
      {
        $set: {
          name: obj.name,
          email: obj.email,
          passwordHash: obj.passwordHash,
          createdAt: obj.createdAt
        }
      },
      { upsert: true }
    )
  }

  async findAll(): Promise<User[]> {
    const docs = await this.collection.find().toArray()
    return docs.map(
      doc =>
        new User({
          id: doc._id.toHexString(),
          name: doc.name,
          email: doc.email,
          passwordHash: doc.passwordHash,
          createdAt: doc.createdAt
        })
    )
  }

  async toObj(): Promise<IUser> {
    throw new Error('toObj() is not supported in repository layer')
  }
}
