import { path } from '../enums/enums'
import CardModel, { ICard } from '../models/cardModel'
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

  saveCard = async (cardData: ICard): Promise<void> => {
    const newCard = new CardModel(cardData)
    await this.postItem(newCard)

    this.cards.push(newCard)
  }

  deleteCard = async (id: string): Promise<void> => {
    await this.deleteItem(id)

    this.cards = this.cards.filter(card => card.id !== id)
  }
}

export default CardService
