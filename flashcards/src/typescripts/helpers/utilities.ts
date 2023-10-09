import { DataSources } from '../enums/enums'

class Utilities {
  private categoryCurrent: string
  constructor() {}
  /**
   * Saves the current category to the class instance.
   * @param {string} categoryCurrent - The category to be saved.
   * @returns {string} The saved category.
   */
  saveCategoryCurrent = (categoryCurrent: string) => (this.categoryCurrent = categoryCurrent)

  getCategoryCurrent = () => this.categoryCurrent

  /**
   * Checks if a user is logged in by inspecting the localStorage.
   * @returns {boolean} - True if the user is logged in, false otherwise.
   */
  saveStatusLogin = (): boolean => {
    const isUserLogged = localStorage.getItem(DataSources.User)

    return isUserLogged ? true : false
  }

  /**
   * Delays execution asynchronously for the specified time.
   * @param {number} time - The time to delay in milliseconds.
   * @returns {Promise<void>} A promise that resolves after the specified delay time.
   */
  notificationDelay = (time: number): Promise<void> =>
    new Promise(resolve => {
      setTimeout(() => resolve(), time)
    })
}

export const utilities = new Utilities()
