Feature: Sorting test cases for Saucelabs Products

  Scenario: Verify User able to view the products list with default sorting by name (A-Z)
    Given Browse to web site "https://www.saucedemo.com/"
    When User logins in user valid username and password
    Then Verify the Product list is Sorted by name (A-Z) by default
  
  Scenario: Verify User able to view the product list with sorting by name Z-A
    Given Browse to web site "https://www.saucedemo.com/"
    When User logins in user valid username and password
    And User changes the sorting by name (Z-A)
    Then Verify the Product list is Sorted by name (Z-A)

  Scenario: Verify User able to view the product list with sorting by price low to high
    Given Browse to web site "https://www.saucedemo.com/"
    When User logins in user valid username and password
    And User changes the sorting by price low to high
    Then Verify the Product list is Sorted by price low to high

  Scenario: Verify User able to view the product list with sorting by price high to low
    Given Browse to web site "https://www.saucedemo.com/"
    When User logins in user valid username and password
    And User changes the sorting by price high to low
    Then Verify the Product list is Sorted by price high to low





  Scenario: Unsuccessful Login with Incorrect Email Address
    Given I am on the Sign In page "https://dev-insights.entrustody.com/dashboard"
    When I enter an Invalid Email id
    And I enter a valid Password
    And I click on Sign In button
    Then I should see an error message "We can't seem to find your account"
    And I should remain on the Sign in page

  Scenario: Unsuccessful Login with Incorrect Password
    Given I am on the Sign In page "https://dev-insights.entrustody.com/dashboard"
	When I enter an valid Email id
    And I enter a invalid Password
    And I click on Sign In button
    Then I should see an error message "Your password is incorrect"
    And I should remain on the Sign in page

  Scenario: Verify User not able to login to Insight Dashbaord using valid Username and Password
    Given I am on the Sign In page "https://dev-insights.entrustody.com/dashboard"
	When I enter my valid Email address and password
    And I click on Sign In button
    Then I should be redirected to Insight Dashboard page
    And Clicking on logout brings to login page