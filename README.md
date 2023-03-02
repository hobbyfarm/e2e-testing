# End-2-end testing solution for HobbyFarm

Automated testing solution to validate an instance of [HobbyFarm](https://github.com/hobbyfarm) (API + web app), the Cloud Native e-learning tool.

## Current state

This repository has been created in February 2023 and is under contruction. The design is being documented in this [ADR (Architecture Decision Record)](docs/adr/adr-init-solution-202302.md).

## How to contribute

The technical solution is based on [Playwright](https://playwright.dev). The following setup is required in order to run the tests on a machine:

```bash
# installs NPM packages
npm install
```

Environment variables needs to be set to target a specific environment. Locally, you can copy `.env.example` to create and edit `.env` file that will be used to configure the tests (thanks to [dotenv](https://github.com/motdotla/dotenv)).

Once the setup and configuration is completed, you can run several commands:

```bash
# runs the end-to-end tests
npx playwright test

# runs the tests only on Desktop Chrome
npx playwright test --project=chromium

# runs the tests in a specific file
npx playwright test example

# runs the tests in debug mode
npx playwright test --debug

# opens last HTML report run
npx playwright show-report

# auto generate tests with Codegen (see https://playwright.dev/docs/codegen for options)
npx playwright codegen
```

You can now start editing the test files in `tests` folder. You can look at existing test files or files in `samples` folder. 

To go further in understanding this solution you can have a look at `.\playwright.config.ts` (Playwright Test configuration) and look at [documentation](https://playwright.dev/docs/intro).

If you use Visual Studio Code, you can install the [Playwright Test for VSCode](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) extension ([repository](https://github.com/microsoft/playwright-vscode)).
