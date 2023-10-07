import { DataSources } from '../enums/enums'
import { ICard } from '../models/cardModel'
import Error from './errorView'

type getCardDetail = (id: string) => ICard | undefined
type openModalConfirm = (itemDelete: string, type: string) => void

class ModalDetailView {
  private error: Error
  private detailModalEl: HTMLFormElement
  private btnDeleteEl: HTMLElement
  private btnEditEl: HTMLElement

  private cardListEl: HTMLElement
  private description: HTMLElement
  private wordEl: HTMLElement

  private confirmFormEl: HTMLElement
  private overlayEl: HTMLElement

  constructor() {
    this.error = new Error()

    this.detailModalEl = document.querySelector('.modal-detail')!
    this.btnDeleteEl = document.querySelector('.modal-detail__button__delete')!
    this.btnEditEl = document.querySelector('.modal-detail__button__edit')!

    this.confirmFormEl = document.querySelector('.modal-confirm')!

    this.wordEl = document.querySelector('.modal-detail__content')!
    this.description = document.querySelector('.modal-detail__description')!

    this.cardListEl = document.querySelector('.card-list__body')!

    this.overlayEl = document.querySelector('.overlay')!
  }

  //----- EVENT LISTENER -----//

  /**
   * Method to add an event listener for opening the modal when a card is clicked.
   * @param {Function} getCardDetail - Function to fetch card details.
   */
  addEventOpenDetailListener = (getCardDetail: getCardDetail) => {
    // this.cardListEl = document.querySelector('.card-list__body')!
    this.cardListEl?.addEventListener('click', e => {
      // prevent if click delete button
      const isCardEl = (e.target as HTMLElement).classList.contains('card-button')

      if (!isCardEl) {
        // Get card data and populate the detail form.
        const cardEl = (e.target as HTMLElement).closest('.card-list__content') as HTMLElement
        const cardData = getCardDetail(cardEl.getAttribute('data-id') as string) as ICard

        this.confirmFormEl.setAttribute('data-id', cardData.id as string)

        // Populate data for form edit
        this.detailModalEl.setAttribute('data-id', cardData.id as string)

        this.wordEl.textContent = `${cardData.word}`
        this.description.textContent = `${cardData.description}`

        this.detailModalEl.classList.add('open')

        this.overlayEl.classList.add('open')
      }
    })
  }

  /**
   * Method to add an event listener to the delete button.
   */
  addEventDeleteListener = (openModalConfirm: openModalConfirm) => {
    this.btnDeleteEl.addEventListener('click', e => {
      e.preventDefault()

      const cardEl = this.wordEl.textContent

      if (cardEl) openModalConfirm(cardEl, DataSources.card)
    })
  }

  /**
   * Method to add an event listener for the edit button.
   * @param {Function} getCardDetail - Function to fetch card details.
   */
  //   addEventEditListener = getCardDetail => {
  //     this.btnFormDetailEl.edit?.addEventListener('click', async e => {
  //       e.preventDefault()

  //       // Show the edit modal.
  //       this.cardFormEl = document.querySelector('.modal-card')
  //       this.cardFormEl.classList.add('open')

  //       const cardID = this.detailFormEl.getAttribute('data-id')

  //       // Fetch card details for editing.
  //       const getCardID = await getCardDetail(cardID)

  //       // Load current data into the edit form.
  //       this.handleEdit(cardID, getCardID)
  //       this.detailFormEl.classList.remove('open')
  //     })
  //   }

  //----- METHOD   -----//

  //   openConfirmDelete = () => {
  // Get the type (e.g., "card", "language")
  // const type = this.cardEl.getAttribute('type')

  // Capitalize the language to be removed
  //     const cardContent = this.cardEl.querySelector('.card__term').textContent
  //     const card = cardContent.charAt(0).toUpperCase() + cardContent.slice(1)

  //     this.confirmFormEl.classList.add('open')
  //     this.confirmMessageEl.textContent = `Do you want to delete ${card} ${type}`
  //     this.confirmFormEl.classList.add('open')
  //     this.detailFormEl.classList.remove('open')

  //     this.overlayEl.classList.add('open')
  //   }

  /**
   * Handle the editing of a card's details.
   * @param {string} cardId - The ID of the card being edited.
   * @param {Object} card - The card object containing details to populate the form with.
   */
  //   handleEdit = (cardId, card) => {
  // Set data-id attribute to link modal-card with modal-detail
  // this.cardFormEl.setAttribute('data-id', cardId)

  // Populate form fields with card details
  //     this.cardFormEl.language.value = card.language
  //     this.cardFormEl.word.value = card.word
  //     this.cardFormEl.type.value = card.type
  //     this.cardFormEl.meaning.value = card.meaning
  //     this.cardFormEl.description.value = card.description
  //     this.cardFormEl.captionPhoto.value = card.captionPhoto
  //   }
}

export default ModalDetailView
