/**
 * Message for the form validator.
 */
export const MESSAGE = {
  EMAIL_REQUIRED: 'The email is required',
  INVALID_EMAIL: 'The email is invalid',

  PASSWORD_REQUIRED: 'The password is required',
  INVALID_PASSWORD:
    'Must be 8 or more characters and contain at least 1 number and 1 special character',

  CONTENT_REQUIRED: 'The content is required',
  INVALID_CONTENT: 'The content is invalid!',
}

/**
 * Message for alert the error while fetching or rendering.
 */
export const ERROR_MESSAGE = {
  INVALID_INFORMATION: 'Please check your email or password for errors!',

  GET_FLASHCARDS: "Server error! Couldn't load flashcards",
  GET_CARD_LIST: "Server error! Couldn't load card list",

  EXIST_FLASHCARDS: 'Flashcards is exist',

  SERVER_ERROR: 'Server Error! Please try again later',

  LOADING_ERROR: "Server Error! Couldn't load data",
}

/**
 * Message for alert if the action be done successfully.
 */
export const SUCCESS_MESSAGE = {
  ADD_CARD: 'Add card successfully',
  ADD_FLASHCARDS: 'Add flashcards successfully',

  DELETE_FLASHCARDS: 'Delete flashcards successfully',
  DELETE_CARD: 'Delete card successfully',

  EDIT_CARD: 'Edit card successfully',
}

/**
 * Regex for form validator.
 */
export const REGEX = {
  FLASHCARDS: /^[^\d\s!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/,
  CONTENT: /^.{1,128}$/,

  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
}
