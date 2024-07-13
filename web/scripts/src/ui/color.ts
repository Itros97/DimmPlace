export interface IColor {
  r: number;
  g: number;
  b: number;
}

export class Color implements IColor {
  r: number;
  g: number;
  b: number;

  constructor(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  toCssString(): string {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }
}
