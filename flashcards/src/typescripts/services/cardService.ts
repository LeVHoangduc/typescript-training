import { DefaultValues, Path } from '../enums/enums'
import CardModel, { ICard } from '../models/cardModel'
import ApiService from './apiService'

class CardService extends ApiService<CardModel> {
  private cards: CardModel[]

  constructor() {
    super(Path.Card)
    this.init()
  }

  init = async (): Promise<void> => {
    const data = await this.getList()
    this.cards = data.map(card => new CardModel(card))
  }

  getCardList = (): CardModel[] => this.cards

  /**
   * Method to retrieve detailed information for a specific card from the API.
   * @param {string} id - The ID of the card to retrieve details for.
   * @returns {Promise<Object>} A promise that resolves with the detailed card object.
   */
  getCardDetail = (id: string) => this.cards.find(card => card.id === id) as ICard

  addCard = async (cardData: ICard): Promise<void> => {
    const newCard = new CardModel(cardData)
    await this.postItem(newCard)

    this.cards.push(newCard)
  }

  editCard = async (cardData: ICard): Promise<void> => {
    const card: CardModel = new CardModel(cardData)

    await this.editItem(card.id, card)

    this.cards = this.cards.map(item => {
      if (item.id === card.id) {
        return card
      }
      return item
    })
  }

  deleteCard = async (id: string): Promise<void> => {
    await this.deleteItem(id)

    this.cards = this.cards.filter(card => card.id !== id)
  }

  searchCard = (searchData: string) => {
    const cardData = this.cards.filter(card => card.word.toLowerCase().includes(searchData))

    return searchData === DefaultValues.EmptyString ? DefaultValues.EmptyArray : cardData
  }
}

export default CardService
