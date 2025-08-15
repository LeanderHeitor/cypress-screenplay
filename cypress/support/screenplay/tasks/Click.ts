import { Target } from '../core/Target'
import { Actor } from '../core/Actor'

export class Click {
  static on(target: Target) {
    return {
      performAs: (_actor: Actor) => {
        target.resolve().click()
      },
    }
  }
}