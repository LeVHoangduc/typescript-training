export interface ICard {
  id: number
  flashcards: string
  type: string
  word: string
  translation: string
  description?: string
}

class CardModel implements ICard {
  id: number
  flashcards: string
  type: string
  word: string
  translation: string
  description?: string | undefined

  constructor(data: ICard) {
    this.id = data.id
    this.flashcards = data.flashcards
    this.type = data.type
    this.word = data.word
    this.translation = data.translation
    this.description = data.description ? data.description : undefined
  }
}

export default CardModel
