# End-2-end testing solution for HobbyFarm

Automated testing solution to validate an instance of [HobbyFarm](https://github.com/hobbyfarm) (API + web app), the Cloud Native e-learning tool.

## Current state

This repository has been created in February 2023 and is under active development. The design has been being documented in an ADR (Architecture Decision Record): [adr-init-solution-202302.md](docs/adr/adr-init-solution-202302.md).

## How to contribute

The technical solution is based on [Playwright](https://playwright.dev). The following setup is required in order to run the tests on a machine:

```bash
# installs NPM packages
npm install

# installs Playwright dependencies
npx playwright install --with-deps
```

Environment variables needs to be set to target a specific environment. Locally, you can copy `.env.example` to create and edit `.env` file that will be used to configure the tests (thanks to [dotenv](https://github.com/motdotla/dotenv)).

Once the setup and configuration is completed, you can run several commands:

```bash
# runs the end-to-end tests (see https://playwright.dev/docs/running-tests)
npx playwright test

# opens last HTML report run
npx playwright show-report

# auto generate tests with Codegen (see https://playwright.dev/docs/codegen for options)
npx playwright codegen
```

You can start editing the files in `tests` folders and look at examples in `samples` folder. For UI testing, the PageObject pattern has been implemented and code is found in `src/pages`. For REST API testing, code is in `src/resources`.

To go further you can have a look at `.\playwright.config.ts` (Playwright Test configuration) and look at the [documentation](https://playwright.dev/docs/intro).

If you use Visual Studio Code, you can install the [Playwright Test for VSCode](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) extension ([repository](https://github.com/microsoft/playwright-vscode)).
