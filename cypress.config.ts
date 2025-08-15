// cypress.config.ts
import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://qa.newsgt.isitics.com/', // Sua URL
    specPattern: 'cypress/e2e/**/*.spec.ts',
    supportFile: 'cypress/support/e2e.ts',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    // Configurações de timeout global
    defaultCommandTimeout: 10000,        // 10s para comandos (cy.get, cy.click, etc)
    requestTimeout: 15000,               // 15s para requisições HTTP
    responseTimeout: 15000,              // 15s para respostas de requisições
    pageLoadTimeout: 30000,              // 30s para carregamento de páginas
    execTimeout: 60000                   // 60s para tarefas (cy.exec, cy.task)
  },
})