import { View } from "../interfaces/view.js";
import { UIComponent } from "../lib/ui.component.js";
import Game, { ViewIds } from "../main.js";

export default class TitleScreen extends View {
  private title: UIComponent;
  private startButton: UIComponent;
  private titleSongAudio: UIComponent;

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
    this.createRoomAudio();
    this.titleSongAudio.appendTo(this);
    (this.titleSongAudio.element as HTMLAudioElement).play();
  }

  private async startGame() {
    await Game.instance.loadView(ViewIds.BonfireRoom);
  }
  /**
   * Creates the audio element for the room
   */
  private createRoomAudio() {
    this.titleSongAudio = new UIComponent({
      type: "audio",
      text: "Your browser does not support the audio element.",
      attributes: {
        loop: "true",

        controls: "false",
      },
      styles: {
        visibility: "hidden",
      },
    });

    const audioSource = new UIComponent({
      type: "source",
      attributes: {
        src: "../resources/music/ChaosDay.mp3",
        type: "audio/mpeg",
      },
    });

    audioSource.appendTo(this.titleSongAudio);
  }
}
