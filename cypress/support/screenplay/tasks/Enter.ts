import { Target } from '../core/Target'
import { Actor } from '../core/Actor'

export class Enter {
  static value(text: string) {
    return {
      into: (target: Target) => ({
        performAs: (_actor: Actor) => {
          target.resolve().clear().type(text)
        },
      }),
    }
  }
}