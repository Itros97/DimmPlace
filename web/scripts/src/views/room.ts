import Background from "../ui/background.js";

export default class Room {
  static readonly ADD_BUTTON_ID = "add-wood-button";
  static readonly FADE_IN_TIMEOUT_TIME = 5000;
  static readonly REVERT_TIMEOUT_TIME = 10000;

  private addButton: HTMLElement;
  private fading: boolean;

  constructor() {}

  public async show() {
    this.addButton = document.getElementById(Room.ADD_BUTTON_ID);
    this.addButton?.addEventListener("click", this.fadeInBackground);
  }

  private async fadeInBackground() {
    if (this.fading) return;
    this.fading = true;
    await Background.fade();
    this.fading = false;
  }
}
