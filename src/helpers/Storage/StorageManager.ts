import { supbaseClient } from '../../config/Storage'
export const ReadAllImage = async (path: string, image: File | Blob| Buffer) => {
  try {
    console.log(image)
    const { data, error } = await supbaseClient.storage
      .from('Storage')
      .upload(`images/photo.png`, image)

    console.log(data)
    console.log(error)
  } catch (ex) {
    console.log(ex)
  }
}
