import { defineStore } from 'pinia'
import { Modal } from 'flowbite'

// export const useSelectImageModal = defineStore('selectImageModal', () => {
//   const modalOptions = {
//     // placement: 'bottom-right',
//     // backdrop: 'dynamic',
//     // backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
//     onHide: () => {
//       console.log('modal is hidden')
//     },
//     onShow: () => {
//       console.log('modal is shown')
//     },
//     onToggle: () => {
//       console.log('modal has been toggled')
//     }
//   }

//   const $modalElement = document.querySelector('#mediaModal')
//   const modal = new Modal($modalElement, modalOptions)

//   const initModal = () => {}

//   const openModal = () => {
//     modal.show()
//   }

//   return { initModal, openModal }
// })
