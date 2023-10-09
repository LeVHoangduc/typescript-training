import { DataSources, HTMLAttribute, Status } from '../enums/enums'
import { ICard } from '../models/cardModel'

type getCardDetail = (id: string) => ICard | undefined
type openConfirmModal = (itemDelete: string, type: string) => void
type openCardModal = () => void
type setDataForm = (card: ICard, id: string) => void

class ModalDetailView {
  private detailModalEl: HTMLFormElement
  private closeDetailModalEl: HTMLElement

  private btnDeleteEl: HTMLElement
  private btnEditEl: HTMLElement

  private cardListEl: HTMLElement
  private description: HTMLElement
  private wordEl: HTMLElement

  private confirmFormEl: HTMLElement
  private overlayEl: HTMLElement

  constructor() {
    this.detailModalEl = document.querySelector('.modal-detail')!
    this.closeDetailModalEl = document.querySelector('.modal-detail__close')!

    this.btnDeleteEl = document.querySelector('.modal-detail__button__delete')!
    this.btnEditEl = document.querySelector('.modal-detail__button__edit')!

    this.cardListEl = document.querySelector('.card-list__body')!
    this.description = document.querySelector('.modal-detail__description')!
    this.wordEl = document.querySelector('.modal-detail__content')!

    this.confirmFormEl = document.querySelector('.modal-confirm')!
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
        const cardData = getCardDetail(cardEl.getAttribute(HTMLAttribute.DataID) as string) as ICard

        this.setDataDetailModal(cardData)
      }
    })
  }

  addEventCloseDetailListener = () => {
    this.closeDetailModalEl.addEventListener('click', () => {
      this.closeDetailModal()
    })
  }

  /**
   * Method to add an event listener to the delete button.
   */
  addEventDeleteListener = (openConfirmModal: openConfirmModal) => {
    this.btnDeleteEl.addEventListener('click', e => {
      e.preventDefault()

      const cardEl = this.wordEl.textContent

      if (cardEl) openConfirmModal(cardEl, DataSources.Card)
    })
  }

  /**
   * Adds an event listener to handle the editing of a card.
   * @param {Function} openCardModal - Function to open the card modal for editing.
   * @param {Function} getCardDetail - Function to retrieve card details.
   * @param {Function} setDataForm - Function to set data in the edit form for the card.
   */
  addEventEditListener = (
    openCardModal: openCardModal,
    getCardDetail: getCardDetail,
    setDataForm: setDataForm
  ) => {
    this.btnEditEl.addEventListener('click', async e => {
      e.preventDefault()

      // Show the modal card for editing.
      openCardModal()

      const cardID = this.detailModalEl.getAttribute(HTMLAttribute.DataID)

      if (cardID) {
        // Get card details for editing.
        const cardDetails = getCardDetail(cardID) as ICard

        // Load the current card data into the edit form.
        setDataForm(cardDetails, cardID)

        // Close the detail modal and set it to editing mode.
        this.detailModalEl.classList.remove(Status.Open)
        this.detailModalEl.setAttribute(HTMLAttribute.IsEdit, Status.On)
      }
    })
  }

  /**
   * Opens the detail modal for a specific card and populates it with card details.
   * @param {Function} getCardDetail - Function to retrieve card details.
   * @param {HTMLElement} card - The card element for which to open the detail modal.
   */
  openDetailModal = (getCardDetail: getCardDetail, card: HTMLElement) => {
    // Retrieve card details based on the data-id attribute of the selected card.
    const cardData = getCardDetail(card.getAttribute(HTMLAttribute.DataID) as string) as ICard

    // Populate the detail modal with the card data.
    this.setDataDetailModal(cardData)

    // Set the status attribute to indicate that the detail modal is in search mode.
    this.detailModalEl.setAttribute(HTMLAttribute.IsSearch, Status.On)
  }

  /**
   * Sets data for the detail modal by populating it with card details.
   * @param {ICard} cardData - The card data to be displayed in the detail modal.
   */
  setDataDetailModal = (cardData: ICard) => {
    // Load the data-id attribute for use in the confirmation form for deleting.
    this.confirmFormEl.setAttribute(HTMLAttribute.DataID, cardData.id as string)

    // Load the data-id attribute for the detail modal.
    this.detailModalEl.setAttribute(HTMLAttribute.DataID, cardData.id as string)

    // Populate the detail modal with card details.
    this.wordEl.textContent = `${cardData.word}`
    this.description.textContent = `${cardData.description}`

    // Display the detail modal and overlay.
    this.detailModalEl.classList.add(Status.Open)
    this.overlayEl.classList.add(Status.Open)
  }

  closeDetailModal = () => {
    this.detailModalEl.classList.remove('open')
    this.overlayEl.classList.remove('open')
  }
}

export default ModalDetailView
