import { v4 as uuidv4 } from 'uuid'

export interface IFlashcards {
  id?: string
  flashcards: string
}

class FlashcardsModel implements IFlashcards {
  id: string
  flashcards: string

  constructor(data: IFlashcards) {
    this.id = data.id ? data.id : uuidv4()
    this.flashcards = data.flashcards
  }
}

export default FlashcardsModel
