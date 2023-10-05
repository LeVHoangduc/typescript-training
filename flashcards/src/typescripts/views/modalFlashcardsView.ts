import { DefaultValues } from '../enums/enums'
import { IFlashcards } from '../models/flashcardsModels'
import ValidationForm, { fieldCheck } from '../validation/validationForm'
import Error from './errorView'

type saveFlashcards = (flashcardsData: IFlashcards) => void
type loadFlashcards = () => void

type isValidation = (inputCheck: fieldCheck) => boolean

class ModalFlashcardsView {
  private validationForm: ValidationForm
  private error: Error

  private addFlashcards: HTMLElement
  private formFlashcardsEl: HTMLFormElement

  private overlayEl: HTMLElement

  constructor() {
    this.validationForm = new ValidationForm()
    this.error = new Error()

    this.addFlashcards = document.querySelector('.flashcards__add')!
    this.formFlashcardsEl = document.querySelector('.modal-flashcards')!

    this.overlayEl = document.querySelector('.overlay')!
  }

  // ---- EVENT LISTENER ---- //

  addEventOpenFormListener = () => {
    this.addFlashcards.addEventListener('click', e => {
      e.preventDefault()
      this.formFlashcardsEl.classList.add('open')
      this.overlayEl.classList.add('open')
    })
  }

  /**
   * Method to add an event listeners for saving and canceling the flashcards form.
   * @param {Function} saveFlashcards - The function to save the flashcards data.
   */
  addEventAddFlashcards = (saveFlashcards: saveFlashcards, loadFlashcards: loadFlashcards) => {
    const btnSave = this.formFlashcardsEl.btnSave
    // const btnCancel = this.formFlashcardsEl.btnCancel

    btnSave.addEventListener('click', async e => {
      e.preventDefault()

      const flashcardsData: IFlashcards = {
        flashcards: this.formFlashcardsEl.flashcards.value.toLowerCase(),
      }

      // Return a field result of check with regex
      const inputCheck: fieldCheck = this.validationForm.validationFlashcards()

      // Show error or pass in UI and performs save()
      const isValidation: boolean = this.isValidation(inputCheck)

      if (isValidation) {
        await saveFlashcards(flashcardsData)

        loadFlashcards()

        this.resetForm()
        this.closeForm()
      }
    })
  }

  resetForm = () => {
    this.formFlashcardsEl.flashcards.value = DefaultValues.EmptyString
  }

  closeForm = () => {
    this.formFlashcardsEl.classList.remove('open')
    this.overlayEl.classList.remove('open')
  }

  /**
   * Method to check validation on UI
   * @param {Object} inputs - Input object lists to show/remove errors on the UI
   * input{
   *  isValid: true
   *  success: "Add flashcards successfully"
   * }
   * @returns {Boolean} Whether the form is validated or not.
   */
  isValidation: isValidation = (inputCheck: fieldCheck): boolean => {
    let isValid = true

    const inputEl = this.formFlashcardsEl.flashcards.parentElement

    const errorEl = inputEl.nextElementSibling

    if (inputCheck.isValid) this.error.clearError(inputEl, errorEl)
    else {
      this.error.showError(inputEl, errorEl, inputCheck.message!)
      isValid = false
    }

    return isValid
  }
}

export default ModalFlashcardsView
