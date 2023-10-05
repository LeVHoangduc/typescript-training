import CardView from './cardView'
import FlashcardsView from './flashcardsView'
import ModalConfirm from './modalConfirmView'
import ModalFlashcardsView from './modalFlashcardsView'
import OverlayView from './overlayView'

class View {
  flashcardsView: FlashcardsView
  cardView: CardView

  modalFlashcardsView: ModalFlashcardsView
  modalConfirmView: ModalConfirm

  overlayView: OverlayView
  constructor() {
    this.flashcardsView = new FlashcardsView()
    this.cardView = new CardView()

    this.modalFlashcardsView = new ModalFlashcardsView()
    this.modalConfirmView = new ModalConfirm()

    this.overlayView = new OverlayView()
  }
}

export default View
