import { REGEX, MESSAGE } from '../constants/constants'
import { DefaultValues } from '../enums/enums'

export interface IValidationForm {
  flashcardsFormEl: HTMLFormElement
}

export type fieldCheck = {
  field?: string
  isValid: boolean
  message?: string
}

class ValidationForm implements IValidationForm {
  flashcardsFormEl: HTMLFormElement

  constructor() {
    this.flashcardsFormEl = document.querySelector('.modal-flashcards')!
  }

  validationFlashcards = () => {
    let fieldCheck: fieldCheck = { isValid: true }

    const flashcardsValue = this.flashcardsFormEl.flashcards.value

    let isValidField = REGEX.FLASHCARDS.test(flashcardsValue)

    if (flashcardsValue.trim() === DefaultValues.EmptyString) {
      fieldCheck = {
        isValid: false,
        message: MESSAGE.CONTENT_REQUIRED,
      }
    } else if (!isValidField) {
      fieldCheck = {
        isValid: false,
        message: MESSAGE.INVALID_CONTENT,
      }
    } else {
      fieldCheck = {
        isValid: true,
      }
    }
    return fieldCheck
  }
}

export default ValidationForm
