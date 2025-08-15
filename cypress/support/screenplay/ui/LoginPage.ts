import { Target } from '../core/Target'

export const LoginPage = {
  path: '/',
  username: Target.the('campo de email').located('[data-testid="email"]'),
  password: Target.the('campo de senha').located('[data-testid="password"]'),
  submit: Target.the('botão de login').located('[data-testid="login-btn"]'),
  flash: Target.the('mensagem de feedback').located('[data-testid="login-btn"]'),
  errorMessagePassword: Target.the('mensagem de erro de senha').located('div:contains("Senha é obrigatória.")'),
  errorMessageEmail: Target.the('mensagem de erro de email').located('div:contains("Login é obrigatório.")'),
  homepath: '/home',
  homeTitle: Target.the('título da página inicial').located('h1'),

}