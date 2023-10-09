import FlashcardsView from './flashcardsView'
import CardView from './cardView'
import SearchView from './searchView'

import ModalFlashcardsView from './modalFlashcardsView'
import ModalCardView from './modalCardView'
import ModalDetailView from './modalDetailView'
import ModalConfirm from './modalConfirmView'

import ProfileView from './profileView'
import OverlayView from './overlayView'
import NotificationView from './notificationView'

import LoginView from './loginView'

class View {
  flashcardsView: FlashcardsView
  cardView: CardView
  searchView: SearchView

  modalFlashcardsView: ModalFlashcardsView
  modalCardView: ModalCardView
  modalDetailView: ModalDetailView
  modalConfirmView: ModalConfirm

  profileView: ProfileView
  overlayView: OverlayView
  notificationView: NotificationView

  loginView: LoginView

  constructor() {
    this.flashcardsView = new FlashcardsView()
    this.cardView = new CardView()
    this.searchView = new SearchView()

    this.modalFlashcardsView = new ModalFlashcardsView()
    this.modalCardView = new ModalCardView()
    this.modalDetailView = new ModalDetailView()
    this.modalConfirmView = new ModalConfirm()

    this.profileView = new ProfileView()
    this.overlayView = new OverlayView()
    this.notificationView = new NotificationView()

    this.loginView = new LoginView()
  }
}

export default View
