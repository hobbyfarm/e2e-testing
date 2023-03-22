@WebApp @AdminUI
Feature: User logout from HobbyFarm Admin UI
  As a logged in HobbyFarm admin user
  I want to log out from HobbyFarm Admin UI
  So that I don't leave an active session

Scenario: User successfully logs out from HobbyFarm Admin UI
  Given the user is logged in the Admin UI
  When the user clicks on the "Logout" button
  Then the user is logged out from the application
  And the user is redirected to the login page
