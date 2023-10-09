import { DefaultValues } from '../enums/enums'
import { ICard } from '../models/cardModel'
import Template from '../templates/templates'

type searchCard = (searchData: string) => ICard[]
type openOverlaySecond = () => void
type openDetailModal = (card: HTMLElement) => void
type closeOverlaySecond = () => void

class SearchView {
  private inputEl: HTMLInputElement
  private searchInformationEl: HTMLElement
  private searchEl: HTMLElement

  constructor() {
    this.inputEl = document.querySelector('.header__search__input')!

    this.searchInformationEl = document.querySelector('.search-information')!
    this.searchEl = document.querySelector('.header__search__icon')!
  }

  addEventSearchCardListener = (searchCard: searchCard) => {
    this.searchEl.addEventListener('click', () => {
      this.handleSearchCard(searchCard)
    })
  }

  addEventInputListener = () => {
    this.inputEl.addEventListener('input', (e: Event) => {
      const typedValue: string = (e.target as HTMLInputElement).value

      if (typedValue === DefaultValues.EmptyString) {
        this.searchInformationEl.classList.remove('open')
      }
    })
  }

  addEventEnterListener = (searchCard: searchCard, openOverlaySecond: openOverlaySecond) => {
    this.inputEl.addEventListener('keyup', e => {
      if (e.key === 'Enter') {
        this.handleSearchCard(searchCard)
        openOverlaySecond()
      }
    })
  }

  addEventClickCardListener = (
    openDetailModal: openDetailModal,
    closeOverlaySecond: closeOverlaySecond
  ) => {
    this.searchInformationEl.addEventListener('click', (e: Event) => {
      const cardContentEl = (e.target as HTMLElement).closest('.search-content') as HTMLElement

      closeOverlaySecond()
      openDetailModal(cardContentEl)
    })
  }

  handleSearchCard = (searchCard: searchCard) => {
    const data = this.inputEl.value.toLowerCase()
    const isCard = searchCard(data)

    this.renderFindCard(isCard)

    if (data !== DefaultValues.EmptyString) {
      this.searchInformationEl.classList.add('open')
    }
  }

  renderFindCard = (cards: ICard[]) => {
    this.searchInformationEl.innerHTML = DefaultValues.EmptyString

    if (cards.length === 0) {
      this.renderError()
    }

    cards.forEach(card => {
      this.renderCard(card)
    })
  }

  renderCard = (card: ICard) => {
    const cardTemplate = Template.renderSearchInformation(card)

    if (this.searchInformationEl) {
      this.searchInformationEl.innerHTML += cardTemplate
    }
  }

  renderError = () => {
    const errorEl = Template.renderSearchError()

    this.searchInformationEl.innerHTML = errorEl
  }
}

export default SearchView
