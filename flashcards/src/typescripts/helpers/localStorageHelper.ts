class LocalStorageHelper<T> {
  constructor() {}

  /**
   * Save data to localStorage.
   * @param {string} key - The key under which the data will be stored.
   * @param {*} value - The data to be stored.
   */
  saveLocalStorage = (key: string, value: any): void => {
    const data = this.convertStringData(value)
    localStorage.setItem(key, data)
  }

  /**
   * Retrieve data from localStorage.
   * @param {string} key - The key of the data to be retrieved.
   * @returns {*} - The retrieved data.
   */
  getLocalStorage = (key: string): any => {
    const data = localStorage.getItem(key)

    if (data) {
      const parseData = this.convertObjectData(data)

      return parseData
    }
  }

  /**
   * Remove data from localStorage.
   * @param {string} key - The key of the data to be removed.
   */
  removeLocalStorage = (key: string): void => {
    localStorage.removeItem(key)
  }

  /**
   * Convert data to a JSON string.
   * @param {*} data - The data to be converted.
   * @returns {string} - The JSON string representation of the data.
   */
  convertStringData = (data: T): string => JSON.stringify(data)

  /**
   * Parse a JSON string into a JavaScript object.
   * @param {string} data - The JSON string to be parsed.
   * @returns {*} - The JavaScript object parsed from the JSON string.
   */
  convertObjectData = (data: string): T => JSON.parse(data)
}

export const localStorageHelper = new LocalStorageHelper()
