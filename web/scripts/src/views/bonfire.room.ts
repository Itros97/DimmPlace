import ButtonBar from "../components/button.bar.js";
import { View } from "../interfaces/view.js";
import { UIComponent } from "../lib/ui.component.js";
import Background from "../ui/background.js";

export default class BonfireRoom extends View {
  static readonly ADD_BUTTON_ID = "add-wood-button";
  static readonly GATHER_BUTTON_ID = "gather-button";
  static readonly EXPLORE_BUTTON_ID = "explore-button";
  static readonly INVENTORY_BUTTON_ID = "inventory-button";

  static readonly FADE_IN_TIMEOUT_TIME = 5000;
  static readonly REVERT_TIMEOUT_TIME = 10000;

  private fading: boolean;
  private buttonBar: ButtonBar;
  private addWoodButton: UIComponent;
  private fireplaceAudio: UIComponent;

  constructor() {
    super({
      id: "bonfire-room",
      styles: {
        Background: "#222",
        display: "flex",
        flexDirection: "column",
      },
    });

    const exploreButton = new UIComponent({
      type: "button",
      id: BonfireRoom.EXPLORE_BUTTON_ID,
      text: "Explorar",
      events: {
        click: () => this.explore(),
      },
    });

    const gatherButton = new UIComponent({
      type: "button",
      id: BonfireRoom.GATHER_BUTTON_ID,
      text: "Recoger",
      events: {
        click: () => this.gather(),
      },
    });

    const inventoryButton = new UIComponent({
      type: "button",
      id: BonfireRoom.INVENTORY_BUTTON_ID,
      text: "Inventario",
      events: {
        click: () => this.inventory(),
      },
    });

    this.buttonBar = new ButtonBar([
      exploreButton,
      gatherButton,
      inventoryButton,
    ]);

    this.addWoodButton = new UIComponent({
      type: "button",
      id: BonfireRoom.ADD_BUTTON_ID,
      text: "Añadir leña",
      events: {
        click: async () => await this.fadeInBackground(),
      },
    });

    this.fireplaceAudio = new UIComponent({
      type: "audio",
      attributes: {
        src: "../resources/sounds/fireplace.mp3",
        // loop: "true",
      },
    });
  }

  /**
   * Shows the view
   */
  public async show(container: UIComponent) {
    const centerButtonContainer = this.createCenterButtonContainer();
    centerButtonContainer.appendTo(container);
    this.buttonBar.appendTo(container);
    this.fireplaceAudio.appendTo(container);
    this.appendTo(container);
  }

  /**
   * Creates a container for the center button
   */
  private createCenterButtonContainer(): UIComponent {
    const centerButtonContainer = new UIComponent({
      styles: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      },
    });

    this.addWoodButton.appendTo(centerButtonContainer);
    return centerButtonContainer;
  }

  /**
   * Fades the background after a certain amount of time
   */
  private async fadeInBackground() {
    if (this.fading) return;
    this.fading = true;
    await Background.fade();
    this.fading = false;
  }

  private inventory() {
    alert("Inventory");
  }

  private gather() {
    alert("Gather");
  }

  private explore() {
    alert("Explore");
  }
}
