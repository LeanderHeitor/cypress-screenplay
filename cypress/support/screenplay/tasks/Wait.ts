import { Actor } from '../core/Actor'

export class Wait {
  constructor(private condition: () => Cypress.Chainable<any>) {}

  /**
   * @deprecated With larger timeouts configured, this is rarely needed
   * Waits for a fixed amount of time (avoid if possible)
   */
  static for(milliseconds: number) {
    return new Wait(() => cy.wait(milliseconds))
  }

  /**
   * Waits for a network request/response (intercepted with cy.intercept)
   * This is one of the few cases where Wait is still useful
   */
  static forRequest(alias: string) {
    return new Wait(() => cy.wait(alias))
  }

  /**
   * Waits for a custom condition that can't be handled by Cypress built-in retries
   * Use sparingly - most cases are covered by defaultCommandTimeout
   */
  static forCondition(conditionFn: () => Cypress.Chainable<any>) {
    return new Wait(conditionFn)
  }

  performAs(_actor: Actor): void {
    this.condition()
  }
}