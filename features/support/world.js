
const { setWorldConstructor, After, setDefaultTimeout, AfterAll } = require('@cucumber/cucumber')
const { Builder } = require('selenium-webdriver');
setDefaultTimeout(400 * 1000);

class CustomWorld {
  constructor() {
    this.driver = new Builder()
    .forBrowser('chrome')
    .build();
  }
}

setWorldConstructor(CustomWorld);

After(function () {
  // This hook will run after each scenario, whether it passes or fails.
  return this.driver.quit(); // Close the WebDriver after the scenario
});
/*
AfterAll(function () {
  const reporter = require('cucumber-html-reporter');
  const options = {
    theme: 'bootstrap',
    jsonFile: '../../reports/results.json',  // Path to your JSON results file
    output: '../../reports/cucumber_report.html', // Path for the generated HTML report
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: true,
    metadata: {
      'App Version': '1.0.0',
      'Test Environment': 'Dev',
      'Browser': 'Chrome 117',
      'Platform': 'Mac OS',
      'Parallel': 'Scenarios',
      'Executed': 'Local'
    }
  };
reporter.generate(options);
})
*/