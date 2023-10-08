import { Action, DefaultValues, HTMLAttribute, Status } from '../enums/enums'
import Error from './errorView'

type resetCardForm = () => void
type resetFlashcardsForm = () => void
class OverlayView {
  private error: Error
  private overlayEl: HTMLElement
  private overlayErrorEl: HTMLElement

  private flashcardsFormEl: HTMLFormElement
  private cardFormEl: HTMLFormElement
  private confirmFormEl: HTMLFormElement

  private detailModalEl: HTMLElement
  private searchInformationEl: HTMLElement
  private searchInputEl: HTMLInputElement

  constructor() {
    this.error = new Error()

    this.flashcardsFormEl = document.querySelector('.modal-flashcards')!
    this.cardFormEl = document.querySelector('.modal-card')!
    this.confirmFormEl = document.querySelector('.modal-confirm')!

    this.detailModalEl = document.querySelector('.modal-detail')!
    this.searchInformationEl = document.querySelector('.search-information')!
    this.searchInputEl = document.querySelector('.header__search__input')!

    this.overlayEl = document.querySelector('.overlay')!
    this.overlayErrorEl = document.querySelector('.overlay-error')!
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

    this.overlayErrorEl.addEventListener('click', () => {
      this.closeSearch()
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

  addEventEscapeListener = () => {
    document.addEventListener('keydown', e => {
      if (e.key === Action.Escape) {
        this.closeSearch()
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
    const isSearchDetailModal = this.detailModalEl.getAttribute(HTMLAttribute.IsSearch)

    if (isEditDetailModal === Status.On) {
      this.detailModalEl.removeAttribute(HTMLAttribute.IsEdit)
      this.detailModalEl.classList.add(Status.Open)
      this.overlayEl.classList.add(Status.Open)
    }

    if (isSearchDetailModal === Status.On) {
      this.detailModalEl.removeAttribute(HTMLAttribute.IsSearch)
      this.overlayErrorEl.classList.add(Status.Open)
    }
  }

  closeSearch = () => {
    this.searchInformationEl.classList.remove('open')
    this.overlayErrorEl.classList.remove('open')
    this.searchInputEl.value = DefaultValues.EmptyString
  }

  openOverlayError = () => {
    this.overlayErrorEl.classList.add('open')
  }

  closeOverlayError = () => {
    this.overlayErrorEl.classList.remove('open')
  }
}

export default OverlayView
