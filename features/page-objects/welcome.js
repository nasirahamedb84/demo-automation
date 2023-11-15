const {By, Key, until} = require('selenium-webdriver');
const NetNewAssets = require('../datasets/NetNewassets.js');
const TotalAUM = require('../datasets/TotalAUM.js');
const Tiles = require('../datasets/Tiles.js');
const assert = require('assert');
const { verify } = require('crypto');

class WelcomePage {
  constructor(driver) {
    this.driver = driver;
    this.tableNetNewAssetsRows = By.xpath("(//*[@id='__next']//*[@aria-labelledby='tableTitle'])[1]//tbody/tr");
    this.tableNetNewAssetsColumns = By.xpath("(//*[@id='__next']//*[@aria-labelledby='tableTitle'])[1]//tbody/tr/th");
    this.tableNetNewAssetsHeaderCells = By.xpath("(//*[@id='__next']//*[@aria-labelledby='tableTitle'])[1]//thead/tr/th");
    this.tableTotalAUMRows = By.xpath("(//*[@id='__next']//*[@aria-labelledby='tableTitle'])[2]//tbody/tr")
    this.tableTotalAUMColumns = By.xpath("(//*[@id='__next']//*[@aria-labelledby='tableTitle'])[2]//tbody/tr/th");
    this.tableTotalAUMHeaderCells = By.xpath("(//*[@id='__next']//*[@aria-labelledby='tableTitle'])[2]//thead/tr/th");
    //this.tableNetNewAssetsRows = By.xpath("//*[@aria-colcount='5']//div[@data-id]");
    //this.tableNetNewAssetsHeaderCells = By.xpath("//*[@aria-colcount='5']//div[@role='columnheader']");
    //this.tableTotalAUMRows = By.xpath("//*[@aria-colcount='4']//div[@data-id]");
    //this.tableTotalAUMHeaderCells = By.xpath("//*[@aria-colcount='4']//div[@role='columnheader']");
    //this.tableRowByIndex = By.xpath("//*[@aria-colcount='5']//div[@data-id='{index}']");

    //element for tiles
    this.tileContainer = By.xpath("//*[@id='__next']//div[contains(@class,'MuiBox-root')]/div[contains(@class,'MuiContainer-root')]")
    this.newNewAssets = By.xpath("//*[@id='__next']//div[@data-testid='net-new-assets']")
    this.houseHolds = By.xpath("//*[@id='__next']//div[@data-testid='households']")
    this.onboardingTime = By.xpath("//*[@id='__next']//div[@data-testid='onboarding-time']")
    this.outFlow = By.xpath("//*[@id='__next']//div[@data-testid='outflow']")
    this.growthRate = By.xpath("//*[@id='__next']//div[@data-testid='growth-rate']")
    this.poorAdvisor = By.xpath("//*[@id='__next']//div[@data-testid='poor-performing-advisor']")
    this.topAdvisor = By.xpath("//*[@id='__next']//div[@data-testid='top-performing-advisor']")
    this.topOffice = By.xpath("//*[@id='__next']//div[@data-testid='top-performing-office']")

  }

  async verifyTableNetNewAssetsData() {
    const extractedData = [];
    /*const rows = await this.driver.findElements(this.tableNetNewAssetsRows);
    // Loop through rows and cells to verify data
    for (let i = 0; i < rows.length; i++) {
      const cells = await this.driver.findElements(By.xpath("(//*[@aria-colcount='5']//div[@data-id='"+[i+1]+"']//div[@role='cell'])"));
      const rowData = await Promise.all(cells.map(cell => cell.getText()));
      extractedData.push(rowData);
    }
    assert.deepStrictEqual(NetNewAssets.tableNetNewAssetsData, extractedData);    */
    const rows = await this.driver.findElements(this.tableNetNewAssetsRows);
    for (let i = 0; i < rows.length; i++) {
      // Get all cells in the current row
      const cells = await rows[i].findElements(By.css('td, th'));
      const rowData = await Promise.all(cells.map(cell => cell.getText()));
      extractedData.push(rowData);
    }
    assert.deepStrictEqual(NetNewAssets.tableNetNewAssetsData1, extractedData);
  }

