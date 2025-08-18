// User object interface -> Repo layer
export interface IUser {
  id: string
  name: string
  email: string
  passwordHash: string
  createdAt: Date
}

// DTO - Data Transfer Object by DDD
// Used for sending data to third-party (infra) services. Kafka, REST etc.
export interface IUserCreateRequestDTO {
  id: string
  name: string
  email: string
  password: string
}

export interface IUserCreateResponseDTO {
  id: string
  name: string
  email: string
  createdAt: Date
}