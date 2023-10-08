import Error from './errorView'

type resetCardForm = () => void
type resetFlashcardsForm = () => void
class OverlayView {
  private error: Error
  private overlayEl: HTMLElement

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

    this.overlayEl = document.querySelector('.overlay')!
  }

  //----- EVENT LISTENER -----//

  addEventClickOutSide = (
    resetFlashcardsForm: resetFlashcardsForm,
    resetCardForm: resetCardForm
  ) => {
    this.overlayEl.addEventListener('click', () => {
      resetFlashcardsForm()
      resetCardForm()
      this.closeForm()
    })
  }

  addEventCloseFormListener = (
    resetFlashcardsForm: resetFlashcardsForm,
    resetCardForm: resetCardForm
  ) => {
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        resetFlashcardsForm()
        resetCardForm()
        this.closeForm()
      }
    })
  }

  //----- METHOD -----//

  closeForm = () => {
    // if (this.detailModalEl) {
    //   this.confirmFormEl.removeAttribute('data-id')
    // }

    this.flashcardsFormEl.classList.remove('open')
    this.cardFormEl.classList.remove('open')
    // this.cardFormEl.btnReturn.classList.remove('active')
    this.confirmFormEl.classList.remove('open')

    this.detailModalEl.classList.remove('open')
    this.overlayEl.classList.remove('open')

    const isEditDetailModal = this.detailModalEl.getAttribute('isEdit')

    if (isEditDetailModal === 'on') {
      this.detailModalEl.removeAttribute('isEdit')
      this.detailModalEl.classList.add('open')
      this.overlayEl.classList.add('open')
    }
  }
}

export default OverlayView
