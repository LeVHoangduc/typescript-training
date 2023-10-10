import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../constants/constants'
import { DataSources, DefaultValues, Path, RequestState } from '../enums/enums'
import { localStorageHelper } from '../helpers/localStorageHelper'
import { utilities } from '../helpers/utilities'
import { ICard } from '../models/cardModel'
import { IFlashcards } from '../models/flashcardsModels'
import { IUser } from '../models/userModel'
import Service from '../services/service'
import View from '../views/view'

class Controller {
  private service: Service
  private view: View

  /**
   * Constructor of Controller object
   * @param {Service} service - Manage all operations on users
   * @param {View} view - Responsible for refreshing and changing the display screen
   */
  constructor(service: Service, view: View) {
    this.service = service
    this.view = view
  }

  //-----     LOGIN  CONTROLLER       -----//

  initLogin = async (): Promise<void> => {
    const location = window.location.pathname

    if (location === Path.Root || location === Path.Login) {
      localStorageHelper.removeLocalStorage(DataSources.User)
    }
    await this.initService()
    this.initLoginView()
  }

  initLoginView = () => {
    this.view.loginView.addEventLoginListener(this.isValidUser)
  }

  //-----       HOME CONTROLLER       -----//

  initHome = async (): Promise<void> => {
    if (utilities.saveStatusLogin()) {
      await this.initService()
      this.initFlashcardsView()
      this.initCardView()
      this.initSearchView()

      this.initModalFlashcardsCardView()
      this.initModalCardView()
      this.initModalDetailView()
      this.initModalConfirm()

      this.initOverLay()
      this.initProfileView()
    }
  }

  //-----   SERVICE CONTROLLER        -----//

  initService = async (): Promise<void> => {
    try {
      await this.service.init()
    } catch (error) {
      this.view.notificationView.showNotification(RequestState.Failed, ERROR_MESSAGE.LOADING_ERROR)
    }
  }

  //-----   PROFILE CONTROLLER        -----//

  initProfileView = () => {
    this.view.profileView.addEventOpenProfileListener(this.openOverlaySecond)
    this.view.profileView.addEventLogOutListener(this.closeOverlaySecond)
  }

  //-----   FLASHCARDS CONTROLLER     -----//

  initFlashcardsView = () => {
    this.view.flashcardsView.renderFlashcardsView(this.getFlashcards)
    this.view.flashcardsView.createSlider()
    this.view.flashcardsView.addEventShowCard(this.loadCards)
    this.view.flashcardsView.addEventDeleteFlashcards(this.openConfirmModal)
  }

  //-----   CARD CONTROLLER           -----//

  initCardView = () => {
    this.loadCards()
  }

  //-----   SEARCH CONTROLLER         -----//

  initSearchView = () => {
    this.view.searchView.addEventSearchCardListener(this.searchCard)
    this.view.searchView.addEventEnterListener(this.searchCard, this.openOverlaySecond)
    this.view.searchView.addEventClickCardListener(this.openDetailModal, this.closeOverlaySecond)
    this.view.searchView.addEventInputListener()
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
    this.view.modalFlashcardsView.addEventCloseFormListener()
    this.view.modalFlashcardsView.addEventAddFlashcards(this.saveFlashcards, this.loadFlashcards)
  }

  initModalCardView = () => {
    this.view.modalCardView.addEventOpenFormListener()
    this.view.modalCardView.addEventCloseFormListener()
    this.view.modalCardView.addEventOnKeyPressCloseListener()
    this.view.modalCardView.addEventReturnFormListener()
    this.view.modalCardView.addEventSubmission(this.saveCard, this.loadCards)
  }

  initModalDetailView = () => {
    this.view.modalDetailView.addEventOpenDetailListener(this.getCardDetail)
    this.view.modalDetailView.addEventCloseDetailListener()
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
    this.view.overlayView.addEventEscapeListener(this.resetFlashcardsForm, this.resetCardForm)
  }

  //-----     USER METHODS           -----//

  /**
   * Validates a user by checking if they are valid according to the UserService.
   * If the user is not valid, a notification with an error message is displayed.
   * @param {IUser} user - The user object to validate.
   * @returns {boolean} Returns true if the user is valid; otherwise, returns false.
   */
  isValidUser = (user: IUser) => {
    // Check if the user is valid using the UserService.
    const isUser = this.service.userService.isValidUser(user)

    // If the user is not valid, display an error notification.
    if (!isUser) {
      this.view.notificationView.showNotification(
        RequestState.Failed,
        ERROR_MESSAGE.INVALID_INFORMATION
      )
    }

    return isUser
  }

