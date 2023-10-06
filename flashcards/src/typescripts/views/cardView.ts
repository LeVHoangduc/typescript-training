import { DataSources, DefaultValues } from '../enums/enums'
import CardModel, { ICard } from '../models/cardModel'
import Template from '../templates/templates'

type cardList = () => CardModel[]
type openModalConfirm = (itemDelete: string, type: string) => void

class CardView {
  private cardListEl: HTMLElement
  private cardContentEl: NodeListOf<Element>

  private inputEl: HTMLElement
  private titleEl: HTMLElement

  private confirmFormEl: HTMLFormElement

  constructor() {
    this.cardListEl = document.querySelector('.card-list__body')!

    this.inputEl = document.querySelector('.header__search__input')!
    this.titleEl = document.querySelector('.card-list__title')!

    this.confirmFormEl = document.querySelector('.modal-confirm')!
  }

  //----- EVENT LISTENER -----//

  addEventDeleteListener = (openModalConfirm: openModalConfirm) => {
    this.cardContentEl = document.querySelectorAll('.card-list__content')!

    this.cardContentEl.forEach(card => {
      card.addEventListener('click', e => {
        const btnDeleteEl = (e.target as HTMLElement).closest('.card-delete')

        if (btnDeleteEl) {
          const itemDelete = btnDeleteEl?.parentElement?.getAttribute('item') as string

          const id = btnDeleteEl?.parentElement?.getAttribute('data-id') as string
          const type = btnDeleteEl?.parentElement?.getAttribute('type') as string

          this.confirmFormEl.setAttribute('data-id', id)
          this.confirmFormEl.setAttribute('type', type)

          console.log(itemDelete, type)

          openModalConfirm(itemDelete, type)
        }
      })
    })
  }

  //----- RENDERING -----//

  /**
   * Render the list of cards based on data from Models filtered by the specified category.
   * @param {Function} cardList - A function that returns a Promise of card data.
   * @param {String} category - The category of cards to be rendered.
   * @returns {Boolean} - Returns true when rendering is complete.
   */
  renderCardList = (getCardList: cardList, category: string) => {
    // Show empty or loading effect
    const cardListData = getCardList()

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

  //----- METHODS -----//

  resetCards = () => {
    this.titleEl.textContent = DataSources.flashcards
    this.cardListEl.innerHTML = DefaultValues.EmptyString
  }
}

export default CardView
