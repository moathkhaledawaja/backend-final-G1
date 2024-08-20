import { Brand } from '../models'
import { InternalServerError } from '../Errors/InternalServerError'
import { brandRepository } from '../data-access'
import { injectable } from 'tsyringe'

@injectable()
export default class BrandService {
  public async ListBrands(): Promise<Brand[]> {
    try {
      const brands = await brandRepository.findAll()
      return brands
    } catch (ex) {
      console.log(ex)
      throw new InternalServerError()
    }
  }
}
