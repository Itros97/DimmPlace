import { View } from "../interfaces/view.js";
import { UIComponent } from "../lib/ui.component.js";

export default class ErrorView extends View {
  private title: UIComponent;

  constructor(message: string) {
    super({
      id: "error-view",
      classes: [],
      styles: {
        display: "flex",
        flexDirection: "column",
      },
    });

    this.title = new UIComponent({
      id: "title",
      type: "h2",
      text: message,
    });
  }

  async show(container: UIComponent) {
    this.title.appendTo(this);
    this.appendTo(container);
  }
}
