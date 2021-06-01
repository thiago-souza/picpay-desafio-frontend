## React Clean Architecture Boilerplate

Arquitetura client-side escalável, com distribuição de responsabilidades em camadas, baseada na
a regra de dependência do Clean Architecture e seguindo boas práticas de desenvolvimento (SOLID, DRY, KISS) com alguns Design Patterns;

## Stacks

---

- [React](https://facebook.github.io/react/) (17.x)
- [Webpack](https://webpack.js.org/) (5.x)
- [Typescript](https://www.typescriptlang.org/) (4.x)
- [Hot Module Replacement (HMR)](https://webpack.js.org/concepts/hot-module-replacement/) ([React Hot Loader](https://github.com/gaearon/react-hot-loader))
- Rotina p/ build em produção (Webpack)
- Rotina p/ otimização de imagens ([Image Webpack Loader](https://github.com/tcoopman/image-webpack-loader))
- Arquitetura modular (com autoprefixer p/ cross-browser) [Styled-components](https://styled-components.com/docs/)
- Estabilização de código com ([ESLint](https://github.com/eslint/eslint)) e formatação com ([Prettier](https://github.com/prettier/prettier))
- Biblioteca para testes unitários com ([Jest](https://facebook.github.io/jest/)) e testes em componentes com [DOM Test Library](https://testing-library.com/docs/)
- Análise de commits ([Husky](https://typicode.github.io/husky/#/))

## Instalação

---

1. Clone/download o repositório
2. `npm install`

## Como usar

---

**Desenvolvimento**

`npm run start`

- Build do app (HMR habilitado)
- @ `http://localhost:8080`

**Produção**

`npm run start`

- Build do app (HMR desabilitado) em `/dist/`
- @ `http://localhost:3000`

---

**Comandos**

| Descrição do comando |
| -------------------- | ------------------------------------------------------------------------------ |
| `npm run dev`        | Sobe a "app" com hot reload em @ `http://localhost:8080`                       |
| `npm run prod`       | Empacota a "app" para produção em `/dist/` e sobe em @ `http://localhost:3000` |
| `npm run build`      | Empacota a "app" `/dist/`                                                      |
| `npm run test`       | Dispara a rotina de testes                                                     |
| `npm run test:dev`   | Dispara a rotina de testes com "watch reload"                                  |
| `npm run lint`       | Roda o analisador de código (eslint)                                           |
| `npm run lint:fix`   | Roda o analisador de código e corrige automaticamente alguns erros             |
| `npm run start`      | ("alias" para `npm run dev`)                                                   |

---

**Nota**: substituía `npm` para `yarn` no `package.json`, caso tenha preferência pelo `yarn`.
