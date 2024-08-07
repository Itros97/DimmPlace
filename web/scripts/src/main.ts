import ISavestate from "./interfaces/savestate.js";
import IView from "./interfaces/view.js";
import { UIComponent } from "./lib/ui.component.js";
import BonfireRoom from "./views/bonfire.room.js";
import TitleScreen from "./views/title.screen.js";

export enum ViewIds {
  TitleScreen = 0,
  BonfireRoom = 1,
}

export default class Game {
  public static readonly instance: Game = new Game();
  private static readonly SAVESTATE_KEY = "savestate";

  private container: UIComponent;
  private savestate: ISavestate;
  private currentView: IView;

  constructor() {
    this.container = new UIComponent({
      id: "container",
    });
    this.container.appendTo(document.body);
  }

  /**
   * Start the game
   */
  public async start() {
    await this.loadSavestate();
    await this.loadCurrentView();
  }

  /**
   * Load savestate from local storage
   */
  private async loadSavestate() {
    // Load savestate from local storage
    const savestate = localStorage.getItem(Game.SAVESTATE_KEY);

    // If no savestate is found, create a new one
    if (savestate === undefined || savestate === null) {
      this.savestate = {
        currentView: 0,
      };
      return;
    }

    this.savestate = JSON.parse(savestate);
  }

  /**
   * Save savestate to local storage
   */
  public async saveSavestate() {
    localStorage.setItem(Game.SAVESTATE_KEY, JSON.stringify(this.savestate));
  }

  /**
   * Load a view by id
   */
  public async loadView(viewId: number) {
    this.savestate.currentView = viewId;
    await this.saveSavestate();
    await this.loadCurrentView();
  }

  /**
   * Load current view
   */
  private async loadCurrentView() {
    this.container.clear();
    switch (this.savestate.currentView) {
      case 1:
        this.currentView = new BonfireRoom();
        break;
      default:
        this.currentView = new TitleScreen();
    }

    await this.currentView.show(this.container);
  }

  private async showMenu() {}
}

// On window load, start the game
window.onload = async () => Game.instance.start();
