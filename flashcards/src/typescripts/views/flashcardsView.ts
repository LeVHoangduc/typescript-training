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
   * Adds an event listener to load flashcards when a card category is clicked
   * @param {Function} loadCards - Function to load cards based on the selected category
   */
  addEventShowCard = (loadCards: loadCards) => {
    let flashcardsCurrent: string

    // Add a click event listener to the flashcards list element
    this.flashcardslistEl.addEventListener('click', e => {
      const flashcardsEl = (e.target as HTMLElement).closest('.flashcards__item')

      // Pass the selected category to the loadCards function
      flashcardsCurrent = flashcardsEl?.textContent!.trim() as string

      // Set the title based on the selected category
      this.titleEl.textContent = `${flashcardsCurrent} flashcards`

      // Call the loadCards function with the selected category
      loadCards(flashcardsCurrent)
    })
  }

  /**
   * Adds an event listener to handle flashcards deletion
   * @param {Function} openConfirmModal - Function to open a confirmation modal for flashcards deletion
   */
  addEventDeleteFlashcards = (openConfirmModal: openConfirmModal) => {
    this.flashcardslistEl.addEventListener('click', e => {
      const btnDelete = (e.target as HTMLElement).closest(
        '.flashcards__item .flashcards__delete'
      ) as HTMLElement

      // Retrieve the data-id of the flashcards to be removed
      const flashcardsDeleteEl = btnDelete?.parentElement

      // Check if the user clicked the delete button to avoid interference with other event listeners
      if (flashcardsDeleteEl) {
        const id = flashcardsDeleteEl.getAttribute(HTMLAttribute.DataID) as string
        const type = flashcardsDeleteEl.getAttribute(HTMLAttribute.Type) as string

        // Set the data-id and type attributes in the confirmation form
        this.confirmFormEl.setAttribute(HTMLAttribute.DataID, id)
        this.confirmFormEl.setAttribute(HTMLAttribute.Type, type)

        const itemDelete = flashcardsDeleteEl.textContent as string

        // Open the confirmation modal for flashcards deletion
        openConfirmModal(itemDelete, type)
      }
    })
  }

  //----- RENDERING -----//

  /**
   * Renders the flashcards view by populating the flashcards list and card form
   * @param {Function} getFlashcardsList - Function to retrieve a list of flashcards
   */
  renderFlashcardsView = (getFlashcardsList: getFlashcardsList) => {
    const flashcardsList: FlashcardsModel[] = getFlashcardsList()

    // Clear the existing content in the flashcards list and card form
    this.flashcardslistEl.innerHTML = DefaultValues.EmptyString
    this.cardFormEl.flashcards.innerHTML = DefaultValues.EmptyString

    flashcardsList.forEach((flashcards: FlashcardsModel) => {
      this.renderFlashcards(flashcards)
    })
  }

  /**
   * Renders a single flashcard by generating the HTML template and appending it to the DOM
   * @param {FlashcardsModel} flashcards - The flashcard data to be rendered
   */
  renderFlashcards = (flashcards: FlashcardsModel) => {
    // Generate the HTML template for the flashcard and flashcard select option
    const flashcardsTemplate = Template.renderFlashcards(flashcards)
    const flashcardsSelectTemplate = Template.renderSelectFlashcards(flashcards)

    // Append flashcardsTemplate to flashcards element
    if (this.flashcardslistEl) this.flashcardslistEl.innerHTML += flashcardsTemplate

    // Append languageSelectTemplate to the modal card element
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
