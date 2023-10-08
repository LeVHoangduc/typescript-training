import { Action, DefaultValues, HTMLAttribute, Status } from '../enums/enums'
import FlashcardsModel from '../models/flashcardsModels'
import Template from '../templates/templates'

type getFlashcardsList = () => FlashcardsModel[]
type loadCards = (category?: string) => void
type openConfirmModal = (itemDelete: string, type: string) => void

class FlashcardsView {
  private flashcardslistEl: HTMLElement
  private slideButtonsEl: NodeListOf<Element>

  private titleEl: HTMLElement

  private cardFormEl: HTMLFormElement
  private confirmFormEl: HTMLFormElement

  constructor() {
    this.flashcardslistEl = document.querySelector('.flashcards__list')!
    this.slideButtonsEl = document.querySelectorAll('.slide-buttons')!

    this.titleEl = document.querySelector('.card-list__title')!

    this.cardFormEl = document.querySelector('.modal-card')!
    this.confirmFormEl = document.querySelector('.modal-confirm')!
  }

  //----- EVENT LISTENER -----//

  /**
   * Method to add an event listener to language items to show the modal card.
   * @param {Function} loadCards - Function to load cards.
   * @returns {string} - Current selected category.
   */
  addEventShowCard = (loadCards: loadCards) => {
    let flashcardsCurrent: string

    console.log(this.flashcardslistEl)
    this.flashcardslistEl.addEventListener('click', e => {
      const flashcardsEl = (e.target as HTMLElement).closest('.flashcards__item')

      // Pass the selected category to the loadCards function.
      flashcardsCurrent = flashcardsEl?.textContent!.trim() as string

      // set title
      this.titleEl.textContent = `${flashcardsCurrent} flashcards`

      loadCards(flashcardsCurrent)
    })
  }

  addEventDeleteFlashcards = (openConfirmModal: openConfirmModal) => {
    this.flashcardslistEl.addEventListener('click', e => {
      const btnDelete = (e.target as HTMLElement).closest(
        '.flashcards__item .flashcards__delete'
      ) as HTMLElement

      // For get data-id of flashcards will be removed
      const flashcardsDeleteEl = btnDelete?.parentElement

      // If the user clicks in delete button, it will execute the delete
      // Avoid to missing event listener with show cards
      if (flashcardsDeleteEl) {
        const id = flashcardsDeleteEl.getAttribute(HTMLAttribute.DataID) as string
        const type = flashcardsDeleteEl.getAttribute(HTMLAttribute.Type) as string

        this.confirmFormEl.setAttribute(HTMLAttribute.DataID, id)
        this.confirmFormEl.setAttribute(HTMLAttribute.Type, type)

        const itemDelete = flashcardsDeleteEl.textContent as string

        openConfirmModal(itemDelete, type)
      }
    })
  }

  //----- RENDERING -----//

  renderFlashcardsView = (getFlashcardsList: getFlashcardsList) => {
    const flashcardsList: FlashcardsModel[] = getFlashcardsList()
    console.log(flashcardsList)

    this.flashcardslistEl.innerHTML = DefaultValues.EmptyString
    this.cardFormEl.flashcards.innerHTML = DefaultValues.EmptyString

    flashcardsList.forEach((flashcards: FlashcardsModel) => {
      this.renderFlashcards(flashcards)
    })
  }

  renderFlashcards = (flashcards: FlashcardsModel) => {
    const flashcardsTemplate = Template.renderFlashcards(flashcards)
    const flashcardsSelectTemplate = Template.renderSelectFlashcards(flashcards)

    // Append flashcardsTemplate to flashcards element.
    if (this.flashcardslistEl) this.flashcardslistEl.innerHTML += flashcardsTemplate

    // Append languageSelectTemplate to the modal card element.
    if (this.cardFormEl) this.cardFormEl.flashcards.innerHTML += flashcardsSelectTemplate
  }

  //----- METHOD -----//

  createSlider = () => {
    this.slideButtonsEl.forEach(button => {
      button.addEventListener('click', () => {
        const direction = button.id === Action.Previous ? -1 : 1
        const clientWidthCurrent = this.flashcardslistEl.clientWidth
        const scrollAmount = clientWidthCurrent * direction

        this.flashcardslistEl.scrollBy({ left: scrollAmount, behavior: 'smooth' })

        const maxScrollLeft = this.flashcardslistEl.scrollWidth - clientWidthCurrent - 1

        this.flashcardslistEl.addEventListener('scroll', () => {
          this.flashcardslistEl.scrollLeft <= 0
            ? this.slideButtonsEl[0].classList.add(Status.Inactive)
            : this.slideButtonsEl[0].classList.remove(Status.Inactive)

          this.flashcardslistEl.scrollLeft >= maxScrollLeft
            ? this.slideButtonsEl[1].classList.add(Status.Inactive)
            : this.slideButtonsEl[1].classList.remove(Status.Inactive)
        })
      })
    })
  }
}

export default FlashcardsView
