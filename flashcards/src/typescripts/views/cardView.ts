import { DEFAULT_VALUES } from '../constants/defaultValues'
import { DataSources, HTMLAttribute, Status } from '../enums/enums'
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

  /**
   * Attaches event listeners to handle delete button clicks within card content elements
   * @param openConfirmModal - A function to open a confirmation modal dialog
   */
  addEventDeleteListener = (openConfirmModal: openConfirmModal) => {
    this.cardContentEl = document.querySelectorAll('.card-list__content')!

    this.cardContentEl.forEach(card => {
      // Add a click event listener to each card content element
      card.addEventListener('click', e => {
        // Find the nearest ancestor with the class 'card-delete' to the clicked element
        const btnDeleteEl = (e.target as HTMLElement).closest('.card-delete')

        // If a delete button element is found
        if (btnDeleteEl) {
          // Extract values of relevant attributes from the parent element
          const itemDelete = btnDeleteEl?.parentElement?.getAttribute(HTMLAttribute.Item) as string
          const id = btnDeleteEl?.parentElement?.getAttribute(HTMLAttribute.DataID) as string
          const type = btnDeleteEl?.parentElement?.getAttribute(HTMLAttribute.Type) as string

          // Set attributes on the confirmation form element
          this.confirmFormEl.setAttribute(HTMLAttribute.DataID, id)
          this.confirmFormEl.setAttribute(HTMLAttribute.Type, type)

          // Trigger the provided openConfirmModal function with extracted data
          openConfirmModal(itemDelete, type)
        }
      })
    })
  }

  /**
   * Adds an event listener to handle edit button clicks within card content elements
   * @param openCardForm - A function to open the card edit form
   * @param getCardDetail - A function to fetch card details for editing
   * @param setDataForm - A function to load current data into the edit form
   */
  addEventEditListener = (
    openCardForm: openCardForm,
    getCardDetail: getCardDetail,
    setDataForm: setDataForm
  ) => {
    this.cardContentEl.forEach(card => {
      // Add a click event listener to each card content element
      card.addEventListener('click', e => {
        // Find the nearest ancestor with the class 'card-edit' to the clicked element
        const btnEditEl = (e.target as HTMLElement).closest('.card-edit')

        // If an edit button element is found
        if (btnEditEl) {
          // Show the edit modal
          openCardForm()

          // Retrieve the card ID from the parent element's attribute
          const cardID = btnEditEl.parentElement?.getAttribute(HTMLAttribute.DataID)

          if (cardID) {
            // Fetch card details for editing
            const getCardID = getCardDetail(cardID) as ICard

            // Load current data into the edit form
            setDataForm(getCardID, cardID)

            // Close the detail modal if it's open
            this.detailModalEl.classList.remove(Status.Open)
          }
        }
      })
    })
  }

  //----- RENDERING -----//

  /**
   * Renders a list of cards based on data from Models, filtered by the specified category
   * @param getCardList - A function to retrieve the list of cards from Models
   * @param category - The category of cards to be rendered
   * @returns {Boolean}  Returns true when rendering is complete
   */
  renderCardList = (getCardList: cardList, category: string) => {
    // Retrieve card data, possibly showing an empty or loading effect
    const cardListData = getCardList()

    // Clear the existing card elements before loading new data
    this.cardListEl.innerHTML = DEFAULT_VALUES.EMPTY_STRING

    // Filter and render cards based on the specified category
    const cards: ICard[] = cardListData.filter((card: ICard) => card.flashcards === category)

    // Render each card in the filtered list
    cards.forEach(card => {
      this.renderCard(card)
    })

    // Return true to indicate that rendering is complete
    return true
  }

  /**
   * Render an individual card using a provided card object
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
    this.cardListEl.innerHTML = DEFAULT_VALUES.EMPTY_STRING
  }
}

export default CardView
