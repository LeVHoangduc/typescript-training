import { Action, HTMLAttribute, Status } from '../enums/enums'
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
      if (e.key === Action.Escape) {
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

    this.flashcardsFormEl.classList.remove(Status.Open)
    this.cardFormEl.classList.remove(Status.Open)
    this.confirmFormEl.classList.remove(Status.Open)

    this.detailModalEl.classList.remove(Status.Open)
    this.overlayEl.classList.remove(Status.Open)

    const isEditDetailModal = this.detailModalEl.getAttribute(HTMLAttribute.IsEdit)

    if (isEditDetailModal === 'on') {
      this.detailModalEl.removeAttribute(HTMLAttribute.IsEdit)
      this.detailModalEl.classList.add(Status.Open)
      this.overlayEl.classList.add(Status.Open)
    }
  }
}

export default OverlayView
