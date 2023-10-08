import { DataSources, HTMLAttribute, Status } from '../enums/enums'
import { ICard } from '../models/cardModel'
import Error from './errorView'

type getCardDetail = (id: string) => ICard | undefined
type openModalConfirm = (itemDelete: string, type: string) => void
type openModalCard = () => void
type setDataForm = (card: ICard, id: string) => void

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
        const cardData = getCardDetail(cardEl.getAttribute(HTMLAttribute.DataID) as string) as ICard

        this.confirmFormEl.setAttribute(HTMLAttribute.DataID, cardData.id as string)

        // Load data to detail form
        this.detailModalEl.setAttribute(HTMLAttribute.DataID, cardData.id as string)

        this.wordEl.textContent = `${cardData.word}`
        this.description.textContent = `${cardData.description}`

        this.detailModalEl.classList.add(Status.Open)
        this.overlayEl.classList.add(Status.Open)
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

      if (cardEl) openModalConfirm(cardEl, DataSources.Card)
    })
  }

  /**
   * Method to add an event listener for the edit button.
   * @param {Function} getCardDetail - Function to fetch card details.
   */
  addEventEditListener = (
    openModalCard: openModalCard,
    getCardDetail: getCardDetail,
    setDataForm: setDataForm
  ) => {
    this.btnEditEl.addEventListener('click', async e => {
      e.preventDefault()

      // Show the modal card for editing.
      openModalCard()

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
}

export default ModalDetailView
