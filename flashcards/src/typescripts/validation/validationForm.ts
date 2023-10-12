import { REGEX, MESSAGE } from '../constants/constants'
import { DefaultValues, FieldNames } from '../enums/enums'
import { ICard } from '../models/cardModel'
import { IFlashcards } from '../models/flashcardsModels'
import { IUser } from '../models/userModel'

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

  validationLogin = (userData: IUser): fieldCheck[] => {
    let fieldCheck: fieldCheck[] = []

    const userCheck = {
      email: userData.email,
      password: userData.password,
    }

    for (const key in userCheck) {
      const value = userCheck[key]

      let isValidField = true
      let messageRequired = DefaultValues.EmptyString
      let messageInvalid = DefaultValues.EmptyString

      if (key === FieldNames.Email) {
        isValidField = REGEX.EMAIL.test(value)
        messageRequired = MESSAGE.EMAIL_REQUIRED
        messageInvalid = MESSAGE.INVALID_EMAIL
      }
      if (key === FieldNames.Password) {
        isValidField = REGEX.PASSWORD.test(value)
        messageRequired = MESSAGE.PASSWORD_REQUIRED
        messageInvalid = MESSAGE.INVALID_PASSWORD
      }

      if (value.trim() === DefaultValues.EmptyString) {
        fieldCheck.push({
          field: key,
          isValid: false,
          message: messageRequired,
        })
      } else if (!isValidField) {
        fieldCheck.push({
          field: key,
          isValid: false,
          message: messageInvalid,
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
