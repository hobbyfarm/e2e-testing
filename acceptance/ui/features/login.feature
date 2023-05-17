@WebApp @UI
Feature: User Login on HobbyFarm UI
  As a registered HobbyFarm user
  I want to log in to HobbyFarm UI
  So that I can access my profile and manage content

Scenario: Successful user login on HobbyFarm UI
  Given I am on the UI login page
  When I enter my valid UI username and password
  Then I should be redirected to the UI home page
