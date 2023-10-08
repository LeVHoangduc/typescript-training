import View from './views/view'
import Controller from './controllers/controller'
import Service from './services/service'

export class App {
  /**
   * Constructor off App object
   */
  constructor() {}

  /**
   * Function for starting the App
   */
  start = async (): Promise<void> => {
    const controller: Controller = new Controller(new Service(), new View())
    await controller.initLogin()
    await controller.initHome()
  }
}
