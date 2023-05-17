@WebApp @AdminUI
Feature: User Login on HobbyFarm Admin UI
  As a registered HobbyFarm admin user
  I want to log in to HobbyFarm Admin UI
  So that I can access my profile and manage content

Scenario: Successful user login on HobbyFarm Admin UI
  Given I am on the login page
  When I enter a valid username and password
  And I click on the login button
  Then I should be redirected to the home page

# Scenario: Unsuccessful user login with incorrect password
#   Given I am on the login page
#   When I enter my valid username and an incorrect password
#   And click the login button
#   Then I should see an error message saying "Incorrect password"

# Scenario: Unsuccessful user login with non-existent username
#   Given I am on the login page
#   When I enter a non-existent username and a valid password
#   And click the login button
#   Then I should see an error message saying "Username does not exist"
