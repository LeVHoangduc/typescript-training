import { Path } from '../enums/enums'
import FlashcardsModel, { IFlashcards } from '../models/flashcardsModels'
import ApiService from './apiService'

class FLashcardsService extends ApiService<FlashcardsModel> {
  flashcards: FlashcardsModel[]

  constructor() {
    super(Path.Flashcards)
  }

  init = async (): Promise<void> => {
    try {
      const data = await this.getList()
      this.flashcards = data.map(flashcard => new FlashcardsModel(flashcard))
    } catch (error) {}
  }

  getFlashcards = (): FlashcardsModel[] => this.flashcards

  addFlashcards = async (flashcardsData: IFlashcards): Promise<boolean> => {
    const flashcardsList = this.flashcards

    const newFLashcards = new FlashcardsModel(flashcardsData)

    const isExit = flashcardsList.some(
      flashcardsData => flashcardsData.flashcards === newFLashcards.flashcards
    )

    if (!isExit) {
      try {
        // post new flashcards to database
        await this.postItem(newFLashcards)

        // add new flashcards to model
        this.flashcards.push(newFLashcards)
      } catch (error) {}
    }

    return isExit
  }

  /**
   * Method to delete a flashcards based on its ID.
   * @param {String} flashcardsID - The ID of flashcards to be deleted.
   * @returns {Promise<Boolean>} - A promise that resolves with the result of the deletion.
   */
  deleteFlashcards = async (flashcardsID: string): Promise<void> => {
    try {
      await this.deleteItem(flashcardsID)
      this.flashcards = this.flashcards.filter(flashcards => flashcards.id != flashcardsID)
    } catch (error) {}
  }
}

export default FLashcardsService
