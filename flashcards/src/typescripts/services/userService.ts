import { DataSources, Path } from '../enums/enums'
import { localStorageHelper } from '../helpers/localStorageHelper'
import UserModel, { IUser } from '../models/userModel'
import ApiService from './apiService'

class UserService extends ApiService<UserModel> {
  private users: UserModel[]

  constructor() {
    super(Path.User)
    this.init()
  }

  init = async (): Promise<void> => {
    try {
      const data = await this.getList()
      this.users = data.map(user => new UserModel(user))
    } catch (error) {}
  }

  getUserList = (): UserModel[] => this.users
  /**
   * Method to check if the provided user credentials are valid and save to local storage
   * @param user - An object containing user credentials (email and password)
   * @returns True if the user is valid, otherwise false
   */
  isValidUser = (user: IUser) => {
    const userList = this.getUserList()

    const email = user.email
    const password = user.password

    const validUser = userList.some(user => user.email === email && user.password === password)

    if (validUser) {
      const userEmail = user.email

      localStorageHelper.saveLocalStorage(DataSources.User, userEmail)
    }

    return validUser
  }
}

export default UserService
