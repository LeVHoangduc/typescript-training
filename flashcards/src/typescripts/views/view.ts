import CardView from './cardView'
import FlashcardsView from './flashcardsView'
import ModalFlashcardsView from './modalFlashcardsView'
import OverlayView from './overlayView'

class View {
  flashcardsView: FlashcardsView
  modalFlashcardsView: ModalFlashcardsView

  cardView: CardView

  overlayView: OverlayView
  constructor() {
    this.flashcardsView = new FlashcardsView()
    this.modalFlashcardsView = new ModalFlashcardsView()

    this.cardView = new CardView()

    this.overlayView = new OverlayView()
  }
}

export default View
