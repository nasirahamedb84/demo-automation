const {By, Key, until} = require('selenium-webdriver');
const NetNewAssets = require('../datasets/NetNewassets.js');
const TotalAUM = require('../datasets/TotalAUM.js');
const Tiles = require('../datasets/Tiles.js');
const assert = require('assert');
const { verify } = require('crypto');

class WelcomePage {
  constructor(driver) {
    this.driver = driver;
    this.tableNetNewAssetsRows = By.xpath("//*[@aria-colcount='5']//div[@data-id]");
    this.tableNetNewAssetsHeaderCells = By.xpath("//*[@aria-colcount='5']//div[@role='columnheader']");
    this.tableTotalAUMRows = By.xpath("//*[@aria-colcount='4']//div[@data-id]");
    this.tableTotalAUMHeaderCells = By.xpath("//*[@aria-colcount='4']//div[@role='columnheader']");
    //this.tableRowByIndex = By.xpath("//*[@aria-colcount='5']//div[@data-id='{index}']");

    //element for tiles
    this.tileContainer = By.xpath("//*[@id='__next']//div[contains(@class,'MuiBox-root')]/div[contains(@class,'MuiContainer-root')]")
    this.newNewAssets = By.xpath("//*[@id='__next']//div[contains(@class,'MuiBox-root')]/div[contains(@class,'MuiContainer-root')]//div[contains(@class,'MuiCard-root')][1]")
    this.houseHolds = By.xpath("//*[@id='__next']//div[contains(@class,'MuiBox-root')]/div[contains(@class,'MuiContainer-root')]//div[contains(@class,'MuiCard-root')][2]")
    this.onboardingTime = By.xpath("//*[@id='__next']//div[contains(@class,'MuiBox-root')]/div[contains(@class,'MuiContainer-root')]//div[contains(@class,'MuiCard-root')][3]")
    this.outFlow = By.xpath("//*[@id='__next']//div[contains(@class,'MuiBox-root')]/div[contains(@class,'MuiContainer-root')]//div[contains(@class,'MuiCard-root')][4]")
    this.growthRate = By.xpath("//*[@id='__next']//div[contains(@class,'MuiBox-root')]/div[contains(@class,'MuiContainer-root')]//div[contains(@class,'MuiCard-root')][5]")
    this.topOffice = By.xpath("//*[@id='__next']//div[contains(@class,'MuiBox-root')]/div[contains(@class,'MuiContainer-root')]//div[contains(@class,'MuiCard-root')][6]")
    this.topAdvisor = By.xpath("//*[@id='__next']//div[contains(@class,'MuiBox-root')]/div[contains(@class,'MuiContainer-root')]//div[contains(@class,'MuiCard-root')][last()]")

  }

  async verifyTableNetNewAssetsData() {
    const extractedData = [];
    const rows = await this.driver.findElements(this.tableNetNewAssetsRows);
    // Loop through rows and cells to verify data
    for (let i = 0; i < rows.length; i++) {
      const cells = await this.driver.findElements(By.xpath("(//*[@aria-colcount='5']//div[@data-id='"+[i+1]+"']//div[@role='cell'])"));
      const rowData = await Promise.all(cells.map(cell => cell.getText()));
      extractedData.push(rowData);
    }
    assert.deepStrictEqual(NetNewAssets.tableNetNewAssetsData, extractedData);    
  }

  async verifyTableNetNewAssetsHeader() {
    const extractedHeaderData = [];
    const cells = await this.driver.findElements(this.tableNetNewAssetsHeaderCells);
    const rowData = await Promise.all(cells.map(cell => cell.getText()));
    extractedHeaderData.push(rowData);
    assert.deepStrictEqual(NetNewAssets.tableNetNewAssetsHeader, extractedHeaderData);
    }

  async verifyTableTotalAUMData() {
    const extractedData = [];
    const rows = await this.driver.findElements(this.tableTotalAUMRows);
    // Loop through rows and cells to verify data
    for (let i = 0; i < rows.length; i++) {
      const cells = await this.driver.findElements(By.xpath("(//*[@aria-colcount='4']//div[@data-id='"+[i+1]+"']//div[@role='cell'])"));
      const rowData = await Promise.all(cells.map(cell => cell.getText()));
      extractedData.push(rowData);
    }
    assert.deepStrictEqual(TotalAUM.tableTotalAUMData, extractedData);    
  }

  async verifyTableTotalAUMHeader() {
    const extractedHeaderData = [];
    const cells = await this.driver.findElements(this.tableTotalAUMHeaderCells);
    const rowData = await Promise.all(cells.map(cell => cell.getText()));
    extractedHeaderData.push(rowData);
    assert.deepStrictEqual(TotalAUM.tableTotalAUMHeader, extractedHeaderData);
    }

  async verifyTilesContent(tileName) {
    switch (tileName) {
      case 'Net New Assets':
        const dat1 = await this.driver.findElement(this.newNewAssets).getText()
        assert.deepStrictEqual(Tiles.tileNetNewAssets, await dat1.split('\n'));
        break
      case 'Households':
        const dat2 = await this.driver.findElement(this.houseHolds).getText()
        assert.deepStrictEqual(Tiles.tileHouseholds, await dat2.split('\n'));
        break
      case 'Onboarding Time':
        const dat3 = await this.driver.findElement(this.onboardingTime).getText()
        assert.deepStrictEqual(Tiles.tileOnboardingTime, await dat3.split('\n'));
        break
      case 'Outflow':
        const dat4 = await this.driver.findElement(this.outFlow).getText()
        assert.deepStrictEqual(Tiles.tileOutFlow, await dat4.split('\n'));
        break
      case 'GrowthRate':
        const dat5 = await this.driver.findElement(this.growthRate).getText()
        assert.deepStrictEqual(Tiles.tileGrowthRate, await dat5.split('\n'));
        break
      case 'TopOffice':
        const dat6 = await this.driver.findElement(this.topOffice).getText()
        assert.deepStrictEqual(Tiles.tiletopOffice, await dat6.split('\n'));
        break
      case 'TopAdvisor':
        const dat7 = await this.driver.findElement(this.topAdvisor).getText()
        assert.deepStrictEqual(Tiles.tileTopAdvisor, await dat7.split('\n'));
        break
      }
    }

  async verifyBackgroundColor(expectedBGColor) {
    const backgroundColor = await this.driver.findElement(this.newNewAssets).getCssValue('background-color');
    //console.log(backgroundColor);
    assert.equal(backgroundColor, expectedBGColor);
    }
  
  async mouseHoverOntile() {
    const elementToHover = await this.driver.findElement(this.newNewAssets);
    await this.driver.actions().move({ origin: elementToHover }).perform();
    await this.driver.sleep(1000);
    //const actions = this.driver.actions();
    //await actions.moveToElement(elementToHover).perform();
    }
  }  


  module.exports = WelcomePage;