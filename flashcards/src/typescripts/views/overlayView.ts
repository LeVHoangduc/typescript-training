import Error from './errorView'

export interface IOverlayView {
  error: Error
  overlayEL: HTMLElement
  formFlashcardsEl: HTMLFormElement
}

class OverlayView {
  error: Error
  overlayEL: HTMLElement
  formFlashcardsEl: HTMLFormElement
  constructor() {
    this.error = new Error()

    this.overlayEL = document.querySelector('.overlay')!
    this.formFlashcardsEl = document.querySelector('.modal-flashcards')!
  }

  //----- EVENT LISTENER -----//

  addEventClickOutSide = () => {
    this.overlayEL.addEventListener('click', () => {
      this.resetForm()
      this.closeForm()
    })
  }

  //----- METHOD -----//

  closeForm = () => {
    this.formFlashcardsEl.classList.remove('open')
    this.overlayEL.classList.remove('open')
  }

  resetForm = () => {
    // Remove if there is an error
    const inputEl = document.querySelector('.modal-flashcards__input')!.parentElement

    if (inputEl) {
      const errorEl = inputEl.nextElementSibling as HTMLElement
      this.error.clearError(inputEl, errorEl)
    }
  }
}

export default OverlayView
