Feature: Testing welcome page scenarios for Entrustody Insight

    @all
    Scenario: Verifying the Insight Firm Over L1 tiles
        Given I am on the Sign In page
        When I enter my valid Email address and password
        And I click on Sign In button
        Then I should see L1 tiles displayed in the order - "NET NEW ASSETS", "HOUSEHOLDS", "ONBOARDING TIME", "OUTFLOW", "GROWTH RATE", "POOR PERFORMING ADVISOR", "TOP PERFORMING OFFICE", "TOP PERFORMING ADVISOR"
        And Clicking on logout brings to login page
    
    @all
    Scenario: Verifying the Net New Assets Tile mouse hover functionality
        Given I am on the Sign In page
        When I enter my valid Email address and password
        And I click on Sign In button
        And I mouse hover on Net New Assets tile
        Then I should see the tile gets highlighted with grey background
        And Clicking on logout brings to login page

    @all
    @debug
    Scenario: Verifying the Net New Assets Report
        Given I am on the Sign In page
        When I enter my valid Email address and password
        And I click on Sign In button
        Then I should see the Net New Assets report displayed with applied filter - By Advisor and Last 30 days under Net New Assets
        When net new aum for an advisor is below a pre-determined threshold or goal, their record is highlighted red
        When net new aum for an advisor is above a pre-determined threshold or goal, their record is highlighted green
        And Clicking on logout brings to login page

    @all
    @debug
    Scenario: Verifying the Total AUM Report
        Given I am on the Sign In page
        When I enter my valid Email address and password
        And I click on Sign In button
        Then I should see the Total AUM report displayed with applied filter - By Advisor and Current
        When Total AUM for an advisor is below a pre-determined threshold or goal, their record is highlighted red
        #When Total AUM for an advisor is above a pre-determined threshold or goal, their record is highlighted green
        And Clicking on logout brings to login page