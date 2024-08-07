import Time from "../lib/time.js";

export default class Background {
  static readonly DARK_CLASS = "dark";

  static async fade() {
    const transition = getComputedStyle(document.body)
      .getPropertyValue("--transition")
      .replace("s", "");

    Background.toggle(document.body);
    return Time.sleep(parseInt(transition) * 1000);
  }

  static toggle(body: HTMLElement) {
    if (body.classList.contains(Background.DARK_CLASS)) {
      body.classList.remove(Background.DARK_CLASS);
      return;
    }

    body.classList.add(Background.DARK_CLASS);
  }
}
