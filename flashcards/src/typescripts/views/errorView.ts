import { Status } from '../enums/enums'

class Error {
  constructor() {}

  /**
   * Method to show an error message for a specific input element
   * @param {HTMLElement} inputEl - The input element linked to the error
   * @param {HTMLElement} errorEl - The element to show the error message
   * @param {String} message - The error message to be shown
   */
  showError(inputEl: HTMLElement, errorEl: HTMLElement, message: string): void {
    inputEl.classList.add(Status.Error)
    errorEl.textContent = message
    errorEl.classList.add(Status.Active)
  }

  /**
   * Method to clear the error message and reset the UI of the input element
   * @param {HTMLElement} inputEl - The input element linked to the error
   * @param {HTMLElement} errorEl - The element is showing the error message
   */
  clearError(inputEl: HTMLElement, errorEl: HTMLElement): void {
    if (inputEl.classList.contains(Status.Error)) inputEl.classList.remove(Status.Error)
    if (errorEl.classList.contains(Status.Active)) errorEl.classList.remove(Status.Active)
  }
}

export default Error
