import { DataSources } from '../enums/enums'

type deleteFlashcards = (flashcardsID: string) => Promise<void>
type loadFlashcards = () => void

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
    resetCards
  ) => {
    this.confirmFormEl.addEventListener('submit', async e => {
      e.preventDefault()

      let id = this.confirmFormEl.getAttribute('data-id')
      let type = this.confirmFormEl.getAttribute('type')

      // Send id to database
      if (id && type === DataSources.flashcards) {
        await deleteFlashcards(id)

        loadFlashcards()
        resetCards()
      }
      this.closeForm()
    })

    this.btnCancelEl.addEventListener('click', () => {
      this.closeForm()
    })
  }

  // ---- METHOD ---- //
  /**
   * Opens a confirmation dialog for language deletion.
   * @param {Element} button - Button element that triggered the deletion request.
   */
  openModalConfirm = (button: HTMLElement) => {
    // Get the type (e.g., "card", "flashcards")
    const type = button.parentElement?.getAttribute('type')

    // get flashcards to be removed
    const flashcardsName = button.parentElement?.textContent

    if (flashcardsName) {
      const flashcards = flashcardsName.charAt(0).toUpperCase() + flashcardsName.slice(1)

      this.confirmFormEl.classList.add('open')
      this.confirmMessageEl.textContent = `Do you want to delete ${flashcards} ${type}`

      this.overlayEl.classList.add('open')
    }
  }

  closeForm = () => {
    this.confirmFormEl.classList.remove('open')
    this.confirmFormEl.removeAttribute('data-id')
    this.confirmFormEl.removeAttribute('type')

    this.overlayEl.classList.remove('open')
  }
}

export default ModalConfirm
