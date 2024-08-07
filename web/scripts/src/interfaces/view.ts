import { UIComponent, UIProperties } from "../lib/ui.component.js";

/**
 * This interface represents a view of the application.
 */
export default interface IView {
  show(container: UIComponent): Promise<void>;
}

/**
 * This class represents a view of the application.
 * can be rendered on the screen.
 */
export class View extends UIComponent implements IView {
  constructor(properties: UIProperties) {
    super(properties);
  }

  public async show(container: UIComponent) {
    throw new Error("Method not implemented.");
  }
}
