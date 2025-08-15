import { Actor } from '../core/Actor'

export class Open {
  static the(path: string) {
    return {
      performAs: (_actor: Actor) => {
        cy.visit(path)
      },
    }
  }
}