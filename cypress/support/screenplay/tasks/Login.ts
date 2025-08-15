import { Actor } from '../core/Actor';
import { Authenticate } from '../abilities/Authenticate';
import { Enter } from './Enter';
import { Click } from './Click';
import { LoginPage } from '../ui/LoginPage';

export class Login {
  static asRegisteredUser() {
    return Login.performLogin();
  }

  static asAdmin() {
    return Login.performLogin();
  }

  private static performLogin() {
    return {
      performAs: (actor: Actor) => {
        const authentication = actor.abilityTo(Authenticate);
        
        actor.attemptsTo(
          Enter.value(authentication.getUsername()).into(LoginPage.username),
          Enter.value(authentication.getPassword()).into(LoginPage.password),
          Click.on(LoginPage.submit)
        );
      }
    };
  }
}