import { supbaseClient } from '../../config/Storage'
import { Buffer } from 'buffer'
import fs from 'fs'
export const ReadAllImage = async (path: string, image: any) => {
  try {
    // console.log(image)
    // const { data, error } = await supbaseClient.storage
    //   .from('Storage')
    //   .upload('images/image.png', JSON.stringify(image))

    const { data, error } = await supbaseClient.storage.from('Storage').list()

    console.log(data)
    console.log(error)
  } catch (ex) {
    console.log(ex)
  }
}
