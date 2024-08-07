import { UIComponent } from "../lib/ui.component.js";

/**
 * A button bar
 */
export default class ButtonBar extends UIComponent {
  public options: UIComponent[];

  constructor(options: UIComponent[]) {
    super({
      classes: ["button-bar"],
    });

    this.options = options;
    this.options.forEach((option) => option.appendTo(this));
  }
}
