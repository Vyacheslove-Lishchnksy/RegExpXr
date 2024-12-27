export default class RegExpXr extends RegExp {
  regex: string;

  constructor(content: RegExp) {
    super(content.source, content.flags);
    this.regex = (content.source === "(?:)") ? "" : content.source;
  }

  public gruop(content: RegExp) {
    return new RegExpXr(new RegExp(`${this.regex}(${content.source})`));
  }

  public diapasone(content: RegExp) {
    return new RegExpXr(new RegExp(`${this.regex}[${content.source}]`));
  }

  public optional(content: RegExp) {
    return new RegExpXr(new RegExp(`${this.regex}${content.source}?`));
  }

  public zeroOrMore(content: RegExp) {
    return new RegExpXr(new RegExp(`${this.regex}${content.source ?? ""}*`));
  }

  public oneOrMore(content?: RegExp) {
    return new RegExpXr(new RegExp(`${this.regex}${content?.source ?? ""}+`));
  }

  public any() {
    return new RegExpXr(new RegExp(`${this.regex}.`));
  }

  public word(content: RegExp) {
    return new RegExpXr(new RegExp(`${this.regex}\\b${content.source}\\b`))
  }

  public start() {
    return new RegExpXr(new RegExp(`^${this.regex}`))
  }

  public end() {
    return new RegExpXr(new RegExp(`${this.regex}$`))
  }

  public startWord() {
    return this.endWord();
  }

  public endWord() {
    return new RegExpXr(new RegExp(`${this.regex}\\b`));
  }

  public diapasoneNumber({ from, to }: { from?: number, to?: number }) {
    if (from === to) {
      return new RegExpXr(new RegExp(`${this.regex}{${from ?? ""}}`));
    }
    return new RegExpXr(new RegExp(`${this.regex}{${from ?? ""},${to ?? ""}}`));
  }

  public pickAfter(content: RegExp) {
    return new RegExpXr(new RegExp(`${this.regex}(?<=${content.source})`));
  }

  public mustToBe(content: RegExp) {
    return new RegExpXr(new RegExp(`${this.regex}(?=${content.source})`));
  }

  public pickAfterNot(content: RegExp) {
    return new RegExpXr(new RegExp(`${this.regex}(?<!${content.source})`));
  }

  public protected(content?: string) {
    return new RegExpXr(new RegExp(`${this.regex}\\${content ?? ""}`));
  }

  public add(content: RegExp) {
    return new RegExpXr(new RegExp(`${this.regex}${content.source}`));
  }

  public or(content?: RegExp) {
    return new RegExpXr(new RegExp(`${this.regex}|${content ?? ""}`));
  }

  public maskDiapasoneNumbers({ from, to }: { from: number, to: number }) {
    let regex: string = "";

    for (let i = from; i < to - 1; i++) {
      regex += `(${i})|`;
    }

    regex += `(${to - 1})`

    return new RegExpXr(new RegExp(
      `(${regex})`
    ));
  }
}

export const figure = /\d/;
export const word = /\w/;
export const enter = /\n/;
export const gap = /\s/;