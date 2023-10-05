import { DefaultValues } from '../enums/enums'
import CardModel, { ICard } from '../models/cardModel'
import Template from '../templates/templates'

type cardList = () => CardModel[]

class CardView {
  cardListEl: HTMLElement
  inputEl: HTMLElement
  constructor() {
    this.cardListEl = document.querySelector('.card-list__body')!
    this.inputEl = document.querySelector('.header__search__input')!
  }

  //----- RENDERING -----//

  /**
   * Render the list of cards based on data from Models filtered by the specified category.
   * @param {Function} cardList - A function that returns a Promise of card data.
   * @param {String} category - The category of cards to be rendered.
   * @returns {Boolean} - Returns true when rendering is complete.
   */
  renderCardList = (cardList: cardList, category: string) => {
    // Show empty or loading effect
    const cardListData = cardList()
    console.log(cardListData)
    console.log(category)

    // Clear existing card elements before loading new data
    this.cardListEl.innerHTML = DefaultValues.EmptyString

    // Filter and render cards based on the specified category
    const cards: ICard[] = cardListData.filter((card: ICard) => card.flashcards === category)

    cards.forEach(card => {
      this.renderCard(card)
    })

    return true
  }

  /**
   * Render an individual card using a provided card object.
   * @param {Object} card - The card object containing information to be rendered.
   */
  renderCard = (card: ICard) => {
    const cardTemplate = Template.renderCard(card)

    if (this.cardListEl) {
      this.cardListEl.innerHTML += cardTemplate
    }
  }
}

export default CardView
