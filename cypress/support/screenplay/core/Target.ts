export class Target {
  private constructor(
    public readonly description: string,
    private readonly locator: string,
  ) {}

  static the(description: string) {
    return {
      located: (locator: string) => new Target(description, locator),
    }
    //alvo com descrição e seletor
  }

  resolve(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.locator)
  }
  //retorna o elemento localizado
}