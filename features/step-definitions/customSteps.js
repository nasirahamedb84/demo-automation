const {Given, When, Then} = require('@cucumber/cucumber')
const assert = require('assert')
const {Builder, By, Key, until} = require('selenium-webdriver');
const { Select } = require('selenium-webdriver/lib/select');
let driver;
const map = Builder.prototype.map;

Given('Browse to web site {string}', async function (url) {
    // write a code to open chrome driver    
    driver = await new Builder()
    .forBrowser('chrome')
    .build();
    await driver.get(url);
    await driver.manage().window().maximize();
    await driver.manage().setTimeouts({ implicit: 10000 });
  });

  When('User logins in user valid username and password', async function () {
    await driver.findElement(By.xpath("//input[@id='user-name']")).click();
    await driver.findElement(By.xpath("//input[@id='user-name']")).sendKeys("standard_user")
    await driver.findElement(By.xpath("//input[@id='password']")).click();
    await driver.findElement(By.xpath("//input[@id='password']")).sendKeys("secret_sauce")
    await driver.findElement(By.xpath("//input[@id='login-button']")).click();
    assert.equal(await driver.findElement(By.xpath("//div[@class='app_logo']")).getText(), "Swag Labs");
  });

  Then('Verify the Product list is Sorted by name \\(A-Z) by default', async function () {
    assert.equal(await driver.findElement(By.xpath("//span[@class='select_container']/span[@class='active_option']")).getText(), "Name (A to Z)");
    const valuesArray = [];
    const expectedArray = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt', 'Sauce Labs Fleece Jacket', 'Sauce Labs Onesie', 'Test.allTheThings() T-Shirt (Red)'];
    const productnames = await driver.findElements(By.xpath("//div[@class='inventory_item_name']"));
    for (const element of productnames) {
      const text = await element.getText();
      valuesArray.push(text);
    }
    assert.deepEqual(valuesArray, expectedArray);
    await driver.quit();
  });

  When('User changes the sorting by name \\(Z-A)', async function () {
    const selectElement = await driver.findElement(By.xpath("//select[@class='product_sort_container']"));
    const select = new Select(selectElement);
    select.selectByValue('za');
    await new Promise(resolve => setTimeout(resolve, 2000));
    assert.equal(await driver.findElement(By.xpath("//span[@class='select_container']/span[@class='active_option']")).getText(), "Name (Z to A)");
  });

  Then('Verify the Product list is Sorted by name \\(Z-A)', async function () {
    const valuesArray = [];
    const expectedArray = ['Test.allTheThings() T-Shirt (Red)', 'Sauce Labs Onesie', 'Sauce Labs Fleece Jacket', 'Sauce Labs Bolt T-Shirt', 'Sauce Labs Bike Light',  'Sauce Labs Backpack'];
    const productnames = await driver.findElements(By.xpath("//div[@class='inventory_item_name']"));
    for (const element of productnames) {
      const text = await element.getText();
      valuesArray.push(text);
    }
    assert.deepEqual(valuesArray, expectedArray);
    await driver.quit();
  });

  When('User changes the sorting by price low to high', async function () {
    const selectElement = await driver.findElement(By.xpath("//select[@class='product_sort_container']"));
    const select = new Select(selectElement);
    select.selectByValue('lohi');
    await new Promise(resolve => setTimeout(resolve, 2000));
    assert.equal(await driver.findElement(By.xpath("//span[@class='select_container']/span[@class='active_option']")).getText(), "Price (low to high)");
  });

  Then('Verify the Product list is Sorted by price low to high', async function () {
    const valuesArray = [];
    const expectedArray = ['$7.99', '$9.99', '$15.99', '$15.99', '$29.99', '$49.99'];
    const productnames = await driver.findElements(By.xpath("//div[@class='inventory_item_price']"));
    for (const element of productnames) {
      const text = await element.getText();
      valuesArray.push(text);
    }
    assert.deepEqual(valuesArray, expectedArray);
    await driver.quit();
  });

  When('User changes the sorting by price high to low', async function () {
    const selectElement = await driver.findElement(By.xpath("//select[@class='product_sort_container']"));
    const select = new Select(selectElement);
    select.selectByValue('hilo');
    await new Promise(resolve => setTimeout(resolve, 2000));
    assert.equal(await driver.findElement(By.xpath("//span[@class='select_container']/span[@class='active_option']")).getText(), "Price (high to low)");
  });

  Then('Verify the Product list is Sorted by price high to low', async function () {
    const valuesArray = [];
    const expectedArray = ['$49.99', '$29.99', '$15.99', '$15.99', '$9.99', '$7.99'];
    const productnames = await driver.findElements(By.xpath("//div[@class='inventory_item_price']"));
    for (const element of productnames) {
      const text = await element.getText();
      valuesArray.push(text);
    }
    assert.deepEqual(valuesArray, expectedArray);
    await driver.quit();
  });

  
  //write a selenium Javascript using cucumber BDD framework for the following scenario:
  // drag a element from one location to another location
  // using actions class
  // https://www.globalsqa.com/demo-site/draganddrop/

  When('User drags a element from one location to another location', async function () {
    await driver.get("https://www.globalsqa.com/demo-site/draganddrop/");
    await driver.manage().window().maximize();
    await driver.manage().setTimeouts({ implicit: 10000 });
    await new Promise(resolve => setTimeout(resolve, 2000));
    const source = await driver.findElement(By.xpath("//div[@id='gallery']/img[1]"));
    const target = await driver.findElement(By.xpath("//div[@id='trash']"));
    await driver.actions({bridge: true}).dragAndDrop(source, target).perform();
    await new Promise(resolve => setTimeout(resolve, 2000));
  });

  Then('Verify the element is dragged from one location to another location', async function () {
    const target = await driver.findElement(By.xpath("//div[@id='trash']/img"));
    assert.equal(await target.isDisplayed(), true);
    await driver.quit();
  });

  //write a selenium Javascript using cucumber BDD framework for the following scenario:
  // select a element from a dropdown
  // https://www.globalsqa.com/demo-site/select-dropdown-menu/

  When('User selects a element from a dropdown', async function () {
    await driver.get("https://www.globalsqa.com/demo-site/select-dropdown-menu/");
    await driver.manage().window().maximize();
    await driver.manage().setTimeouts({ implicit: 10000 });
    await new Promise(resolve => setTimeout(resolve, 2000));
    const selectElement = await driver.findElement(By.xpath("//select[@id='post-body-8228718889842861689']/option[2]"));
    await selectElement.click();
    await new Promise(resolve => setTimeout(resolve, 2000));
  });

  //write a selenium Javascript using cucumber BDD framework for the following scenario:
  // get all the social links from the footer page on https://www.saucedemo.com/inventory.html
  //and store it in an array

  When('User gets all the social links from the footer page', async function () {
    await driver.get("https://www.saucedemo.com/inventory.html");
    await driver.manage().window().maximize();
    await driver.manage().setTimeouts({ implicit: 10000 });
    await new Promise(resolve => setTimeout(resolve, 2000));
    const socialLinks = await driver.findElements(By.xpath("//div[@class='social_links']/a"));
    const valuesArray = [];
    for (const element of socialLinks) {
      const text = await element.getAttribute("href");
      valuesArray.push(text);
    }
    console.log(valuesArray);
    await new Promise(resolve => setTimeout(resolve, 2000));
  });

 