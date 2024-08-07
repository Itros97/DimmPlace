import { View } from "../interfaces/view.js";
import { UIComponent } from "../lib/ui.component.js";
import Game, { ViewIds } from "../main.js";

export default class TitleScreen extends View {
  private title: UIComponent;
  private startButton: UIComponent;

  constructor() {
    super({
      id: "title-screen",
      classes: [],
      styles: {
        Background: "blue",
        height: "10rem",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      },
    });
  }

  async show(container: UIComponent) {
    this.title = new UIComponent({
      id: "title",
      type: "h2",
      text: "Welcome to the Game",
    });

    this.startButton = new UIComponent({
      id: "start-button",
      type: "button",
      text: "Start Game",
      events: {
        click: async () => await this.startGame(),
      },
    });

    this.title.appendTo(this);
    this.startButton.appendTo(this);
    this.appendTo(container);
  }

  private async startGame() {
    await Game.instance.loadView(ViewIds.BonfireRoom);
  }
}
