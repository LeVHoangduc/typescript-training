import { path } from '../enums/enums'
import FlashcardsModel, { IFlashcards } from '../models/flashcardsModels'
import ApiService from './apiService'

class FLashcardsService extends ApiService<FlashcardsModel> {
  flashcards: FlashcardsModel[]

  constructor() {
    super(path.flashcards)
  }

  init = async (): Promise<void> => {
    const data = await this.getList()

    this.flashcards = data.map(flashcard => new FlashcardsModel(flashcard))
  }

  getFlashcards = (): FlashcardsModel[] => this.flashcards

  addFlashcards = async (flashcardsData: IFlashcards): Promise<void> => {
    const flashcardsList = await this.getList()

    const newFLashcards = new FlashcardsModel(flashcardsData)

    const isExit = flashcardsList.some(
      flashcardsData => flashcardsData.flashcards === newFLashcards.flashcards
    )
    if (!isExit) {
      // post new flashcards to database
      this.postItem(newFLashcards)

      // add new flashcards to model
      this.flashcards.push(new FlashcardsModel(flashcardsData))
      console.log('in model', this.flashcards)
    }
  }
}

export default FLashcardsService
