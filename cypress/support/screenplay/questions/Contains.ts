export class Contains {
  constructor(private element: string, private text: string) {}

  static element(element: string) {
    return {
      withText: (text: string) => new Contains(element, text)
    };
  }

  answeredBy(actor: any) {
    return cy.contains(this.element, this.text);
  }
}