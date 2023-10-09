import CardView from './cardView'
import FlashcardsView from './flashcardsView'
import LoginView from './loginView'
import ModalCardView from './modalCardView'
import ModalConfirm from './modalConfirmView'
import ModalDetailView from './modalDetailView'
import ModalFlashcardsView from './modalFlashcardsView'
import NotificationView from './notificationView'
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

  loginView: LoginView

  overlayView: OverlayView
  notificationView: NotificationView

  constructor() {
    this.flashcardsView = new FlashcardsView()
    this.cardView = new CardView()
    this.searchView = new SearchView()

    this.modalFlashcardsView = new ModalFlashcardsView()
    this.modalDetailView = new ModalDetailView()
    this.modalCardView = new ModalCardView()
    this.modalConfirmView = new ModalConfirm()

    this.loginView = new LoginView()

    this.overlayView = new OverlayView()
    this.notificationView = new NotificationView()
  }
}

export default View
