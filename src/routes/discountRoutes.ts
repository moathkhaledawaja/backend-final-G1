import { Router } from 'express'
import { container } from 'tsyringe'

import { DiscountController } from '../controllers'

const discountRouter = Router()
const discountController = container.resolve(DiscountController)

discountRouter.post(
  '/Add',
  discountController.AddDiscount.bind(discountController)
)

export default discountRouter
