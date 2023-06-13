@WebApp @UI
Feature: User Login on HobbyFarm UI
  As a registered HobbyFarm user
  I want to log in to HobbyFarm UI
  So that I can access my profile and start scenario

Scenario: Successful user login on HobbyFarm UI
  Given I am on the login page
  When I enter a valid username and password
  And I click on the login button
  Then I should be redirected to the home page
