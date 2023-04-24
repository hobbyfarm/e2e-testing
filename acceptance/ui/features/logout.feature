@WebApp @AUI
Feature: User logout from HobbyFarm Admin UI
  As a logged in HobbyFarm admin user
  I want to log out from HobbyFarm Admin UI
  So that I don't leave an active session

Scenario: User successfully logs out from HobbyFarm Admin UI
  Given the UI user is logged in the UI
  When the UI user clicks on the logout button
  Then the UI user is logged out from the application
  And the UI user is redirected to the login page
