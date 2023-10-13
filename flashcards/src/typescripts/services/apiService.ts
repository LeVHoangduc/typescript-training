import API_BASE_URL from '../constants/api'
import { ApiRequest } from '../enums/enums'

class ApiService<T> {
  private baseUrl: string
  private path: string
  /**
   * Constructor function for ApiService object.
   * @param {String} path
   */
  constructor(path: string) {
    this.baseUrl = API_BASE_URL
    this.path = path
  }

  /**
   * Method to return an array of object list
   * @returns {Array}
   */
  protected getList = (): Promise<T[]> => {
    return this.sendRequest<T[]>(`${this.path}`, ApiRequest.Get)
  }

  /**
   * Method to fetch details of an item from the API.
   * @param {String} id - The ID of the item to retrieve.
   * @return {Promise<Object>} A promise that resolves to the retrieved data.
   */

  protected getDetail = (id: number): Promise<T> => {
    return this.sendRequest<T>(`${this.path}/${id}`, ApiRequest.Get)
  }

  /**
   * Send POST HTTP request.
   * @param {Object} data
   * @returns {Promise<Object>} response from server.
   */
  protected postItem = async (data: T): Promise<void> => {
    await this.sendRequest(`${this.path}`, ApiRequest.Post, data)
  }

  /**
   * Send PATCH HTTP request.
   * @param {String} id
   */
  protected editItem = async (id: string, data: T): Promise<void> => {
    await this.sendRequest<T>(`${this.path}/${id}`, ApiRequest.Patch, data)
  }

  /**
   * Send DELETE HTTP request.
   * @param {String} id
   * @returns {Promise<Object>} response from server.
   */
  protected deleteItem = async (id: string): Promise<void> => {
    await this.sendRequest(`${this.path}/${id}`, ApiRequest.Delete)
  }

  /**
   * MEthod to send an HTTP request to the API endpoint.
   * @param {String} path - The endpoint path for the request.
   * @param {String} method - The HTTP method (GET, POST, PUT, DELETE, etc.).
   * @param {Object} body - The request body (optional).
   * @return {Promise} A promise that resolves to the server response data.
   * @throws {Error} If the request was not successful.
   */
  protected sendRequest = async <T>(path: string, method: string, body?: T): Promise<T> => {
    const url = `${this.baseUrl}${path}`
    const response: Response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    if (response.ok) {
      return (await response.json()) as T
    } else {
      throw new Error('Error while sending request')
    }
  }
}

export default ApiService
