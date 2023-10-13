import { DEFAULT_VALUES } from '../constants/defaultValues'
import { KeyMap } from '../enums/enums'
import { ICard } from '../models/cardModel'
import Template from '../templates/templates'

type searchCard = (searchData: string) => ICard[]
type openOverlaySecond = () => void
type openDetailModal = (card: HTMLElement) => void
type closeOverlaySecond = () => void

class SearchView {
  private inputEl: HTMLInputElement
  private searchEl: HTMLElement

  private searchInformationEl: HTMLElement

  constructor() {
    this.inputEl = document.querySelector('.header__search__input')!
    this.searchEl = document.querySelector('.header__search__icon')!

    this.searchInformationEl = document.querySelector('.search-information')!
  }

  /**
   * Adds an event listener to initiate a card search action
   * @param {Function} searchCard - Function to perform a card search operation
   */
  addEventSearchCardListener = (searchCard: searchCard) => {
    this.searchEl.addEventListener('click', () => {
      // Trigger the card search operation.
      this.handleSearchCard(searchCard)
    })
  }

  addEventInputListener = () => {
    this.inputEl.addEventListener('input', (e: Event) => {
      const typedValue: string = (e.target as HTMLInputElement).value

      if (typedValue === DEFAULT_VALUES.EMPTY_STRING) {
        this.searchInformationEl.classList.remove('open')
      }
    })
  }
  /**
   * Adds an event listener to the input element to listen for the 'Enter' key press
   * @param {searchCard} searchCard - The search card to be used in the handleSearchCard function
   * @param {openOverlaySecond} openOverlaySecond - The function to open the second overlay
   */
  addEventEnterListener = (searchCard: searchCard, openOverlaySecond: openOverlaySecond) => {
    this.inputEl.addEventListener('keyup', e => {
      if (e.key === KeyMap.Enter) {
        this.handleSearchCard(searchCard)
        openOverlaySecond()
      }
    })
  }

  /**
   * Adds an event listener to the input element to open detail modal
   * @param openDetailModal - The function to open detail modal
   * @param closeOverlaySecond - The function to open the second overlay
   */
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

  /**
   * Handles the search for a card based on user input
   * @param {searchCard} searchCard - A function to search for cards
   */
  handleSearchCard = (searchCard: searchCard) => {
    const data = this.inputEl.value.toLowerCase()

    // Call the searchCard function to find matching cards
    const isCard = searchCard(data)

    this.renderFindCard(isCard)

    // Show the search information element if the input is not empty
    if (data !== DEFAULT_VALUES.EMPTY_STRING) {
      this.searchInformationEl.classList.add('open')
    }
  }

  /**
   * Renders a list of cards
   * @param {ICard[]} cards - An array of card objects to render
   */
  renderFindCard = (cards: ICard[]) => {
    // Clear the content of the search information element
    this.searchInformationEl.innerHTML = DEFAULT_VALUES.EMPTY_STRING

    // If no cards were found, render an error message
    if (cards.length === 0) {
      this.renderError()
    }

    cards.forEach(card => {
      this.renderCard(card)
    })
  }

  /**
   * Renders a single card and appends it to the search information element
   * @param {ICard} card - The card object to render
   */
  renderCard = (card: ICard) => {
    // Generate a card template and append it to the search information element
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
