#!/usr/bin/env node
/*

const yargs = require('yargs');
const { exec } = require('child_process');

yargs
  .command('test', 'Run Cucumber tests with tags', (yargs) => {
    yargs
      .option('tags', {
        alias: 't',
        describe: 'Run tests with specific tags',
        default: '@logins', // Change the default tags as needed
      })
      .help();
  }, (argv) => {
    console.log(argv.tags);
    const command = "node_modules/.bin/cucumber-js --tags " + argv.tags + " --format json:./reports/results.json";
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Error: ${stderr}`);
        return;
      }
      console.log(stdout);
    });
  })
  .demandCommand(1, 'You need to specify a command.')
  .help()
  .argv;
*/

/*
// Define command-line options using Yargs
const argv = yargs
  .option('suite', {
    alias: 's',
    describe: 'Specify the test suite to run',
    choices: ['suiteA', 'suiteB', 'all'], // Replace with your suite names
    default: 'all', // Default suite to run
  })
  .help()
  .alias('help', 'h')
  .argv;

// Define actions based on the provided options
const runSuite = (suite) => {
  // Implement logic to execute the specified test suite
  if (suite === 'suiteA') {
    console.log('Running Suite A');
    const command = "node_modules/.bin/cucumber-js --tags @table features/feature-files/login.feature --format json:./reports/results.json";
    exec(command);
    // Add your code to run Suite A
  } else if (suite === 'suiteB') {
    console.log('Running Suite B');
    // Add your code to run Suite B
  } else if (suite === 'all') {
    console.log('Running All Suites');
    // Add your code to run all test suites
  }
};

// Execute the specified test suite(s)
runSuite(argv.suite);
*/


//choices: ['@smoke', '@regression', '@all'], // Replace with your suite names

const yargs = require('yargs');
const { exec } = require('child_process');

yargs
  .command('test', 'Run Cucumber tests with tags', (yargs) => {
    yargs
      .option('tags', {
        alias: 't',
        describe: 'Run tests with specific tags',
        default: '@smoke', // Change the default tags as needed
        choices: ['@smoke', '@regression', '@all', '@debug'], // Replace with your suite names
      })
  }, (argv) => {
    const command = "node_modules/.bin/cucumber-js --tags " + argv.tags + " --format json:./reports/results.json";
    console.log(command);
    exec(command);
  })
  .help()
  .argv;