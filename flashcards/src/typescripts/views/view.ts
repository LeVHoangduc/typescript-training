import CardView from './cardView'
import FlashcardsView from './flashcardsView'
import ModalCardView from './modalCardView'
import ModalConfirm from './modalConfirmView'
import ModalDetailView from './modalDetailView'
import ModalFlashcardsView from './modalFlashcardsView'
import OverlayView from './overlayView'
import SearchView from './searchView'

class View {
  flashcardsView: FlashcardsView
  cardView: CardView
  searchView: SearchView

  modalFlashcardsView: ModalFlashcardsView
  modalCardView: ModalCardView
  modalDetailView: ModalDetailView
  modalConfirmView: ModalConfirm

  overlayView: OverlayView
  constructor() {
    this.flashcardsView = new FlashcardsView()
    this.cardView = new CardView()
    this.searchView = new SearchView()

    this.modalFlashcardsView = new ModalFlashcardsView()
    this.modalDetailView = new ModalDetailView()
    this.modalCardView = new ModalCardView()
    this.modalConfirmView = new ModalConfirm()

    this.overlayView = new OverlayView()
  }
}

export default View