  async verifyTableNetNewAssetsHeader() {
    const extractedHeaderData = [];
    const cells = await this.driver.findElements(this.tableNetNewAssetsHeaderCells);
    const rowData = await Promise.all(cells.map(cell => cell.getText()));
    extractedHeaderData.push(rowData);
    assert.deepStrictEqual(NetNewAssets.tableNetNewAssetsHeader1, extractedHeaderData);
    }

  async verifyTableTotalAUMData() {
    const extractedData = [];
    const rows = await this.driver.findElements(this.tableTotalAUMRows);
    // Loop through rows and cells to verify data
    for (let i = 0; i < rows.length; i++) {
      const cells = await rows[i].findElements(By.css('td, th'));
      const rowData = await Promise.all(cells.map(cell => cell.getText()));
      extractedData.push(rowData);
    }
    assert.deepStrictEqual(TotalAUM.tableTotalAUMData1, extractedData);    
  }

  async verifyTableTotalAUMHeader() {
    const extractedHeaderData = [];
    const cells = await this.driver.findElements(this.tableTotalAUMHeaderCells);
    const rowData = await Promise.all(cells.map(cell => cell.getText()));
    extractedHeaderData.push(rowData);
    assert.deepStrictEqual(TotalAUM.tableTotalAUMHeader1, extractedHeaderData);
    }

  async verifyTilesContent(tileName) {
    switch (tileName) {
      case 'Net New Assets':
        const dat1 = await this.driver.findElement(this.newNewAssets).getText()
        console.log(dat1)
        assert.deepStrictEqual(Tiles.tileNetNewAssets, await dat1.split('\n'));
        break
      case 'Households':
        const dat2 = await this.driver.findElement(this.houseHolds).getText()
        console.log(dat2)
        assert.deepStrictEqual(Tiles.tileHouseholds, await dat2.split('\n'));
        break
      case 'Onboarding Time':
        const dat3 = await this.driver.findElement(this.onboardingTime).getText()
        console.log(dat3)
        assert.deepStrictEqual(Tiles.tileOnboardingTime, await dat3.split('\n'));
        break
      case 'Outflow':
        const dat4 = await this.driver.findElement(this.outFlow).getText()
        console.log(dat4)
        assert.deepStrictEqual(Tiles.tileOutFlow, await dat4.split('\n'));
        break
      case 'GrowthRate':
        const dat5 = await this.driver.findElement(this.growthRate).getText()
        console.log(dat5)
        assert.deepStrictEqual(Tiles.tileGrowthRate, await dat5.split('\n'));
        break
      case 'PoorAdvisor':
        const dat6 = await this.driver.findElement(this.poorAdvisor).getText()
        console.log(dat6)
        assert.deepStrictEqual(Tiles.tilePoorAdvisor, await dat6.split('\n'));
        break
      case 'TopOffice':
        const dat7 = await this.driver.findElement(this.topOffice).getText()
        console.log(dat7)
        assert.deepStrictEqual(Tiles.tiletopOffice, await dat7.split('\n'));
        break
      case 'TopAdvisor':
        const dat8 = await this.driver.findElement(this.topAdvisor).getText()
        console.log(dat8)
        assert.deepStrictEqual(Tiles.tileTopAdvisor, await dat8.split('\n'));
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

  async verifyBackgroundColorForNetNewAssetsRow(index, expectedBGColor) {
    const rows = await this.driver.findElements(this.tableNetNewAssetsColumns)
    assert.equal(await rows[index-1].getCssValue('background-color'), expectedBGColor);
  }
  
  async verifyBackgroundColorForTotalAUMRow(index, expectedBGColor) {
    const rows = await this.driver.findElements(this.tableTotalAUMColumns)
    assert.equal(await rows[index-1].getCssValue('background-color'), expectedBGColor);
  }
  
  }  


  module.exports = WelcomePage;