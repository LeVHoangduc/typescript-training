class Error {
  constructor() {}

  /**
   * Method to show an error message for a specific input element.
   * @param {HTMLElement} inputEl - The input element linked to the error.
   * @param {HTMLElement} errorEl - The element to show the error message.
   * @param {String} message - The error message to be shown.
   */
  showError(inputEl: HTMLElement, errorEl: HTMLElement, message: string): void {
    inputEl.classList.add('error')
    errorEl.textContent = message
    errorEl.classList.add('active')
  }

  /**
   * Method to clear the error message and reset the UI of the input element.
   * @param {HTMLElement} inputEl - The input element linked to the error.
   * @param {HTMLElement} errorEl - The element is showing the error message.
   */
  clearError(inputEl: HTMLElement, errorEl: HTMLElement): void {
    if (inputEl.classList.contains('error')) inputEl.classList.remove('error')
    if (errorEl.classList.contains('active')) errorEl.classList.remove('active')
  }
}

export default Error
