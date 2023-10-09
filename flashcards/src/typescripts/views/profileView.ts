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

  /**
   * Adds an event listener to open the user profile
   * @param {Function} openOverlaySecond - Function to open the second overlay
   */
  addEventOpenProfileListener = (openOverlaySecond: openOverlaySecond) => {
    this.headerUserEl.addEventListener('click', () => {
      openOverlaySecond()
      this.navbarUserEl.classList.add(Status.Open)
    })
  }

  /**
   * Adds an event listener to handle user logout
   * @param {Function} closeOverlaySecond - Function to close the second overlay
   */
  addEventLogOutListener = (closeOverlaySecond: closeOverlaySecond) => {
    this.logoutEl.addEventListener('click', () => {
      closeOverlaySecond()
      this.closeNavbar()

      // Remove user data from local storage
      localStorageHelper.removeLocalStorage(DataSources.User)

      // Redirect the user to the login page
      window.location.href = Path.Login
    })
  }

  closeNavbar = () => {
    this.navbarUserEl.classList.remove(Status.Open)
  }
}

export default ProfileView
