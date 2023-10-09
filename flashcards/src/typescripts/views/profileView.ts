import { localStorageHelper } from '../helpers/localStorageHelper'
import { DataSources, Path, Status } from '../enums/enums'

type openOverlaySecond = () => void
type closeOverlaySecond = () => void

class ProfileView {
  private logoutEl: HTMLElement
  private headerUserEl: HTMLElement
  private navbarUserEl: HTMLElement

  constructor() {
    this.logoutEl = document.querySelector('.navbar__logout')!
    this.headerUserEl = document.querySelector('.header__user')!
    this.navbarUserEl = document.querySelector('.header__navbar')!
  }

  //----- EVENT LISTENER -----//

  addEventOpenProfileListener = (openOverlaySecond: openOverlaySecond) => {
    this.headerUserEl.addEventListener('click', () => {
      openOverlaySecond()
      this.navbarUserEl.classList.add(Status.Open)
    })
  }

  addEventLogOutListener = (closeOverlaySecond: closeOverlaySecond) => {
    this.logoutEl.addEventListener('click', () => {
      closeOverlaySecond()
      this.closeNavbar()

      localStorageHelper.removeLocalStorage(DataSources.User)
      window.location.href = Path.Login
    })
  }

  closeNavbar = () => {
    this.navbarUserEl.classList.remove(Status.Open)
  }
}

export default ProfileView
