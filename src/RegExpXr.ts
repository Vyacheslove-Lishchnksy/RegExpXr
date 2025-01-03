export default class RegExpXr extends RegExp {
  currentRegular: string;

  constructor(content: RegExp) {
    super(content.source, content.flags);
    this.currentRegular = content.source === "(?:)" ? "" : content.source;
  }

  public gruop(content: RegExp) {
    return new RegExpXr(
      new RegExp(`${this.currentRegular}(${content.source})`)
    );
  }

  public diapasone(content: RegExp) {
    return new RegExpXr(
      new RegExp(`${this.currentRegular}[${content.source}]`)
    );
  }

  public optional(content: RegExp) {
    return new RegExpXr(new RegExp(`${this.currentRegular}${content.source}?`));
  }

  public zeroOrMore(content: RegExp) {
    return new RegExpXr(
      new RegExp(`${this.currentRegular}${content.source ?? ""}*`)
    );
  }

  public oneOrMore(content?: RegExp) {
    return new RegExpXr(
      new RegExp(`${this.currentRegular}${content?.source ?? ""}+`)
    );
  }

  public any() {
    return new RegExpXr(new RegExp(`${this.currentRegular}.`));
  }

  public word(content: RegExp) {
    return new RegExpXr(
      new RegExp(`${this.currentRegular}\\b${content.source}\\b`)
    );
  }

  public start() {
    return new RegExpXr(new RegExp(`^${this.currentRegular}`));
  }

  public end() {
    return new RegExpXr(new RegExp(`${this.currentRegular}$`));
  }

  public startWord() {
    return this.endWord();
  }

  public endWord() {
    return new RegExpXr(new RegExp(`${this.currentRegular}\\b`));
  }

  public diapasoneNumber({ from, to }: { from?: number; to?: number }) {
    if (from === to) {
      return new RegExpXr(new RegExp(`${this.currentRegular}{${from ?? ""}}`));
    }
    return new RegExpXr(
      new RegExp(`${this.currentRegular}{${from ?? ""},${to ?? ""}}`)
    );
  }

  public pickAfter(content: RegExp) {
    return new RegExpXr(
      new RegExp(`${this.currentRegular}(?<=${content.source})`)
    );
  }

  public mustToBe(content: RegExp) {
    return new RegExpXr(
      new RegExp(`${this.currentRegular}(?=${content.source})`)
    );
  }

  public pickAfterNot(content: RegExp) {
    return new RegExpXr(
      new RegExp(`${this.currentRegular}(?<!${content.source})`)
    );
  }

  public protected(content?: string) {
    return new RegExpXr(new RegExp(`${this.currentRegular}\\${content ?? ""}`));
  }

  public add(content: RegExp) {
    return new RegExpXr(new RegExp(`${this.currentRegular}${content.source}`));
  }

  public or(content?: RegExp) {
    return new RegExpXr(new RegExp(`${this.currentRegular}|${content ?? ""}`));
  }

  public maskDiapasoneNumbers({ from, to }: { from: number; to: number }) {
    let regex: string = "";

    for (let i = from; i < to - 1; i++) {
      regex += `(${i})|`;
    }

    regex += `(${to - 1})`;

    return new RegExpXr(new RegExp(`${this.currentRegular}(${regex})`));
  }
}

export const figure = /\d/;
export const word = /\w/;
export const enter = /\n/;
export const gap = /\s/;
