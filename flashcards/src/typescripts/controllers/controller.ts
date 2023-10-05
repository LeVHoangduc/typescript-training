import { DefaultValues } from '../enums/enums'
import FlashcardsModel, { IFlashcards } from '../models/flashcardsModels'
import Service from '../services/service'
import View from '../views/view'

class Controller {
  service: Service
  view: View

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
    this.initModalFlashcardsCardView()

    this.initOverLay()
  }

  //----- FLASHCARDS CONTROLLER          -----//

  initFlashcardsView = () => {
    this.view.flashcardsView.renderFlashcardsView(this.getFlashcards)
    this.view.flashcardsView.createSlider()

    this.view.flashcardsView.addEventShowCard(this.loadCards)
  }

  initModalFlashcardsCardView = () => {
    this.view.modalFlashcardsView.addEventOpenFormListener()
    this.view.modalFlashcardsView.addEventAddFlashcards(this.saveFlashcards, this.loadFlashcards)
  }

  //----- CARD CONTROLLER          -----//
  initCardView = () => {}

  //----- OVERLAY CONTROLLER          -----//

  initOverLay = () => {
    this.view.overlayView.addEventClickOutSide()
  }

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

  getFlashcards = () => this.service.flashcardsService.getFlashcards()

  loadFlashcards = () => {
    this.view.flashcardsView.renderFlashcardsView(this.getFlashcards)
  }

  getCardList = () => this.service.cardService.getCardList()

  /**
   * Method to load cards based on a specific category.
   * @param {string} category - The category for which to load cards.
   * @returns {boolean} - Returns true if cards are successfully loaded, otherwise false.
   */
  loadCards = (category: string = DefaultValues.Category) => {
    // view receive category and render as follow category
    this.view.cardView.renderCardList(this.getCardList, category)
  }
}

export default Controller
