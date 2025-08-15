import { Actor } from '../support/screenplay/core/Actor';
import { Authenticate } from '../support/screenplay/abilities/Authenticate';
import { Open } from '../support/screenplay/tasks/Open';
import { Login } from '../support/screenplay/tasks/Login';
import { Click } from '../support/screenplay/tasks/Click';
import { Text } from '../support/screenplay/questions/Text';
import { LoginPage } from '../support/screenplay/ui/LoginPage';
import {Contains} from '../support/screenplay/questions/Contains'

describe('Login Tests', () => {
  // Criar os atores com suas habilidades
  const regionalUser = Actor.named('Usuário Regional')
    .can(Authenticate.with(Cypress.env('USER_REGIONAL'), Cypress.env('PASS_REGIONAL')));

  const adminUser = Actor.named('Administrador')
    .can(Authenticate.with(Cypress.env('USER_ADMIN'), Cypress.env('PASS_ADMIN')));
  
  it('should login successfully as regional department', () => {
    regionalUser.attemptsTo(
      Open.the(LoginPage.path),
      Login.asRegisteredUser()
    );
    
    // O Cypress já aguarda automaticamente com defaultCommandTimeout: 10000
    regionalUser.asks(Text.of(LoginPage.homeTitle)).should('contain', 'Dashboard');
    regionalUser.asks(Contains.element('span').withText('COLABORADOR')).should('be.visible');
  });
  
  it('should login successfully as admin', () => {
    adminUser.attemptsTo(
      Open.the(LoginPage.path),
      Login.asAdmin()
    );

    // O Cypress já aguarda automaticamente com defaultCommandTimeout: 10000
    adminUser.asks(Text.of(LoginPage.homeTitle)).should('contain', 'Dashboard');
    adminUser.asks(Contains.element('span').withText('ADMINISTRADOR')).should('be.visible');
  });
  it('should show validation errors when fields are empty', () => {
    const guestUser = Actor.named('Usuário Visitante');
    
    guestUser.attemptsTo(
      Open.the(LoginPage.path),
      Click.on(LoginPage.submit)
    );

    // O Cypress já aguarda automaticamente com defaultCommandTimeout: 10000
    guestUser.asks(Contains.element('div').withText('Login é obrigatório. fasfasfasfa')).should('be.visible');
    guestUser.asks(Contains.element('div').withText('Senha é obrigatória.')).should('be.visible');
  });
});