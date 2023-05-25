# End-to-end testing solution for HobbyFarm

[![CI](https://github.com/hobbyfarm/e2e-testing/actions/workflows/ci.yaml/badge.svg?branch=main)](https://github.com/hobbyfarm/e2e-testing/actions/workflows/ci.yaml)
[![Nightly](https://github.com/hobbyfarm/e2e-testing/actions/workflows/nightly.yaml/badge.svg?branch=main)](https://github.com/hobbyfarm/e2e-testing/actions/workflows/nightly.yaml)

Automated testing solution to validate [HobbyFarm](https://github.com/hobbyfarm) (API + web app), the Cloud Native e-learning platform!

## Current state

This repository has been created in February 2023 and the first working version has been completed in May 2023.

The design has been documented in ADRs (Architecture Decision Record): [Solution init (Feb 2023)](docs/adr/adr-init-solution-202302.md).

## How to run tests

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

# run the tests from the test browser (really cool to see & debug!)
npx playwright test --ui

# opens last HTML report run
npx playwright show-report

# opens a browser to help generate tests (see https://playwright.dev/docs/codegen for options)
npx playwright codegen
```

## How to run acceptance tests

Acceptance testing has been written in Gherkin languages and are mapped to the code thanks to [Cucumber](https://cucumber.io/) ([code](https://github.com/cucumber/cucumber-js))

```bash
# runs features defined in acceptance folder
npx cucumber-js
```

## How to contribute

### File organization

You can start editing files in `tests` folders and look at examples in `samples` folder. For UI testing, the PageObject pattern has been followed and code is found in `src/pages`. For REST API testing, code is in `src/resources`.

To go further you can have a look at `.\playwright.config.ts` (Playwright Test configuration) and [Playwright documentation](https://playwright.dev/docs/intro).

### IDE

If you use Visual Studio Code, you can install the extension [Playwright Test for VSCode](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) ([repository](https://github.com/microsoft/playwright-vscode)).

### Libraries

* [Day.js](https://day.js.org/) ([code](https://github.com/iamkun/dayjs))

### Code quality

We use [MegaLinter](https://megalinter.io/) ([code](https://github.com/oxsecurity/megalinter)) to check all code from this repository. It will be automatically used in the CI pipeline but you can run it locally:

```bash
npx mega-linter-runner
```

You can also run specific linters:

```bash
npx eslint .
```

## How to operate

* [Pipelines](docs/pipelines.md)
