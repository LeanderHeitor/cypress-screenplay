import { Target } from '../core/Target'
import { Actor } from '../core/Actor'

export class Text {
  constructor(private readonly target: Target) {}

  static of(target: Target) {
    return new Text(target)
  }
  //obeter texto de um elemento na interface 

  answeredBy(_actor: Actor): Cypress.Chainable<string> {
    return this.target.resolve().invoke('text')
  }
}