  //-----     FLASHCARDS METHODS     -----//

  /**
   * Method to save flashcards data.
   * @param {IFlashcards} flashcardsData - The flashcards data to be saved.
   * @returns {Promise<void>}  A Promise that resolves when the operation completes successfully.
   */
  saveFlashcards = async (flashcardsData: IFlashcards): Promise<void> => {
    try {
      // Attempt to add the flashcards data using the FlashcardsService.
      const isAdd = await this.service.flashcardsService.addFlashcards(flashcardsData)

      // Show a notification based on the result of the operation.
      if (isAdd) {
        this.view.notificationView.showNotification(
          RequestState.Failed,
          ERROR_MESSAGE.EXIST_FLASHCARDS
        )
      } else {
        this.view.notificationView.showNotification(
          RequestState.Success,
          SUCCESS_MESSAGE.ADD_FLASHCARDS
        )
      }
    } catch (error) {
      // Display an error notification in case of any exceptions.
      this.view.notificationView.showNotification(RequestState.Failed, ERROR_MESSAGE.SERVER_ERROR)
    }
  }

  /**
   * Method to delete flashcards by its ID.
   * @param {string} id - The ID of the flashcards to be deleted.
   */
  deleteFlashcards = async (id: string) => {
    try {
      await this.service.flashcardsService.deleteFlashcards(id)

      this.view.notificationView.showNotification(
        RequestState.Success,
        SUCCESS_MESSAGE.DELETE_FLASHCARDS
      )
    } catch (error) {
      this.view.notificationView.showNotification(RequestState.Failed, ERROR_MESSAGE.SERVER_ERROR)
    }
  }

  getFlashcards = () => this.service.flashcardsService.getFlashcards()

  loadFlashcards = () => {
    this.view.flashcardsView.renderFlashcardsView(this.getFlashcards)
  }

  //-----      CARDS METHODS         -----//

  /**
   * Save or edit a card's data depending on whether it has an ID
   * @param {ICard} cardData - The card data to be saved or edited
   * @returns {Promise<void>}  A Promise that resolves when the operation completes
   */
  saveCard = async (cardData: ICard): Promise<void> => {
    if (cardData.id) {
      // If the card has an ID, it is edited.
      try {
        // Attempt to edit the card using the CardService.
        await this.service.cardService.editCard(cardData)

        // Show a success notification after editing the card.
        this.view.notificationView.showNotification(RequestState.Success, SUCCESS_MESSAGE.EDIT_CARD)
      } catch (error) {
        // Display an error notification in case of any exceptions during editing.
        this.view.notificationView.showNotification(RequestState.Failed, ERROR_MESSAGE.SERVER_ERROR)
      }
    } else {
      // If the card does not have an ID, it is added as a new card.
      try {
        // Attempt to add the card using the CardService.
        await this.service.cardService.addCard(cardData)

        // Show a success notification after adding the new card.
        this.view.notificationView.showNotification(RequestState.Success, SUCCESS_MESSAGE.ADD_CARD)
      } catch (error) {
        // Display an error notification in case of any exceptions during addition.
        this.view.notificationView.showNotification(RequestState.Failed, ERROR_MESSAGE.SERVER_ERROR)
      }
    }
  }

  /**
   * Method to delete a card by its ID.
   * @param {string} id - The ID of the card to be deleted.
   */
  deleteCard = async (id: string) => {
    try {
      // Attempt to delete the card using the CardService.
      await this.service.cardService.deleteCard(id)

      // Show a success notification after deleting the card.
      this.view.notificationView.showNotification(RequestState.Success, SUCCESS_MESSAGE.DELETE_CARD)
    } catch (error) {
      // Display an error notification in case of any exceptions during deletion.
      this.view.notificationView.showNotification(RequestState.Failed, ERROR_MESSAGE.SERVER_ERROR)
    }
  }

  getCardList = () => this.service.cardService.getCardList()

  /**
   * Retrieve card details by its ID.
   * @param {string} id - The ID of the card to fetch details for.
   * @returns {CardDetail}  A resolve to the card's details.
   */
  getCardDetail = (id: string) => this.service.cardService.getCardDetail(id)

  /**
   * Method to load cards based on a specific category.
   * @param {string} category - The category for which to load cards.
   * @returns {boolean}  Returns true if cards are successfully loaded, otherwise false.
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

  searchCard = (searchData: string): ICard[] => this.service.cardService.searchCard(searchData)

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

  openOverlaySecond = () => {
    this.view.overlayView.openOverlaySecond()
  }

  closeOverlaySecond = () => {
    this.view.overlayView.closeOverlaySecond()
  }
}

export default Controller
