/**
 * Regex for form validator.
 */
export const REGEX = {
  FLASHCARDS: /^[^\d\s!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/,
  CONTENT: /^.{1,128}$/,

  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
}
