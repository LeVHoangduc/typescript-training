import { REGEX, MESSAGE } from '../constants/constants'
import { DefaultValues } from '../enums/enums'
import { ICard } from '../models/cardModel'
import { IFlashcards } from '../models/flashcardsModels'

export type fieldCheck = {
  field?: string
  isValid: boolean
  message?: string
}

class ValidationForm {
  constructor() {}

  validationFlashcards = (flashcardsData: IFlashcards) => {
    let fieldCheck: fieldCheck = { isValid: true }

    const flashcardsValue = flashcardsData.flashcards

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

  validationCard = (cardData: ICard) => {
    let fieldCheck: fieldCheck[] = []

    const cardCheck = {
      word: cardData.word,
      translation: cardData.translation,
      description: cardData.description,
    }

    for (const key in cardCheck) {
      const value = cardCheck[key]
      console.log(value)
      let isValidField = REGEX.CONTENT.test(value)

      if (value.trim() === DefaultValues.EmptyString) {
        fieldCheck.push({
          field: key,
          isValid: false,
          message: MESSAGE.CONTENT_REQUIRED,
        })
      } else if (!isValidField) {
        fieldCheck.push({
          field: key,
          isValid: false,
          message: MESSAGE.INVALID_CONTENT,
        })
      } else {
        fieldCheck.push({
          field: key,
          isValid: true,
        })
      }
    }
    return fieldCheck
  }
}

export default ValidationForm
