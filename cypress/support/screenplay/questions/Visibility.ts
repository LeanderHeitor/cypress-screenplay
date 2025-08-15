export class Visibility {
  constructor(private target: any) {}

  static of(target: any) {
    return new Visibility(target);
  }

  answeredBy(actor: any) {
    return cy.get(this.target.selector);
  }
}