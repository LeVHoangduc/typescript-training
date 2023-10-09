import { utilities } from '../helpers/utilities'

class NotificationView {
  private notificationEl: HTMLElement
  private notificationMessageEl: HTMLElement

  constructor() {
    this.notificationEl = document.querySelector('.notification')!
    this.notificationMessageEl = document.querySelector('.notification__message')!
  }

  /**
   * Display a notification message with a specific state and message
   * @param {string} state - The state of the notification ('success', 'error')
   * @param {string} message - The message content to be displayed in the notification
   */
  showNotification = async (state: string, message: string): Promise<void> => {
    if (this.notificationEl) {
      this.notificationEl.classList.add(`notification--${state}`)
    }
    if (this.notificationMessageEl) {
      this.notificationMessageEl.innerText = message
    }

    await utilities.notificationDelay(2000)

    if (this.notificationEl) {
      this.notificationEl.classList.remove(`notification--${state}`)
    }
  }
}

export default NotificationView
