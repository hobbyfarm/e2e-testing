@WebApp @AdminUI
Feature: User logout from HobbyFarm Admin UI
  As a logged in HobbyFarm admin user
  I want to log out from HobbyFarm Admin UI
  So that I don't leave an active session

Scenario: User successfully logs out from HobbyFarm Admin UI
  Given I am logged in
  When I click on the logout button
  Then I am logged out from the application
  And I am redirected to the login page
