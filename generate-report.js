const reporter = require('cucumber-html-reporter');

const options = {
  theme: 'bootstrap',
  jsonFile: 'reports/results.json',  // Path to your JSON results file
  output: 'reports/cucumber_report.html', // Path for the generated HTML report
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
  metadata: {
    'App Version': 'ent-ins-2.0.0',
    'Test Environment': 'https://dev-insights.entrustody.com/',
    'Browser': 'Chrome 118',
    'Platform': 'Mac OS',
    'Parallel': 'Scenarios',
    'Executed': 'Local'
  }
};

reporter.generate(options);