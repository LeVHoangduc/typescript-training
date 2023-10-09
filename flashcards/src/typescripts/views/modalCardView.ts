import { Action, DefaultValues, HTMLAttribute, KeyMap, Status } from '../enums/enums'
import { ICard } from '../models/cardModel'
import ValidationForm, { fieldCheck } from '../validation/validationForm'
import Error from './errorView'

type saveCard = (cardData: ICard) => Promise<void>
type loadCards = (category?: string) => void
class ModalCardView {
  private validationForm: ValidationForm
  private error: Error

  private cardFormEl: HTMLFormElement
  private cardFormTitleEl: HTMLElement
  private cardFormReturnEl: HTMLElement
  private cardFormCloseEl: HTMLElement

  private btnOpenFormEl: HTMLElement
  private btnCreateEl: HTMLElement

  private detailModalEl: HTMLElement
  private overlayEl: HTMLElement

  constructor() {
    this.validationForm = new ValidationForm()
    this.error = new Error()

    this.cardFormEl = document.querySelector('.modal-card')!
    this.cardFormTitleEl = document.querySelector('.modal-card__title')!
    this.cardFormReturnEl = document.querySelector('.modal-card__return')!
    this.cardFormCloseEl = document.querySelector('.modal-card__close')!

    this.btnOpenFormEl = document.querySelector('.profile__button')!
    this.btnCreateEl = document.querySelector('.modal-card__create')!

    this.detailModalEl = document.querySelector('.modal-detail')!
    this.overlayEl = document.querySelector('.overlay')!
  }

  //----- EVENT LISTENER -----//

  /**
   * Method to add an event listener for form submission.
   * @param {Function} saveCard - Promise indicating successful card addition.
   * @param {Function} loadCards - Renders cards after successful addition.
   */
  addEventSubmission = (saveCard: saveCard, loadCards: loadCards) => {
    this.cardFormEl?.addEventListener('submit', async e => {
      e.preventDefault()

      // Prepare card data for submission
      const cardData: ICard = {
        id: this.cardFormEl.getAttribute(HTMLAttribute.DataID)!,
        flashcards: this.cardFormEl.flashcards.value,
        word: this.cardFormEl.word.value,
        type: this.cardFormEl.type.value,
        translation: this.cardFormEl.translation.value,
        description: this.cardFormEl.description.value,
      }

      // Validate form inputs
      const inputCheck = this.validationForm.validationCard(cardData)
      const isValidation = this.isValidation(inputCheck)

      if (isValidation) {
        await saveCard(cardData)

        loadCards(cardData.flashcards)

        this.resetCardForm()
        this.closeCardForm()
      }
    })
  }

  // add event listener to add button for show card form
  addEventOpenFormListener = () => {
    this.btnOpenFormEl.addEventListener('click', () => {
      this.openForm()
    })
  }

  addEventCloseFormListener = () => {
    this.cardFormCloseEl.addEventListener('click', e => {
      this.resetCardForm()
      this.closeCardForm()
    })
  }

  addEventOnKeyPressCloseListener = () => {
    document.addEventListener('keydown', e => {
      if (e.key === KeyMap.Escape) {
        this.resetCardForm()
        this.closeCardForm()
      }
    })
  }

  addEventReturnFormListener = () => {
    this.cardFormReturnEl.addEventListener('click', () => {
      this.resetCardForm()
      this.closeCardForm()
    })
  }

  //----- METHOD -----//

  openForm = () => {
    this.cardFormEl.removeAttribute(HTMLAttribute.DataID)
    this.cardFormEl.classList.add(Status.Open)
    this.overlayEl.classList.add(Status.Open)
  }

  closeCardForm = () => {
    this.cardFormEl.classList.remove(Status.Open)
    this.cardFormReturnEl.classList.remove(Status.Active)

    this.overlayEl.classList.remove(Status.Open)

    // If card form is opened from detail modal
    // When closing card form, the detail modal will be open for UX
    const isEditDetailModal = this.detailModalEl.getAttribute(HTMLAttribute.IsEdit)

    if (isEditDetailModal === Status.On) {
      this.detailModalEl.removeAttribute(HTMLAttribute.IsEdit)
      this.detailModalEl.classList.add(Status.Open)
      this.overlayEl.classList.add(Status.Open)
    }
  }

  resetCardForm = () => {
    const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.modal-card__input')

    inputs.forEach(input => {
      const inputEl = input.parentElement as HTMLElement
      const errorEl = inputEl.nextElementSibling as HTMLElement

      this.error.clearError(inputEl, errorEl)

      input.value = DefaultValues.EmptyString
    })

    this.cardFormTitleEl.textContent = `Create your card`
    this.cardFormReturnEl.classList.remove(Status.Active)
    this.btnCreateEl.textContent = Action.Create
  }

  // Method to receive the card data for loading it to card form
  setDataForm = (card: ICard, cardId: string) => {
    // Set data-id attribute to link modal-card with modal-detail
    this.cardFormEl.setAttribute(HTMLAttribute.DataID, cardId)

    // Populate form fields with card details
    this.cardFormEl.flashcards.value = card.flashcards
    this.cardFormEl.word.value = card.word
    this.cardFormEl.type.value = card.type
    this.cardFormEl.translation.value = card.translation
    this.cardFormEl.description.value = card.description

    this.cardFormTitleEl.textContent = `Edit ${card.word} card`
    this.btnCreateEl.textContent = Action.Update
    this.cardFormReturnEl.classList.add(Status.Active)
  }

  /**
   * Method to check validation on UI
   * @param {Array} inputs Array of input object lists to show/remove errors on the UI
   * input[{
   * field: 'word',
   * isValid: false,
   * message: 'The content is required' ,
   * },]
   * @returns {Boolean} form is validated
   */
  isValidation = (inputs: fieldCheck[]) => {
    let isValid = true

    inputs.forEach(input => {
      const inputEl: HTMLElement = this.cardFormEl[input.field as string].parentElement
      const errorEl = inputEl.nextElementSibling as HTMLElement

      if (input.isValid) this.error.clearError(inputEl, errorEl)
      else {
        this.error.showError(inputEl, errorEl, input.message!)
        isValid = false
      }
    })

    return isValid
  }
}

export default ModalCardView
