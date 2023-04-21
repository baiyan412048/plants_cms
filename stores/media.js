import { defineStore } from 'pinia'

import ImgurClient from 'imgur'

export const useMedia = defineStore('media', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL } = runtimeConfig.public

  const client = new ImgurClient({
    clientId: '81bcc5e89b004a1',
    clientSecret: 'a7b1bb8fb635ff9ab336b2eceff2a82f619c7dc7',
    refreshToken: '4024a39b10347625f761505d9f1ca29395f80637'
  })

  // 刪除圖片
  const deleteMediaImage = async (hash) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/image/${hash}`,
        {
          method: 'DELETE'
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  // 上傳圖片
  const uploadMediaImage = async (event) => {
    const formData = new FormData()
    formData.append('files', event.target.files[0])
    formData.append('name', event.target.files[0].name)

    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/image/`,
        {
          method: 'POST',
          body: formData
        }
      )

      // return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  // 取得所有圖片
  const getMediaImages = async () => {
    try {
      const { data } = await client.getAlbum('a15Lk0o')

      return data.images
    } catch (error) {
      console.error(error)
    }
  }

  return {
    getMediaImages,
    deleteMediaImage,
    uploadMediaImage
  }
})
