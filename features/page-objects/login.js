const {By, Key, until} = require('selenium-webdriver');
const assert = require('assert')

class LoginPage {
  constructor(driver) {
    this.driver = driver;
    this.insightURL = "https://dev-insights.entrustody.com/dashboard";
    this.insightLoginURL = "https://dev-insights.entrustody.com/login";
    this.signinButton = By.xpath("//*[@id='__next']//button");
    this.usernameInput = By.xpath("//*[@id='email']");
    this.passwordInput = By.xpath("//*[@id='password']");
    this.loginButton = By.xpath("//*[@id='next']");
    this.userAccount = By.xpath("//button[@id='account-button']");
    this.logOut = By.xpath("//*[@id='account-menu']//a[text()='Logout']");
    this.errorMessage = By.xpath("//div[@class='error pageLevel']");
    this.signInHeading = By.xpath("//*[@id='api']/div[@class='heading']")
    this.tableNetNewAssetsRows = By.xpath("//*[@aria-colcount='5']//div[@data-id]");
    this.tableTotalAUMRows = By.xpath("//*[@aria-colcount='4']//div[@data-id]");

  }

  async open() {
    await this.driver.get(this.insightLoginURL);
    await this.driver.manage().window().maximize();
    await this.driver.sleep(3500);
  }

  async openDashboardLinkDirectly() {
    await this.driver.get(this.insightURL);
    await this.driver.manage().window().maximize();
    await this.driver.sleep(3500);
  }

  async clickSignInButton() {
    let el = await this.driver.findElement(this.signinButton);
    await this.driver.wait(until.elementIsVisible(el),100);
    await el.click();
    await this.driver.sleep(15000);
  }

  async enterUsername(username) {
    await this.driver.findElement(this.usernameInput).click();
    await this.driver.findElement(this.usernameInput).sendKeys(username);
    await this.driver.sleep(4000);
  }

  async enterPassword(password) {
    await this.driver.findElement(this.passwordInput).click();
    await this.driver.findElement(this.passwordInput).sendKeys(password);
    await this.driver.sleep(4000);
  }

  async clickLogin() {
    await this.driver.findElement(this.loginButton).click();
    await this.driver.sleep(15000);
  }

  async verifyUserAccount(accountname) {
    console.log(await this.driver.findElement(this.userAccount).getText())
    assert.equal(await this.driver.findElement(this.userAccount).getText(), accountname);
  }

  async clickUserAccount() {
    await this.driver.findElement(this.userAccount).click();
    await this.driver.sleep(1000);
  }
  
  async chooseLogoffFromUserAccountMenuOption() {
    await this.driver.findElement(this.logOut).click();
    await this.driver.sleep(9000);
  }
  
  async verifySignInButtonOnLoginPage() {
    assert.equal(await this.driver.findElement(this.signinButton).getText(), "SIGN IN");
    await this.driver.sleep(1000);
  }

  async verifyErrorMessageOnSignOnPage(error_Message) {
    assert.equal(await this.driver.findElement(this.errorMessage).getText(), error_Message);
  }

  async verifySignInPageHeadng() {
    assert.equal(await this.driver.findElement(this.signInHeading).getText(), "Sign in");
    await this.driver.sleep(1000);
  }

  async verifyBackgroundColorForNetNewAssetsRow(index, expectedBGColor) {
    const rows = await this.driver.findElements(this.tableNetNewAssetsRows)
    assert.equal(await rows[index-1].getCssValue('background-color'), expectedBGColor);
  }

  async verifyBackgroundColorForTotalAUMRow(index, expectedBGColor) {
    const rows = await this.driver.findElements(this.tableTotalAUMRows)
    assert.equal(await rows[index-1].getCssValue('background-color'), expectedBGColor);
  }
  
}

module.exports = LoginPage;