import { DefaultValues, Status } from '../enums/enums'
import { IFlashcards } from '../models/flashcardsModels'
import ValidationForm, { fieldCheck } from '../validation/validationForm'
import Error from './errorView'

type saveFlashcards = (flashcardsData: IFlashcards) => void
type loadFlashcards = () => void

type isValidation = (inputCheck: fieldCheck) => boolean

class ModalFlashcardsView {
  private validationForm: ValidationForm
  private error: Error

  private formFlashcardsEl: HTMLFormElement
  private addFlashcardsFormEl: HTMLElement
  private closeFlashcardsFormEl: HTMLElement

  private overlayEl: HTMLElement

  constructor() {
    this.validationForm = new ValidationForm()
    this.error = new Error()

    this.formFlashcardsEl = document.querySelector('.modal-flashcards')!
    this.addFlashcardsFormEl = document.querySelector('.flashcards__add')!
    this.closeFlashcardsFormEl = document.querySelector('.modal-flashcards__close')!

    this.overlayEl = document.querySelector('.overlay')!
  }

  // ---- EVENT LISTENER ---- //

  addEventOpenFormListener = () => {
    this.addFlashcardsFormEl.addEventListener('click', e => {
      e.preventDefault()
      this.formFlashcardsEl.classList.add(Status.Open)
      this.overlayEl.classList.add(Status.Open)
    })
  }

  addEventCloseFormListener = () => {
    this.closeFlashcardsFormEl.addEventListener('click', () => {
      this.resetFlashcardsForm()
      this.closeFlashcardsForm()
    })
  }

  /**
   * Method to add an event listeners for saving and canceling the flashcards form.
   * @param {Function} saveFlashcards - The function to save the flashcards data.
   */
  addEventAddFlashcards = (saveFlashcards: saveFlashcards, loadFlashcards: loadFlashcards) => {
    const btnSave = this.formFlashcardsEl.btnSave

    btnSave.addEventListener('click', async (e: MouseEvent) => {
      e.preventDefault()

      const flashcardsData: IFlashcards = {
        flashcards: this.formFlashcardsEl.flashcards.value.toLowerCase(),
      }

      // Return a field result of check with regex
      const inputCheck = this.validationForm.validationFlashcards(flashcardsData)

      // Show error or pass in UI and performs save()
      const isValidation: boolean = this.isValidation(inputCheck)

      if (isValidation) {
        await saveFlashcards(flashcardsData)

        loadFlashcards()

        this.resetFlashcardsForm()
        this.closeFlashcardsForm()
      }
    })
  }

  resetFlashcardsForm = () => {
    const inputEl: HTMLElement = this.formFlashcardsEl.flashcards.parentElement
    const errorEl = inputEl.nextElementSibling as HTMLElement

    this.error.clearError(inputEl, errorEl)
    this.formFlashcardsEl.flashcards.value = DefaultValues.EmptyString
  }

  closeFlashcardsForm = () => {
    this.formFlashcardsEl.classList.remove(Status.Open)
    this.overlayEl.classList.remove(Status.Open)
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

    const inputEl: HTMLElement = this.formFlashcardsEl.flashcards.parentElement
    const errorEl = inputEl.nextElementSibling as HTMLElement

    if (inputCheck.isValid) this.error.clearError(inputEl, errorEl)
    else {
      this.error.showError(inputEl, errorEl, inputCheck.message!)
      isValid = false
    }

    return isValid
  }
}

export default ModalFlashcardsView
