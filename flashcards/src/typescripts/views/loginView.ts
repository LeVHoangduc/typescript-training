import { DefaultValues, Path } from '../enums/enums'
import { IUser } from '../models/userModel'
import ValidationForm, { fieldCheck } from '../validation/validationForm'
import Error from './errorView'

type isValidUser = (user: IUser) => boolean

class LoginView {
  private validationForm: ValidationForm
  private error: Error

  private loginFormEl: HTMLFormElement
  private buttonEl: HTMLElement

  constructor() {
    this.validationForm = new ValidationForm()
    this.error = new Error()

    this.loginFormEl = document.querySelector('.login-form')!
    this.buttonEl = document.querySelector('.login-form__button')!
  }
  //----- EVENT LISTENER -----//

  /**
   * Method to login action when the login button is clicked
   * @param {Function} isValidUSer Check if User exists in database
   */
  addEventLoginListener = (isValidUSer: isValidUser) => {
    this.buttonEl?.addEventListener('click', async e => {
      e.preventDefault()

      const userData: IUser = {
        email: this.loginFormEl.email.value,
        password: this.loginFormEl.password.value,
      }

      const inputCheck = this.validationForm.validationLogin(userData)
      const isValidation = this.isValidation(inputCheck)

      if (isValidation) {
        const isUSer = isValidUSer(userData)

        if (isUSer) {
          this.resetLoginForm()

          window.location.href = Path.Home
        }
      }
    })
  }

  //----- METHOD -----//

  resetLoginForm = () => {
    this.loginFormEl.email.value = DefaultValues.EmptyString
    this.loginFormEl.password.value = DefaultValues.EmptyString
  }

  /**
   * Method to check validation on UI
   * @param {Array} inputs Array of input object lists to show/remove errors on the UI
   * inputs[
   *  {
   *    field: "email",
   *    isValid: false,
   *    message: "The email is required"
   *  },
   *  {
   *    field: "password",
   *    isValid: true,
   *  }
   * ]
   * @returns {Boolean} form is validated
   */
  isValidation = (inputs: fieldCheck[]) => {
    let isValid = true

    inputs.forEach(input => {
      const inputEl = this.loginFormEl[input.field as string]
      const errorEl = inputEl.nextElementSibling

      if (input.isValid) this.error.clearError(inputEl, errorEl)
      else {
        this.error.showError(inputEl, errorEl, input.message!)

        isValid = false
      }
    })

    return isValid
  }
}

export default LoginView
