import { v4 as uuidv4 } from 'uuid'
export interface ICard {
  id?: string
  flashcards: string
  type: string
  word: string
  translation: string
  description?: string
}

class CardModel implements ICard {
  id: string
  flashcards: string
  type: string
  word: string
  translation: string
  description?: string | undefined

  constructor(data: ICard) {
    this.id = data.id ? data.id : uuidv4()
    this.flashcards = data.flashcards
    this.type = data.type
    this.word = data.word
    this.translation = data.translation
    this.description = data.description ? data.description : undefined
  }
}

export default CardModel
