## React Clean Architecture Boilerplate

Starter kit with hot module replacement (HMR) for rapid development.

## Stacks

---

[React](https://facebook.github.io/react/) (17.x)

[Webpack](https://webpack.js.org/) (5.x)

[Typescript](https://www.typescriptlang.org/) (4.x)

[Hot Module Replacement (HMR)](https://webpack.js.org/concepts/hot-module-replacement/) ([React Hot Loader](https://github.com/gaearon/react-hot-loader))

Production build script (Webpack)

Image loading/minification ([Image Webpack Loader](https://github.com/tcoopman/image-webpack-loader))

[Styled-components](https://styled-components.com/docs/) support

Code linting ([ESLint](https://github.com/eslint/eslint)) and formatting ([Prettier](https://github.com/prettier/prettier))

Test framework ([Jest](https://facebook.github.io/jest/))

[DOM Test Library](https://testing-library.com/docs/)

Pre commit ([Husky](https://typicode.github.io/husky/#/))

## Installation

---

1. Clone/download repo
2. `npm install`

## Usage

---

**Development**

`npm run start`

- Build app continuously (HMR enabled)
- App served @ `http://localhost:8080`

**Production**

`npm run start`

- Build app once (HMR disabled) to `/dist/`
- App served @ `http://localhost:3000`

---

**All commands**

| Command            | Description                                                                   |
| ------------------ | ----------------------------------------------------------------------------- |
| `npm run dev`      | Build app continuously (HMR enabled) and serve @ `http://localhost:8080`      |
| `npm run prod`     | Build app once (HMR disabled) to `/dist/` and serve @ `http://localhost:3000` |
| `npm run build`    | Build app to `/dist/`                                                         |
| `npm run test`     | Run tests                                                                     |
| `npm run test:dev` | Run tests with watch                                                          |
| `npm run lint`     | Run linter                                                                    |
| `npm run lint:fix` | Run linter and fix issues                                                     |
| `npm run start`    | (alias of `yarn run start-dev`)                                               |

**Note**: replace `npm` with `yarn` in `package.json` if you use npm.
