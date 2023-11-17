const {By, Key, until} = require('selenium-webdriver');
const NetNewAssets = require('../datasets/NetNewassets.js');
const TotalAUM = require('../datasets/TotalAUM.js');
const Tiles = require('../datasets/Tiles.js');
const assert = require('assert');
const { verify } = require('crypto');

class WelcomePage {
  constructor(driver) {
    this.driver = driver;
    //element for Net New assets table
    this.tableNetNewAssetsRows = By.xpath("(//*[@id='__next']//*[@aria-labelledby='tableTitle'])[1]//tbody/tr");
    this.tableNetNewAssetsColumns = By.xpath("(//*[@id='__next']//*[@aria-labelledby='tableTitle'])[1]//tbody/tr/th");
    this.tableNetNewAssetsHeaderCells = By.xpath("(//*[@id='__next']//*[@aria-labelledby='tableTitle'])[1]//thead/tr/th");
    this.tableNewNewAssetsSortingcolumn = By.xpath("(//*[@id='__next']//*[@aria-labelledby='tableTitle'])[1]//thead/tr/th[@aria-sort]")
    this.tableNetNewAssetsHeaderColumn1 = By.xpath("(//*[@id='__next']//*[@aria-labelledby='tableTitle'])[1]//thead/tr/th[1]");
    this.tableNetNewAssetsHeaderColumn2 = By.xpath("(//*[@id='__next']//*[@aria-labelledby='tableTitle'])[1]//thead/tr/th[2]");
    this.tableNetNewAssetsHeaderColumn3 = By.xpath("(//*[@id='__next']//*[@aria-labelledby='tableTitle'])[1]//thead/tr/th[3]");
    this.tableNetNewAssetsHeaderColumn4 = By.xpath("(//*[@id='__next']//*[@aria-labelledby='tableTitle'])[1]//thead/tr/th[4]");
    this.tableNetNewAssetsHeaderColumn5 = By.xpath("(//*[@id='__next']//*[@aria-labelledby='tableTitle'])[1]//thead/tr/th[5]");

    //element for Total AUM table
    this.tableTotalAUMRows = By.xpath("(//*[@id='__next']//*[@aria-labelledby='tableTitle'])[2]//tbody/tr")
    this.tableTotalAUMColumns = By.xpath("(//*[@id='__next']//*[@aria-labelledby='tableTitle'])[2]//tbody/tr/th");
    this.tableTotalAUMHeaderCells = By.xpath("(//*[@id='__next']//*[@aria-labelledby='tableTitle'])[2]//thead/tr/th");
    

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

  async verifyTableNetNewAssetsData(columnSortText = "defaultSort") {
    const extractedData = [];
    const rows = await this.driver.findElements(this.tableNetNewAssetsRows);
    for (let i = 0; i < rows.length; i++) {
      // Get all cells in the current row
      const cells = await rows[i].findElements(By.css('td, th'));
      const rowData = await Promise.all(cells.map(cell => cell.getText()));
      extractedData.push(rowData);
    }
    switch (columnSortText) {
      case 'Net New Assets\nSorted Ascending':
        assert.deepStrictEqual(NetNewAssets.tableNetNewAssetsDataSortAscending, extractedData);
        break
      case 'Net New Assets\nSorted Descending':
        assert.deepStrictEqual(NetNewAssets.tableNetNewAssetsDataSortDecending, extractedData);
        break
      case 'Advisor\nSorted Ascending':
        assert.deepStrictEqual(NetNewAssets.tableAdvisorDataSortAscending, extractedData);
        break
      case 'Advisor\nSorted Descending':
        assert.deepStrictEqual(NetNewAssets.tableAdvisorDataSortDecending, extractedData);
        break
      case 'Net New Households\nSorted Ascending':
        assert.deepStrictEqual(NetNewAssets.tableNetNewHouseholdsDataSortAscending, extractedData);
        break
      case 'Net New Households\nSorted Descending':
        assert.deepStrictEqual(NetNewAssets.tableNetNewHouseholdsDataSortDecending, extractedData);
        break
      case 'Inflows\nSorted Ascending':
        assert.deepStrictEqual(NetNewAssets.tableInflowsDataSortAscending, extractedData);
        break
      case 'Inflows\nSorted Descending':
        assert.deepStrictEqual(NetNewAssets.tableInflowsDataSortDecending, extractedData);
        break
      case 'Outflows\nSorted Ascending':
        assert.deepStrictEqual(NetNewAssets.tableOutflowsDataSortAscending, extractedData);
        break
      case 'Outflows\nSorted Descending':
        assert.deepStrictEqual(NetNewAssets.tableOutflowsDataSortDecending, extractedData);
        break
      case 'defaultSort':
        assert.deepStrictEqual(NetNewAssets.tableNetNewAssetsData1, extractedData);
        break
    }
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
    assert.equal(backgroundColor, expectedBGColor);
    }
  
  async mouseHoverOntile() {
    const elementToHover = await this.driver.findElement(this.newNewAssets);
    await this.driver.actions().move({ origin: elementToHover }).perform();
    await this.driver.sleep(1000);
    }

  async verifyBackgroundColorForNetNewAssetsRow(index, expectedBGColor) {
    const rows = await this.driver.findElements(this.tableNetNewAssetsColumns)
    assert.equal(await rows[index-1].getCssValue('background-color'), expectedBGColor);
  }
  
  async verifyBackgroundColorForTotalAUMRow(index, expectedBGColor) {
    const rows = await this.driver.findElements(this.tableTotalAUMColumns)
    assert.equal(await rows[index-1].getCssValue('background-color'), expectedBGColor);
  }

  async clickOnNetNewAssetsSortingColumn() {
    await this.driver.findElement(this.tableNewNewAssetsSortingcolumn).click();
    await this.driver.sleep(2000);
  }

  async getNetNewAssetsSortingColumnName() {
    return await this.driver.findElement(this.tableNewNewAssetsSortingcolumn).getText();
  }
  
  async clickOnNetNewAssetsColumnByIndex(index) {
    await this.driver.findElement(By.xpath("(//*[@id='__next']//*[@aria-labelledby='tableTitle'])[1]//thead/tr/th["+[index]+"]")).click();
    await this.driver.sleep(2000);
  }


  }  


  module.exports = WelcomePage;