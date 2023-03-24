import { defineStore } from 'pinia'
import { useFetch } from '@vueuse/core'

import ImgurClient from 'imgur'

export const useMediaStore = defineStore('mediaStore', () => {
  const images = reactive([])

  const client = new ImgurClient({
    clientId: '81bcc5e89b004a1',
    clientSecret: 'a7b1bb8fb635ff9ab336b2eceff2a82f619c7dc7',
    refreshToken: '4024a39b10347625f761505d9f1ca29395f80637'
  })

  const deleteImage = async (hash) => {
    // 刪除圖片
    const { data } = await useFetch(
      `https://api.baiyan777.com/api/image/${hash}`
    )
      .delete()
      .json()
    console.log(data.value, 'deleteImage')
    // 更新 images 內容
    images.splice(
      images.findIndex((obj) => obj.deletehash == hash),
      1
    )
  }

  const uploadImage = async (event) => {
    const formData = new FormData()
    formData.append('files', event.target.files[0])
    formData.append('name', event.target.files[0].name)
    const { data } = await useFetch('https://api.baiyan777.com/api/image/')
      .post(formData, null)
      .json()
    console.log(data.value, data.value.data, 'uploadImage')
    images.push(...data.value.data)
    // http://localhost:3000/api/image/
    // https://api.baiyan777.com/api/image
  }

  const getImages = async () => {
    try {
      const { data } = await client.getAlbum('a15Lk0o')
      images.splice(0, images.length, ...data.images)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    images,
    getImages,
    deleteImage,
    uploadImage
  }
})
