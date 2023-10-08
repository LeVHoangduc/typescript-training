import { v4 as uuidv4 } from 'uuid'

export interface IUser {
  id?: string
  email: string
  password: string
}

class UserModel implements IUser {
  id: string
  email: string
  password: string

  constructor(data: IUser) {
    this.id = data.id ? data.id : uuidv4()
    this.email = data.email
    this.password = data.password
  }
}

export default UserModel
