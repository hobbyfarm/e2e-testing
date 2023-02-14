# Solution initialization ADR - February, 2023

## Context and Problem Statement

What technical solution to start with? Which technical stack?

## Considered Options

* Tools
  * [Cypress](https://www.cypress.io/) ([docs](https://docs.cypress.io/), [sources](https://github.com/cypress-io))
  * [Selenium](https://www.selenium.dev/) ([docs](https://www.selenium.dev/documentation/), [sources](https://github.com/SeleniumHQ))
    * [tebeka/selenium](https://github.com/tebeka/selenium): no update since 2021
    * [sourcegraph/go-selenium](https://github.com/sourcegraph/go-selenium): no update since 2017
  * [Cucumber](https://cucumber.io/)
    * [Godog](https://github.com/cucumber/godog) _official_: active development
    * [GoBDD](https://github.com/go-bdd/gobdd) _unofficial_ ([docs](https://go-bdd.github.io/gobdd/)): no release since 2021
* Patterns
  * Page Objects
  * BDD (Behavior-Driven Development)
    * Gherkin language

## Decision Outcome

Selenium has no strong drivers in Go (as of today).

TODO
