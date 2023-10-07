import { DataSources, DefaultValues, HTMLAttribute } from '../enums/enums'
import { ICard } from '../models/cardModel'
import ValidationForm, { fieldCheck } from '../validation/validationForm'
import Error from './errorView'

type saveCard = (cardData: ICard) => Promise<void>
type loadCards = (category?: string) => void
class ModalCardView {
  private validationForm: ValidationForm
  private error: Error

  private cardFormEl: HTMLFormElement
  private formTitleEl: HTMLElement
  private btnAddEl: HTMLElement

  private overlayEl: HTMLElement

  constructor() {
    this.validationForm = new ValidationForm()
    this.error = new Error()

    this.cardFormEl = document.querySelector('.modal-card')!
    this.formTitleEl = document.querySelector('.modal-card__title')!
    this.btnAddEl = document.querySelector('.profile__button')!

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
        id: this.cardFormEl.getAttribute('data-id')!,
        flashcards: this.cardFormEl.flashcards.value,
        word: this.cardFormEl.word.value,
        type: this.cardFormEl.type.value,
        translation: this.cardFormEl.translation.value,
        description: this.cardFormEl.description.value,
      }

      // Validate form inputs
      const inputCheck = this.validationForm.validationCard(cardData) as fieldCheck[]

      const isValidation = this.isValidation(inputCheck)

      if (isValidation) {
        await saveCard(cardData)

        loadCards(cardData.flashcards)

        this.resetForm()
        this.closeForm()
      }
    })
  }

  addEventOpenFormListener = () => {
    this.btnAddEl.addEventListener('click', () => {
      this.openForm()
    })
  }

  addEventCloseFormListener = () => {
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        this.resetForm()
        this.closeForm()
      }
    })
  }

  //----- METHOD -----//

  openForm = () => {
    this.cardFormEl.removeAttribute('data-id')
    this.cardFormEl.classList.add('open')
    this.overlayEl.classList.add('open')
  }

  closeForm = () => {
    this.cardFormEl.classList.remove('open')
    this.overlayEl.classList.remove('open')
  }

  resetForm = () => {
    const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.modal-card__input')

    inputs.forEach(input => {
      const inputEl = input.parentElement as HTMLElement
      const errorEl = inputEl.nextElementSibling as HTMLElement

      this.error.clearError(inputEl, errorEl)

      input.value = DefaultValues.EmptyString
    })
  }

  setDataForm = (card: ICard, cardId: string) => {
    // Set data-id attribute to link modal-card with modal-detail
    this.cardFormEl.setAttribute(HTMLAttribute.dataID, cardId)

    // Populate form fields with card details
    this.cardFormEl.flashcards.value = card.flashcards
    this.cardFormEl.word.value = card.word
    this.cardFormEl.type.value = card.type
    this.cardFormEl.translation.value = card.translation
    this.cardFormEl.description.value = card.description

    this.formTitleEl.textContent = `Edit ${card.word} card`
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
