import ISavestate from "./interfaces/savestate.js";
import IView from "./interfaces/view.js";
import { UIComponent } from "./lib/ui.component.js";
import BonfireRoom from "./views/bonfire.room.js";
import ErrorView from "./views/error.view.js";
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
  private resetButton: UIComponent;

  constructor() {
    this.resetButton = new UIComponent({
      type: "button",
      id: "resetButton",
      text: "Reset",
      events: {
        click: async () => {
          localStorage.removeItem(Game.SAVESTATE_KEY);
          window.location.reload();
        },
      },
      styles: {
        position: "fixed",
        top: "0",
        right: "0",
      },
    });
    this.resetButton.appendTo(document.body);

    this.container = new UIComponent({
      id: "container",
    });
    this.container.appendTo(document.body);
  }

  /**
   * Start the game
   */
  public async start() {
    const error = this.checkPermissions();
    if (error) {
      await this.loadErrorView(error);
      return;
    }

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
   * Load an error view
   */
  private async loadErrorView(message: string) {
    this.container.clear();
    this.currentView = new ErrorView(message);
    await this.currentView.show(this.container);
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

  private checkPermissions(): string {
    const generalNavigator: any = navigator;
    if (generalNavigator.getAutoplayPolicy("mediaelement") !== "allowed")
      return "Please enable autoplay in your browser settings to play this game.";
  }
}

// On window load, start the game
window.onload = async () => Game.instance.start();
