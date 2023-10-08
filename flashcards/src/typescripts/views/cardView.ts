import { DataSources, DefaultValues, HTMLAttribute, Status } from '../enums/enums'
import CardModel, { ICard } from '../models/cardModel'
import Template from '../templates/templates'

type cardList = () => CardModel[]
type openConfirmModal = (itemDelete: string, type: string) => void
type openCardForm = () => void
type setDataForm = (card: ICard, id: string) => void
type getCardDetail = (id: string) => ICard | undefined

class CardView {
  private cardListEl: HTMLElement
  private cardContentEl: NodeListOf<Element>

  private titleEl: HTMLElement

  private confirmFormEl: HTMLFormElement
  private detailModalEl: HTMLElement

  constructor() {
    this.cardListEl = document.querySelector('.card-list__body')!
    this.titleEl = document.querySelector('.card-list__title')!

    this.confirmFormEl = document.querySelector('.modal-confirm')!
    this.detailModalEl = document.querySelector('.modal-detail')!
  }

  //----- EVENT LISTENER -----//

  addEventDeleteListener = (openConfirmModal: openConfirmModal) => {
    this.cardContentEl = document.querySelectorAll('.card-list__content')!

    this.cardContentEl.forEach(card => {
      card.addEventListener('click', e => {
        const btnDeleteEl = (e.target as HTMLElement).closest('.card-delete')

        if (btnDeleteEl) {
          const itemDelete = btnDeleteEl?.parentElement?.getAttribute(HTMLAttribute.Item) as string

          const id = btnDeleteEl?.parentElement?.getAttribute(HTMLAttribute.DataID) as string
          const type = btnDeleteEl?.parentElement?.getAttribute(HTMLAttribute.Type) as string

          this.confirmFormEl.setAttribute(HTMLAttribute.DataID, id)
          this.confirmFormEl.setAttribute(HTMLAttribute.Type, type)

          openConfirmModal(itemDelete, type)
        }
      })
    })
  }

  /**
   * Method to add an event listener for the edit button.
   * @param {Function} getCardDetail - Function to fetch card details.
   */
  addEventEditListener = (
    openCardForm: openCardForm,
    getCardDetail: getCardDetail,
    setDataForm: setDataForm
  ) => {
    this.cardContentEl.forEach(card => {
      card.addEventListener('click', e => {
        const btnEditEl = (e.target as HTMLElement).closest('.card-edit')

        if (btnEditEl) {
          // Show the edit modal
          openCardForm()

          const cardID = btnEditEl.parentElement?.getAttribute(HTMLAttribute.DataID)

          if (cardID) {
            // Fetch card details for editing
            const getCardID = getCardDetail(cardID) as ICard

            // Load current data into the edit form
            setDataForm(getCardID, cardID)
            this.detailModalEl.classList.remove(Status.Open)
          }
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
    this.titleEl.textContent = DataSources.Flashcards
    this.cardListEl.innerHTML = DefaultValues.EmptyString
  }
}

export default CardView
