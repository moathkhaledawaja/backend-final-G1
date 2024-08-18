import express from 'express'
import dotenv from 'dotenv'
import sequelize from './config/db'
import swaggerUI from 'swagger-ui-express'
import * as swaggerDocument from './swagger.json'
import {
  cartRouter,
  categoryRouter,
  productRouter,
  commentRouter,
  authRouter,
  userRouter,
  wishlistRouter,
} from './routes'
import cors from 'cors'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/api/wishlists', wishlistRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/comments', commentRouter)
const startServer = async () => {
  try {
    await sequelize.authenticate()
    console.log('Database connected!')
    // await sequelize.sync({ force: true });
    // console.log("Database synchronized!");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

startServer()
