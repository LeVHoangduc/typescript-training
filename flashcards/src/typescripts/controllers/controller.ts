import { DefaultValues } from '../enums/enums'
import { utilities } from '../helpers/utilities'
import CardModel, { ICard } from '../models/cardModel'
import FlashcardsModel, { IFlashcards } from '../models/flashcardsModels'
import Service from '../services/service'
import View from '../views/view'

class Controller {
  private service: Service
  private view: View

  /**
   * Constructor of Controller object
   * @param {Service} service
   * @param {View} view
   */
  constructor(service: Service, view: View) {
    this.service = service
    this.view = view
  }

  init = async (): Promise<void> => {
    await this.service.init()
    this.initFlashcardsView()
    this.initSearchView()

    this.initModalFlashcardsCardView()
    this.initModalCardView()
    this.initModalDetailView()
    this.initModalConfirm()

    this.initOverLay()
  }

  //-----   FLASHCARDS CONTROLLER     -----//

  initFlashcardsView = () => {
    this.view.flashcardsView.renderFlashcardsView(this.getFlashcards)
    this.view.flashcardsView.createSlider()

    this.view.flashcardsView.addEventShowCard(this.loadCards)
    this.view.flashcardsView.addEventDeleteFlashcards(this.openConfirmModal)
  }

  //-----   SEARCH CONTROLLER         -----//
  initSearchView = () => {
    this.view.searchView.addEventSearchCardListener(this.searchCard)
    this.view.searchView.addEventEnterListener(this.searchCard, this.openOverlayError)
    this.view.searchView.addEventInputListener()
    this.view.searchView.addEventClickCardListener(this.openDetailModal, this.closeOverlayError)
  }

  //-----   MODAL CONTROLLER          -----//

  initModalConfirm = () => {
    this.view.modalConfirmView.addEventConfirm(
      this.deleteFlashcards,
      this.loadFlashcards,
      this.deleteCard,
      this.loadCards,
      this.resetCards
    )

    this.view.modalConfirmView.addEventCloseModalConfirm()
  }

  initModalFlashcardsCardView = () => {
    this.view.modalFlashcardsView.addEventOpenFormListener()
    this.view.modalFlashcardsView.addEventAddFlashcards(this.saveFlashcards, this.loadFlashcards)
  }

  initModalCardView = () => {
    this.view.modalCardView.addEventOpenFormListener()
    this.view.modalCardView.addEventCloseFormListener()
    this.view.modalCardView.addEventReturnFormListener()
    this.view.modalCardView.addEventSubmission(this.saveCard, this.loadCards)
  }

  initModalDetailView = () => {
    this.view.modalDetailView.addEventOpenDetailListener(this.getCardDetail)
    this.view.modalDetailView.addEventDeleteListener(this.openConfirmModal)
    this.view.modalDetailView.addEventEditListener(
      this.openCardModal,
      this.getCardDetail,
      this.setDataForm
    )
  }
  //-----     OVERLAY CONTROLLER     -----//

  initOverLay = () => {
    this.view.overlayView.addEventClickOutSide(this.resetFlashcardsForm, this.resetCardForm)
    this.view.overlayView.addEventCloseFormListener(this.resetFlashcardsForm, this.resetCardForm)
    this.view.overlayView.addEventEscapeListener()
  }

  //-----     FLASHCARDS METHODS     -----//

  /**
   * Method to save a flashcards
   * @param {Object} flashcardsData - The flashcards object to be saved.
   * @returns {Promise<boolean>} - A Promise that resolves to true if add success, otherwise false.
   */
  saveFlashcards = async (flashcardsData: IFlashcards): Promise<void> => {
    try {
      await this.service.flashcardsService.addFlashcards(flashcardsData)

      console.log('success')
    } catch (error) {
      console.log('error')
    }
  }

  /**
   * Method to delete a language card by its ID.
   * @param {string} id - The ID of the language card to be deleted.
   */
  deleteFlashcards = async (id: string) => {
    try {
      await this.service.flashcardsService.deleteFlashcards(id)
      console.log('done')
    } catch (error) {
      console.log('error')
    }
  }

  getFlashcards = () => this.service.flashcardsService.getFlashcards()

  loadFlashcards = () => {
    this.view.flashcardsView.renderFlashcardsView(this.getFlashcards)
  }

  //-----      CARDS METHODS         -----//

  saveCard = async (cardData: ICard): Promise<void> => {
    if (cardData.id) {
      try {
        await this.service.cardService.editCard(cardData)
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        await this.service.cardService.addCard(cardData)
      } catch (error) {
        console.log(error)
      }
    }
  }

  /**
   * Method to delete a card by its ID.
   * @param {string} id - The ID of the card to be deleted.
   */
  deleteCard = async (id: string) => {
    try {
      await this.service.cardService.deleteCard(id)
    } catch (error) {
      console.log(error)
    }
  }

  getCardList = () => this.service.cardService.getCardList()

  getCardDetail = (id: string) => {
    try {
      const data = this.service.cardService.getCardDetail(id) as ICard

      return data as ICard
    } catch (error) {
      console.log(error)
    }
  }
  /**
   * Method to load cards based on a specific category.
   * @param {string} category - The category for which to load cards.
   * @returns {boolean} - Returns true if cards are successfully loaded, otherwise false.
   */
  loadCards = (category: string = DefaultValues.Category) => {
    // view receive category and render as follow category

    this.view.cardView.renderCardList(this.getCardList, category)

    // Save category after loadCards to using when delete card
    utilities.saveCategoryCurrent(category)

    this.view.cardView.addEventDeleteListener(this.openConfirmModal)
    this.view.cardView.addEventEditListener(
      this.openCardModal,
      this.getCardDetail,
      this.setDataForm
    )
  }

  searchCard = (searchData: string): ICard[] => {
    return this.service.cardService.searchCard(searchData)
  }

  //-----      MODALS METHODS         -----//

  openConfirmModal = (itemDelete: string, type: string) => {
    this.view.modalConfirmView.openConfirmModal(itemDelete, type)
  }

  openCardModal = () => {
    this.view.modalCardView.openForm()
  }

  openDetailModal = (card: HTMLElement) => {
    this.view.modalDetailView.openDetailModal(this.getCardDetail, card)
  }

  setDataForm = (card: ICard, id: string) => {
    this.view.modalCardView.setDataForm(card, id)
  }

  resetCards = () => {
    this.view.cardView.resetCards()
  }

  resetFlashcardsForm = () => {
    this.view.modalFlashcardsView.resetFlashcardsForm()
  }

  resetCardForm = () => {
    this.view.modalCardView.resetCardForm()
  }

  //-----      OVERLAY METHODS        -----//

  openOverlayError = () => {
    this.view.overlayView.openOverlayError()
  }

  closeOverlayError = () => {
    this.view.overlayView.closeOverlayError()
  }
}

export default Controller
