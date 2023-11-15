const {Before, Given, When, Then, setDefaultTimeout} = require('@cucumber/cucumber')
const LoginPage = require('../page-objects/login');
const WelcomePage = require('../page-objects//welcome');
//const NetNewAssets = require('../datasets/NetNewassets.js');
setDefaultTimeout(400 * 1000);

const { Select } = require('selenium-webdriver/lib/select');
const assert = require('assert')

Before(async function () {
  this.loginPage = new LoginPage(this.driver);
  this.welcomePage = new WelcomePage(this.driver);
})

Given('I am on the Sign In page', async function () { 
  await this.loginPage.open();
});

When('I should see the entrustody logo, signin button and terms', async function () {
  await this.loginPage.verifyInsightTextOnSignIn()
  await this.loginPage.verifyTermsAndConditions()
})

When('I enter my valid Email address and password', async function () {
  await this.loginPage.clickSignInButton()
  await this.loginPage.enterUsername("pedrohsduarte@gmail.com")
  await this.loginPage.enterPassword("c1SHEne4w8DG")
  });

When('I click on Sign In button', async function () {
  await this.loginPage.clickLogin()
});

Then('I should be redirected to Insight Dashboard page', async function () {
  await this.loginPage.verifyUserAccount("Pedro Duarte")
});

When('Clicking on logout brings to login page', async function () {
  await this.loginPage.clickUserAccount()
  await this.loginPage.chooseLogoffFromUserAccountMenuOption()
  await this.loginPage.verifySignInButtonOnLoginPage()
});

When('I enter an Invalid Email id', async function () {
  await this.loginPage.clickSignInButton()
  await this.loginPage.enterUsername("nahamed@entrustody.com")
});

When('I enter a valid Password', async function () {
  await this.loginPage.enterPassword("c1SHEne4w8DG")
});

When('I enter an valid Email id', async function () {
  await this.loginPage.clickSignInButton()
  await this.loginPage.enterUsername("pedrohsduarte@gmail.com")
});

When('I enter a invalid Password', async function () {
  await this.loginPage.enterPassword("IncorrectPWD12345678")
});

Then('I should see an error message {string}', async function (error_Message) {
  await this.loginPage.verifyErrorMessageOnSignOnPage(error_Message)
});

Then('I should remain on the Sign in page', async function () {
  await this.loginPage.verifySignInPageHeadng()
});

When('I should see the Net New Assets report displayed with applied filter {float} By Advisor and Last {int} days under Net New Assets', async function (float, int) {
  this.welcomePage = new WelcomePage(this.driver);
  await this.welcomePage.verifyTableNetNewAssetsHeader()
  await this.welcomePage.verifyTableNetNewAssetsData()  
});

When('I try to access the dashbaord URL directly', async function () {
  await this.loginPage.openDashboardLinkDirectly()
});

Then('I should redirect to Insight Sign In Page', async function () {
  await this.loginPage.verifySignInButtonOnLoginPage()
});

Then('Clicking on Sign In button takes to login page', async function () {
  await this.loginPage.clickSignInButton()
  await this.loginPage.verifySignInPageHeadng()
});

Then('I should see the Total AUM report displayed with applied filter - By Advisor and Current', async function () {
  this.welcomePage = new WelcomePage(this.driver);
  await this.welcomePage.verifyTableTotalAUMHeader()
  await this.welcomePage.verifyTableTotalAUMData()  
});

When('net new aum for an advisor is below a pre-determined threshold or goal, their record is highlighted red', async function () {
  const expectedBGColor = "rgba(253, 232, 228, 1)"
  await this.welcomePage.verifyBackgroundColorForNetNewAssetsRow(1, expectedBGColor)
});

When('net new aum for an advisor is above a pre-determined threshold or goal, their record is highlighted green', async function () {
  const expectedBGColor = "rgba(133, 217, 206, 0.25)"
  await this.welcomePage.verifyBackgroundColorForNetNewAssetsRow(4, expectedBGColor)
});

When('Total AUM for an advisor is below a pre-determined threshold or goal, their record is highlighted red', async function () {
  const expectedBGColor = "rgba(253, 232, 228, 1)"
  await this.welcomePage.verifyBackgroundColorForTotalAUMRow(1, expectedBGColor)
});

When('Total AUM for an advisor is above a pre-determined threshold or goal, their record is highlighted green', async function () {
  const expectedBGColor = "rgba(133, 217, 206, 0.25)"
  await this.welcomePage.verifyBackgroundColorForTotalAUMRow(4, expectedBGColor)
});

Then('I should see L1 tiles displayed in the order - {string}, {string}, {string}, {string}, {string}, {string}, {string}, {string}', async function (string1, string2, string3, string4, string5, string6, string7, string8) {
  const params = [string1, string2, string3, string4, string5, string6, string7, string8]
  for(let i = 0; i < params.length; i++) {
    await this.welcomePage.verifyTilesContent(params[i])
  }
});

When('I mouse hover on Net New Assets tile', async function () {
  await this.welcomePage.verifyBackgroundColor("rgba(255, 255, 255, 1)")
  await this.welcomePage.mouseHoverOntile()
});

When('I should see the tile gets highlighted with grey background', async function () {
  await this.welcomePage.verifyBackgroundColor("rgba(233, 235, 236, 1)")
});