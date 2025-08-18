import express from 'express'
import bodyParser from 'body-parser'
import swaggerUi from 'swagger-ui-express'
import { RegisterRoutes } from './api/routes/routes'
import * as swaggerDocument from './api/swagger/swagger.json'
import { connectMongo } from './infra/mongo_client/mongo_client'
import { UserController } from './api/controllers/user_controller'
import { ProductController } from './api/controllers/product_controller'
import { OrderController } from './api/controllers/order_controller'

const app = express()
app.use(bodyParser.json())

async function bootstrap() {
  const db = await connectMongo()
  UserController.injectDb(db) // inject DB before routes are used
  ProductController.injectDb(db) // inject DB before routes are used
  OrderController.injectDb(db) // inject DB before routes are used

  RegisterRoutes(app)
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

  app.listen(3005, () => {
    console.log('Server running on http://localhost:3005')
    console.log('Swagger UI available at http://localhost:3005/docs')
  })
}

bootstrap()
