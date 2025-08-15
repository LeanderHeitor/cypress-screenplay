# Guia de Migração da Classe Wait

## Overview

Com a implementação de timeouts maiores no `cypress.config.ts`, a classe `Wait` foi refatorada para eliminar o uso de `cy.wait()` com valores fixos e aproveitar melhor os timeouts configurados do Cypress.

## Configurações de Timeout Atuais

```typescript
// cypress.config.ts
defaultCommandTimeout: 10000,    // 10s para comandos (cy.get, cy.click, etc)
requestTimeout: 15000,           // 15s para requisições HTTP
responseTimeout: 15000,          // 15s para respostas de requisições
pageLoadTimeout: 30000,          // 30s para carregamento de páginas
execTimeout: 60000               // 60s para tarefas (cy.exec, cy.task)
```

## Migração dos Métodos Wait

### ❌ Método Antigo (Deprecated)
```typescript
// NÃO recomendado - usa tempo fixo
Wait.for(2000)
```

### ✅ Novos Métodos Recomendados

#### 1. Aguardar elemento estar visível
```typescript
// Aguarda elemento aparecer e estar interativo
Wait.forElement(LoginPage.submitButton)
```

#### 2. Aguardar elemento com texto específico
```typescript
// Aguarda elemento conter texto específico
Wait.forElementWithText(LoginPage.homeTitle, 'Dashboard')
```

#### 3. Aguardar elemento desaparecer
```typescript
// Aguarda elemento não existir mais
Wait.forElementToDisappear(LoginPage.loadingSpinner)
```

#### 4. Aguardar navegação
```typescript
// Aguarda navegação de página completar
Wait.forNavigation()
```

#### 5. Aguardar requisição HTTP
```typescript
// Aguarda interceptação de request/response
Wait.forRequest('@userLogin')
```

#### 6. Aguardar múltiplos elementos
```typescript
// Aguarda múltiplos elementos estarem visíveis
Wait.forElements(
  LoginPage.errorMessageEmail, 
  LoginPage.errorMessagePassword
)
```

#### 7. Aguardar condição customizada
```typescript
// Aguarda condição específica
Wait.forCondition(() => 
  cy.window().its('document.readyState').should('eq', 'complete')
)
```

## Exemplos de Migração

### Antes
```typescript
it('should login successfully', () => {
  regionalUser.attemptsTo(
    Open.the(LoginPage.path),
    Login.asRegisteredUser(),
    Wait.for(2000) // ❌ Tempo fixo
  );
  
  regionalUser.asks(Text.of(LoginPage.homeTitle)).should('contain', 'Dashboard');
});
```

### Depois
```typescript
it('should login successfully', () => {
  regionalUser.attemptsTo(
    Open.the(LoginPage.path),
    Login.asRegisteredUser(),
    Wait.forElementWithText(LoginPage.homeTitle, 'Dashboard') // ✅ Semântico
  );
  
  regionalUser.asks(Text.of(LoginPage.homeTitle)).should('contain', 'Dashboard');
});
```

## Vantagens da Nova Abordagem

1. **Mais Semântico**: O código expressa claramente o que está aguardando
2. **Mais Confiável**: Usa retry logic do Cypress ao invés de tempo fixo
3. **Mais Rápido**: Não aguarda tempo desnecessário se condição já for atendida
4. **Mais Robusto**: Aproveita os timeouts configurados no cypress.config.ts
5. **Melhor Debug**: Mensagens de erro mais claras quando timeout ocorre

## Boas Práticas

1. **Sempre prefira métodos semânticos** ao invés de `Wait.for()`
2. **Use `Wait.forElement()`** ao aguardar elementos aparecerem
3. **Use `Wait.forElementWithText()`** ao aguardar conteúdo específico
4. **Use `Wait.forRequest()`** ao aguardar chamadas de API
5. **Evite `cy.wait()` com valores fixos** - deixe o Cypress gerenciar os timeouts

## Troubleshooting

Se um teste falhar por timeout:

1. Verifique se o seletor está correto
2. Confirme se o elemento realmente aparece na tela
3. Considere aumentar o `defaultCommandTimeout` se necessário
4. Use debug: `Wait.forElement(target).debug()` para investigar

## Método Deprecated

O método `Wait.for(milliseconds)` ainda existe mas está marcado como deprecated. Use apenas em casos muito específicos onde tempo fixo é realmente necessário.
