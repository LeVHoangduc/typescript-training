import { path } from '../enums/enums'
import CardModel from '../models/cardModel'
import ApiService from './apiService'

class CardService extends ApiService<CardModel> {
  private cards: CardModel[]

  constructor() {
    super(path.card)
    this.init()
  }

  init = async (): Promise<void> => {
    const data = await this.getList()
    this.cards = data.map(card => new CardModel(card))
  }

  getCardList = (): CardModel[] => this.cards
}

export default CardService
