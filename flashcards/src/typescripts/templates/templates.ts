import { ICard } from '../models/cardModel'
import { IFlashcards } from '../models/flashcardsModels'

class Template {
  constructor() {}

  static renderFlashcards = (flashcards: IFlashcards) =>
    ` <li class="flashcards__item" data-id="${flashcards.id}" type="flashcards" >
      <img src="${require('../../assets/icons/remove.svg')}" alt="remove" class="flashcards__delete" />
      <img src="${require('../../assets/images/flashcards.png')}" alt="flashcards" />
      <p class="text text--sm text--light text--center flashcards__name">${
        flashcards.flashcards
      }</p>
    </li>`

  static renderCard = (card: ICard) =>
    `
      <tr class="row card-list__content" data-id="${card.id}">
      <td class="text text--light text--center col-3 card-word">${card.word}</td>
      <td class="text text--light text--center col-3">${card.type}</td>
      <td class="text text--light text--center col-3">${card.translation}</td>
      <td class="text text--light col-3 card-list__buttons" data-id="${card.id}" item="${
        card.word
      }" type="card">
        <img src="${require('../../assets/icons/edit.svg')}" class="card-button card-edit" alt="edit" />
        <img src="${require('../../assets/icons/delete.svg')}" class="card-button card-delete" alt="delete" />
      </td>
      </tr>
    `
  static renderSelectFlashcards = (flashcards: IFlashcards) =>
    ` <option value="${flashcards.flashcards}" class="text text--capitalize">${flashcards.flashcards}</option>`

  static renderSearchInformation = (card: ICard) =>
    `<p class="text text--sm text--center search-content" data-id="${card.id}">${card.word}</p>`

  static renderSearchError = () =>
    ` <div class="d-flex-center search-error">
        <img src="${require('../../assets/images/not-found.png')}" alt="not-found" />
        <p class="text text--md text--gray text--semibold">Item not found</p>
      </div>
    `
}

export default Template
