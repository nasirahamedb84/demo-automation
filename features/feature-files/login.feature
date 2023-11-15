Feature: Testing Login scenarios for Entrustody Insight

  @all
  Scenario: Verify Sign in page components
    Given I am on the Sign In page
    Then I should see the entrustody logo, signin button and terms

  @all
  @regression
  Scenario: Verify User able to login to Insight Dashbaord using valid Username and Password
    Given I am on the Sign In page
	  When I enter my valid Email address and password
    And I click on Sign In button
    Then I should be redirected to Insight Dashboard page
    And Clicking on logout brings to login page

  @all
  @regression
  Scenario: Unsuccessful Login with Incorrect Email Address
    Given I am on the Sign In page
    When I enter an Invalid Email id
    And I enter a valid Password
    And I click on Sign In button
    Then I should see an error message "We can't seem to find your account"
    And I should remain on the Sign in page

  @all
  @smoke
  Scenario: Unsuccessful Login with Incorrect Password
    Given I am on the Sign In page
	  When I enter an valid Email id
    And I enter a invalid Password
    And I click on Sign In button
    Then I should see an error message "Your password is incorrect"
    And I should remain on the Sign in page

  @all
  @smoke
  Scenario: Accessing the Insight Dashboard Without Logging In
	  When I try to access the dashbaord URL directly
    Then I should redirect to Insight Sign In Page
    And Clicking on Sign In button takes to login page