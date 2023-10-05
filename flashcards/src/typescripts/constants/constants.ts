/**
 * Message for the form validator.
 */
export const MESSAGE = {
  CONTENT_REQUIRED: 'The content is required',
  INVALID_CONTENT: 'The content is invalid!',

  FLASHCARDS_CONFIRM_MESSAGE: 'Do you want to delete this flashcards',

  EXIST_FLASHCARDS: 'Flashcards is exist',
}

/**
 * Message for alert the error while fetching or rendering.
 */
export const ERROR_MESSAGE = {
  ADD_FLASHCARDS: "Couldn't add flashcards",

  DELETE_FLASHCARDS: "Couldn't add flashcards ",

  GET_FLASHCARDS_LIST: "Server error! Couldn't load flashcards list",

  SERVER_ERROR: 'Server Error! Please try again later',
}

/**
 * Message for alert if the action be done successfully.
 */
export const SUCCESS_MESSAGE = {
  ADD_FLASHCARDS: 'Add flashcards successfully',

  DELETE_FLASHCARDS: 'Delete flashcards successfully',
}

/**
 * Regex for form validator.
 */
export const REGEX = {
  FLASHCARDS: /^[^\d\s!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/,
}
