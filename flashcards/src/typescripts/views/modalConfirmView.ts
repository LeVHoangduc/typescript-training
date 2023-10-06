import { DataSources } from '../enums/enums'
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

  private overlayEl: HTMLElement
  constructor() {
    this.confirmFormEl = document.querySelector('.modal-confirm')!
    this.confirmMessageEl = document.querySelector('.modal-confirm__message')!

    this.btnCancelEl = this.confirmFormEl?.cancel

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

      let id = this.confirmFormEl.getAttribute('data-id') as string
      let type = this.confirmFormEl.getAttribute('type')

      // Send id to database
      if (type === DataSources.flashcards) {
        await deleteFlashcards(id)

        loadFlashcards()
        resetCards()
      } else {
        await deleteCard(id)

        loadCards(utilities.getCategoryCurrent())
      }
      this.closeForm()
    })

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
    this.confirmFormEl.classList.add('open')
    this.confirmMessageEl.textContent = `Do you want to delete ${itemDelete} ${type}`

    this.overlayEl.classList.add('open')
  }

  closeForm = () => {
    this.confirmFormEl.classList.remove('open')
    this.confirmFormEl.removeAttribute('data-id')
    this.confirmFormEl.removeAttribute('type')

    this.overlayEl.classList.remove('open')
  }
}

export default ModalConfirm
