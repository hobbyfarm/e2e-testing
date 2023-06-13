@WebApp @UI
Feature: User logout from HobbyFarm  UI
  As a logged in HobbyFarm user
  I want to log out from HobbyFarm UI
  So that I don't leave an active session

  Scenario: User successfully logs out from HobbyFarm UI
    Given I am logged in
    When I click on the logout button
    Then I am logged out from the application
    And I am redirected to the login page
