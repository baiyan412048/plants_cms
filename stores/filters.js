import { defineStore } from 'pinia'

export const useFileSizeFormat = defineStore('fileSizeFormat', () => {
  const formatBytes = (bytes) => {
    if (!bytes) {
      return '0 Bytes'
    }

    const k = 1024
    const decimals = 2
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${
      sizes[i]
    }`
  }

  return {
    formatBytes
  }
})
