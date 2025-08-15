import { Actor } from '../core/Actor';
import { Target } from '../core/Target';

export class RealHover {
  constructor(private target: Target) {}

  static over(target: Target) {
    return new RealHover(target);
  }

  performAs(_actor: Actor): void {
    // Usando o método realHover com @ts-ignore para ignorar o erro de TypeScript
    // @ts-ignore
    this.target.resolve().realHover();
  }
}