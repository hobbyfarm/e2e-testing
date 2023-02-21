# Solution initialization ADR - February, 2023

## Context and Problem Statement

What technical solution for end-2-end (e2e) testing to start with and which technical stack?

## Considered Options

* **Tools**
  * [Cucumber](https://cucumber.io/) ([GitHub org](https://github.com/cucumber))
    * [Godog](https://github.com/cucumber/godog) _official_: active development
    * [GoBDD](https://github.com/go-bdd/gobdd) _unofficial_ ([docs](https://go-bdd.github.io/gobdd/)): no release since 2021
  * [Cypress](https://www.cypress.io/) ([docs](https://docs.cypress.io/), [sources](https://github.com/cypress-io/cypress) _★ 42.6k_)
    * Guides: [Page Object Model by BrowserStack](https://www.browserstack.com/guide/cypress-page-object-model), [With Cucumber](https://testersdock.com/cypress-cucumber-bdd/)
  * [Jest](https://jestjs.io/) ([docs](https://jestjs.io/docs/getting-started), [sources](https://github.com/facebook/jest) _★ 41.4k_)
  * [Playwright](https://playwright.dev/) ([docs](https://playwright.dev/docs/intro), [sources](https://github.com/microsoft/playwright) _★ 47.7k_)
    * Guides: [Page Object Models](https://playwright.dev/docs/pom), [](https://dev.to/jankaritech/behavior-driven-development-bdd-using-playwright-n1o)
  * [Selenium](https://www.selenium.dev/) ([docs](https://www.selenium.dev/documentation/), [sources](https://github.com/SeleniumHQ/selenium) _★ 25.8k_)
    * [tebeka/selenium](https://github.com/tebeka/selenium): no update since 2021
    * [sourcegraph/go-selenium](https://github.com/sourcegraph/go-selenium): no update since 2017
  * [Taiko](https://taiko.dev/) ([sources](https://github.com/getgauge/taiko) _★ 3.2k_)
* **Patterns**
  * Page Object
  * BDD (Behavior-Driven Development)
    * Gherkin language

## Decision Outcome

* **Jest** is very interesting for unit/integration testing, maybe not well suited for e2e testing.
* **Playwright** has a very good documentation and featureset
* **Selenium** has no strong drivers in Go (as of today).
