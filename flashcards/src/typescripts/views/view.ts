import CardView from './cardView'
import FlashcardsView from './flashcardsView'
import ModalCardView from './modalCardView'
import ModalConfirm from './modalConfirmView'
import ModalFlashcardsView from './modalFlashcardsView'
import OverlayView from './overlayView'

class View {
  flashcardsView: FlashcardsView
  cardView: CardView

  modalFlashcardsView: ModalFlashcardsView
  modalCardView: ModalCardView
  modalConfirmView: ModalConfirm

  overlayView: OverlayView
  constructor() {
    this.flashcardsView = new FlashcardsView()
    this.cardView = new CardView()

    this.modalFlashcardsView = new ModalFlashcardsView()
    this.modalCardView = new ModalCardView()
    this.modalConfirmView = new ModalConfirm()

    this.overlayView = new OverlayView()
  }
}

export default View
