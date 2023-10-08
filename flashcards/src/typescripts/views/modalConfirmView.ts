import { DataSources, HTMLAttribute, Status } from '../enums/enums'
import { utilities } from '../helpers/utilities'

type deleteFlashcards = (id: string) => Promise<void>
type loadFlashcards = () => void
type loadCards = (category?: string) => void
type deleteCard = (id: string) => Promise<void>
type resetCards = () => void

class ModalConfirm {
  private confirmFormEl: HTMLFormElement
  private confirmMessageEl: HTMLElement
  private btnCancelEl: HTMLElement

  private detailModalEl: HTMLElement

  private overlayEl: HTMLElement

  constructor() {
    this.confirmFormEl = document.querySelector('.modal-confirm')!
    this.confirmMessageEl = document.querySelector('.modal-confirm__message')!

    this.btnCancelEl = this.confirmFormEl?.cancel

    this.detailModalEl = document.querySelector('.modal-detail')!
    this.overlayEl = document.querySelector('.overlay')!
  }

  //----- EVENT LISTENER -----//

  /**
   * Adds event listeners for the confirmation modal.
   * @param {Function} deleteFlashcards - Function to delete a language.
   * @param {Function} loadFlashcards - Function to update the language view.
   */
  addEventConfirm = (
    deleteFlashcards: deleteFlashcards,
    loadFlashcards: loadFlashcards,
    deleteCard: deleteCard,
    loadCards: loadCards,
    resetCards: resetCards
  ) => {
    this.confirmFormEl.addEventListener('submit', async e => {
      e.preventDefault()

      let id = this.confirmFormEl.getAttribute(HTMLAttribute.DataID) as string
      let type = this.confirmFormEl.getAttribute(HTMLAttribute.Type)

      // Send id to database
      if (type === DataSources.Flashcards) {
        await deleteFlashcards(id)

        loadFlashcards()
        resetCards()
      } else {
        await deleteCard(id)

        loadCards(utilities.getCategoryCurrent())
      }
      this.endForm()
    })
  }

  addEventCloseModalConfirm = () => {
    this.btnCancelEl.addEventListener('click', () => {
      this.closeForm()
    })
  }

  // ---- METHOD ---- //

  /**
   * Opens a confirmation dialog for flashcards or card deletion.
   * @param itemDelete - Identify the item is deleted
   * @param type  - Get the type (e.g., "card", "flashcards")
   */
  openModalConfirm = (itemDelete: string, type: string) => {
    this.confirmFormEl.classList.add(Status.Open)
    this.confirmMessageEl.textContent = `Do you want to delete ${itemDelete} ${type}`

    this.overlayEl.classList.add(Status.Open)
  }

  closeForm = () => {
    this.confirmFormEl.classList.remove(Status.Open)

    const isDetailModal = this.detailModalEl.classList.contains(Status.Open)

    if (!isDetailModal) {
      this.confirmFormEl.removeAttribute(HTMLAttribute.DataID)
      this.confirmFormEl.removeAttribute(HTMLAttribute.Type)

      this.overlayEl.classList.remove(Status.Open)
    }
  }

  endForm = () => {
    this.confirmFormEl.removeAttribute(HTMLAttribute.DataID)
    this.confirmFormEl.removeAttribute(HTMLAttribute.Type)
    this.confirmFormEl.classList.remove(Status.Open)

    this.detailModalEl.classList.remove(Status.Open)
    this.overlayEl.classList.remove(Status.Open)
  }
}

export default ModalConfirm
