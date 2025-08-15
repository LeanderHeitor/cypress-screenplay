export class Actor {
  private abilities: Map<string, any> = new Map();

  constructor(private readonly name: string) {}

  static named(name: string): Actor {
    return new Actor(name);
  }

  // Adicionar habilidade ao ator
  can<T extends object>(ability: T, abilityName?: string): Actor {
    this.abilities.set(abilityName || (ability.constructor as any).name, ability);
    return this;
  }

  // Obter uma habilidade do ator
  abilityTo<T>(abilityClass: new (...args: any[]) => T): T {
    const ability = this.abilities.get(abilityClass.name);
    if (!ability) {
      throw new Error(`${this.name} não tem a habilidade ${abilityClass.name}`);
    }
    return ability as T;
  }

  // Métodos existentes
  attemptsTo(...tasks: any[]): void {
    tasks.forEach(task => {
      task.performAs(this);
    });
  }

  asks<T>(question: { answeredBy(actor: Actor): T }): T {
    return question.answeredBy(this);
  }
}