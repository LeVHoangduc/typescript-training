import { DEFAULT_VALUES } from '../constants/defaultValues'
import { HTMLAttribute, KeyMap, Status } from '../enums/enums'

type resetCardForm = () => void
type resetFlashcardsForm = () => void

class OverlayView {
  private overlayEl: HTMLElement
  private overlaySecondEl: HTMLElement

  private flashcardsFormEl: HTMLFormElement
  private cardFormEl: HTMLFormElement
  private confirmFormEl: HTMLFormElement

  private detailModalEl: HTMLElement
  private searchInformationEl: HTMLElement
  private searchInputEl: HTMLInputElement

  private navbarUserEl: HTMLElement

  constructor() {
    this.flashcardsFormEl = document.querySelector('.modal-flashcards')!
    this.cardFormEl = document.querySelector('.modal-card')!
    this.confirmFormEl = document.querySelector('.modal-confirm')!

    this.detailModalEl = document.querySelector('.modal-detail')!
    this.searchInformationEl = document.querySelector('.search-information')!
    this.searchInputEl = document.querySelector('.header__search__input')!

    this.overlayEl = document.querySelector('.overlay')!
    this.overlaySecondEl = document.querySelector('.overlay-second')!

    this.navbarUserEl = document.querySelector('.header__navbar')!
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

    this.overlaySecondEl.addEventListener('click', () => {
      this.closeNavbar()
      this.closeSearch()
    })
  }

  addEventEscapeListener = (
    resetFlashcardsForm: resetFlashcardsForm,
    resetCardForm: resetCardForm
  ) => {
    document.addEventListener('keydown', e => {
      if (e.key === KeyMap.Escape) {
        resetFlashcardsForm()
        resetCardForm()
        this.closeForm()
        this.closeSearch()
        this.closeOverlaySecond()
      }
    })
  }

  //----- METHOD -----//

  closeForm = () => {
    this.flashcardsFormEl.classList.remove(Status.Open)
    this.cardFormEl.classList.remove(Status.Open)
    this.confirmFormEl.classList.remove(Status.Open)

    this.detailModalEl.classList.remove(Status.Open)
    this.navbarUserEl.classList.remove(Status.Open)
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
      this.overlaySecondEl.classList.add(Status.Open)
    }
  }

  closeSearch = () => {
    this.searchInformationEl.classList.remove(Status.Open)
    this.overlaySecondEl.classList.remove(Status.Open)
    this.searchInputEl.value = DEFAULT_VALUES.EMPTY_STRING
  }

  closeNavbar = () => {
    this.navbarUserEl.classList.remove(Status.Open)
  }

  openOverlaySecond = () => {
    this.overlaySecondEl.classList.add(Status.Open)
  }

  closeOverlaySecond = () => {
    this.overlaySecondEl.classList.remove(Status.Open)
  }
}

export default OverlayView
