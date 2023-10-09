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
   * Adds an event listener to handle confirmation form submission for deleting flashcards or cards
   *
   * @param {Function} deleteFlashcards - Function to delete flashcards from the database
   * @param {Function} loadFlashcards - Function to load flashcards after deletion
   * @param {Function} deleteCard - Function to delete a card from the database
   * @param {Function} loadCards - Function to load cards after card deletion
   * @param {Function} resetCards - Function to reset card-related data
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

      // Determine whether to delete flashcards or cards based on the type
      if (type === DataSources.Flashcards) {
        // Delete flashcards from the database
        await deleteFlashcards(id)

        // Load the updated flashcards and reset card-related data
        loadFlashcards()
        resetCards()
      } else {
        // Delete a card from the database
        await deleteCard(id)

        // Load cards for the current category
        loadCards(utilities.getCategoryCurrent())
      }

      // Close the confirmation form
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
   * Opens a confirmation dialog for flashcards or card deletion
   * @param itemDelete - Identify the item is deleted
   * @param type  - Get the type (e.g., "card", "flashcards")
   */
  openConfirmModal = (itemDelete: string, type: string) => {
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
