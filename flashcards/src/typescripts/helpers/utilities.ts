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
}

export const utilities = new Utilities()
