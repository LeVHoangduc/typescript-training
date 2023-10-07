import Error from './errorView'

class OverlayView {
  private error: Error
  private overlayEL: HTMLElement

  private flashcardsFormEl: HTMLFormElement
  private cardFormEl: HTMLFormElement
  private confirmFormEl: HTMLFormElement

  private detailModalEl: HTMLElement

  constructor() {
    this.error = new Error()

    this.flashcardsFormEl = document.querySelector('.modal-flashcards')!
    this.cardFormEl = document.querySelector('.modal-card')!
    this.confirmFormEl = document.querySelector('.modal-confirm')!

    this.detailModalEl = document.querySelector('.modal-detail')!

    this.overlayEL = document.querySelector('.overlay')!
  }

  //----- EVENT LISTENER -----//

  addEventClickOutSide = () => {
    this.overlayEL.addEventListener('click', () => {
      this.resetForm()
      this.closeForm()
    })
  }

  addEventCloseFormListener = () => {
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        this.resetForm()
        this.closeForm()
      }
    })
  }

  //----- METHOD -----//

  closeForm = () => {
    if (this.detailModalEl) {
      this.confirmFormEl.removeAttribute('data-id')
    }

    this.flashcardsFormEl.classList.remove('open')
    this.cardFormEl.classList.remove('open')
    this.confirmFormEl.classList.remove('open')

    this.detailModalEl.classList.remove('open')
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
