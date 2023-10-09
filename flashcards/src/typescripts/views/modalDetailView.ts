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
   * Method to add an event listener for the edit button.
   * @param {Function} getCardDetail - Function to fetch card details.
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
        const getCardID = getCardDetail(cardID) as ICard

        // Load current data into the edit form.
        setDataForm(getCardID, cardID)
        this.detailModalEl.classList.remove(Status.Open)
        // Set status is editing for modal detail
        this.detailModalEl.setAttribute(HTMLAttribute.IsEdit, Status.On)
      }
    })
  }

  openDetailModal = (getCardDetail: getCardDetail, card: HTMLElement) => {
    const cardData = getCardDetail(card.getAttribute(HTMLAttribute.DataID) as string) as ICard

    this.setDataDetailModal(cardData)
    this.detailModalEl.setAttribute(HTMLAttribute.IsSearch, Status.On)
  }

  closeDetailModal = () => {
    this.detailModalEl.classList.remove('open')
    this.overlayEl.classList.remove('open')
  }

  setDataDetailModal = (cardData: ICard) => {
    // Load data-id to confirm form for deleting
    this.confirmFormEl.setAttribute(HTMLAttribute.DataID, cardData.id as string)

    // Load data to detail form
    this.detailModalEl.setAttribute(HTMLAttribute.DataID, cardData.id as string)

    this.wordEl.textContent = `${cardData.word}`
    this.description.textContent = `${cardData.description}`

    this.detailModalEl.classList.add(Status.Open)
    this.overlayEl.classList.add(Status.Open)
  }
}

export default ModalDetailView
