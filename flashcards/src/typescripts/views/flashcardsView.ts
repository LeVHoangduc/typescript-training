import FlashcardsModel from '../models/flashcardsModels'
import Template from '../templates/templates'

type getFlashcardsList = () => FlashcardsModel[]
type loadCards = (category?: string) => void

class FlashcardsView {
  private flashcardslistEl: HTMLElement
  private slideButtonsEl: NodeListOf<Element>

  private titleEl: HTMLElement

  constructor() {
    this.flashcardslistEl = document.querySelector('.flashcards__list')!
    this.slideButtonsEl = document.querySelectorAll('.slide-buttons')!

    this.titleEl = document.querySelector('.card-list__title')!
  }

  //----- EVENT LISTENER -----//
  /**
   * Method to add an event listener to language items to show the modal card.
   * @param {Function} loadCards - Function to load cards.
   * @returns {string} - Current selected category.
   */
  addEventShowCard = (loadCards: loadCards) => {
    let flashcardsCurrent: string

    console.log(this.flashcardslistEl)
    this.flashcardslistEl.addEventListener('click', e => {
      const flashcardsEl = (e.target as HTMLElement).closest('.flashcards__item')

      // Pass the selected category to the loadCards function.
      flashcardsCurrent = flashcardsEl?.textContent!.trim() as string

      // set title
      this.titleEl.textContent = `${flashcardsCurrent} flashcards`

      loadCards(flashcardsCurrent)
    })
  }

  // addEventDeleteLanguage = () => {
  //   this.flashcardslistEl.addEventListener('click', e => {
  //     const btnDelete = e.target.closest('.language__item .language__delete')

  //     // For get data-id of the language will be removed
  //     const languageItemEl = btnDelete?.parentElement

  //     // If the user clicks in delete button, it will execute the delete
  //     // Avoid to missing event listener with show cards
  //     if (languageItemEl) {
  //       this.confirmFormEl.setAttribute('data-id', languageItemEl.getAttribute('data-id'))
  //       this.confirmFormEl.setAttribute('type', languageItemEl.getAttribute('type'))

  //       this.openConfirmDelete(btnDelete)
  //     }
  //   })
  // }

  createSlider = () => {
    this.slideButtonsEl.forEach(button => {
      button.addEventListener('click', () => {
        const direction = button.id === 'prev-slide' ? -1 : 1
        const clientWidthCurrent = this.flashcardslistEl.clientWidth
        const scrollAmount = clientWidthCurrent * direction

        this.flashcardslistEl.scrollBy({ left: scrollAmount, behavior: 'smooth' })

        const maxScrollLeft = this.flashcardslistEl.scrollWidth - clientWidthCurrent - 1

        this.flashcardslistEl.addEventListener('scroll', () => {
          this.flashcardslistEl.scrollLeft <= 0
            ? this.slideButtonsEl[0].classList.add('inactive')
            : this.slideButtonsEl[0].classList.remove('inactive')

          this.flashcardslistEl.scrollLeft >= maxScrollLeft
            ? this.slideButtonsEl[1].classList.add('inactive')
            : this.slideButtonsEl[1].classList.remove('inactive')
        })
      })
    })
  }

  //----- RENDERING -----//

  renderFlashcardsView = (getFlashcardsList: getFlashcardsList) => {
    const flashcardsList: FlashcardsModel[] = getFlashcardsList()
    console.log(flashcardsList)

    this.flashcardslistEl.innerHTML = ''

    flashcardsList.forEach((flashcards: FlashcardsModel) => {
      this.renderFlashcards(flashcards)
    })
  }

  renderFlashcards = (flashcards: FlashcardsModel) => {
    const languageTemplate = Template.renderLanguage(flashcards)

    // Append languageTemplate to the language list element.
    if (this.flashcardslistEl) this.flashcardslistEl.innerHTML += languageTemplate
  }
}

export default FlashcardsView
