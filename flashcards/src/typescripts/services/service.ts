import CardService from './cardService'
import FlashcardsService from './flashcardsService'
import UserService from './userService'

class Service {
  cardService: CardService
  flashcardsService: FlashcardsService
  userService: UserService

  constructor() {
    this.cardService = new CardService()
    this.flashcardsService = new FlashcardsService()
    this.userService = new UserService()
  }

  init = async (): Promise<void> => {
    await this.flashcardsService.init()
    await this.cardService.init()
    await this.userService.init()
  }
}

export default Service
