import CardService from './cardService'
import FlashcardsService from './flashcardsService'

class Service {
  cardService: CardService
  flashcardsService: FlashcardsService

  constructor() {
    this.cardService = new CardService()
    this.flashcardsService = new FlashcardsService()
  }

  init = async (): Promise<void> => {
    this.cardService.init()
    await this.flashcardsService.init()
  }
}

export default Service
