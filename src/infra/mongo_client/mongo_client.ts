// src/infra/mongo_client/mongo_client.ts
import { MongoClient, Db } from 'mongodb'

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27030'
const DB_NAME = process.env.MONGO_DB || 'my_database'
const REQUIRED_COLLECTIONS = ['users', 'products', 'orders']

export const mongoClient = new MongoClient(MONGO_URI)
let isConnected = false
let dbInstance: Db | null = null

export async function connectMongo(): Promise<Db> {
  if (isConnected && dbInstance) return dbInstance

  await mongoClient.connect()
  dbInstance = mongoClient.db(DB_NAME)
  isConnected = true
  console.log(`✅ MongoDB connected to database: ${DB_NAME}`)

  await ensureCollections(dbInstance)
  return dbInstance
}

async function ensureCollections(db: Db) {
  const existingCollections = await db.listCollections().toArray()
  const existingNames = existingCollections.map((c) => c.name)

  for (const name of REQUIRED_COLLECTIONS) {
    if (!existingNames.includes(name)) {
      await db.createCollection(name)
      console.log(`🟢 Collection created: ${name}`)
    }
  }
}
