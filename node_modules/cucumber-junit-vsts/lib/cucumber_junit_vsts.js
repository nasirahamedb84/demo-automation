var xml = require('xml');
var fs = require('fs');
var path = require('path');

/**
 * Creates a <property> element with name and value
 *
 * @method createProperty
 * @param  {String} name    <property>'s name attribute
 * @param  {String} value   <property>'s value attribute
 * @return {Object}         The <property> element
 */
function createProperty(name, value) {
    return {
        property: [{
            _attr: {
                name: name,
                value: value
            }
        }]
    };
}

/**
 * Creates a <system-out> element with string as [CDATA] value
 * 
 * @method createSystemOut
 * @param  {String} string  <system-out>'s value
 * @return {Object}         The <system-out> element
 */
function createSystemOut (string) {
    return {
        'system-out': {
            '_cdata': string
        }
    }
}

/**
 * Creates a <failure> element with a failure message as attribute and value as [CDATA]
 *
 * @method createFailure
 * @param message           <failure>'s value
 * @returns {Object}        The <failure> element
 */
function createFailure(message) {
    return {
        failure: { 
                '_cdata': message,
                _attr: { message: message.split("\n").shift()
             }
            }
    };
}

/**
 * Convert a scenario from Cucumber.JS into an XML element <testcase>
 *
 * @method convertScenarioToTestCase
 * @param  {Object}    scenarioJson Scenario output from Cucumber.JS
 * @param  {Object}    featureJson  featureJson output from Cucumber.JS
 * @param  {Object}    options      if `strict` is true, pending or undefined steps will be reported as failures.
 * 
 * @return {Object}                 A XML element <testcase>
 */
function convertScenarioToTestCase (scenarioJson, featureJson, options) {
    var testCaseOutput = [{
        _attr: {
            name: (scenarioJson.keyword? scenarioJson.keyword + ': ':'') + scenarioJson.name,
            time: 0
        }
    }];
    var systemOutString = featureJson.keyword + ': ' + featureJson.name + '\n' +
                        scenarioJson.keyword + ': ' + scenarioJson.name + '\n\n';
    var failureFound = false;
    if(scenarioJson.steps) {
        scenarioJson.steps
        .filter(function (stepJson) {
          return !stepJson.hidden;
        })
        .map(function (stepJson) {
            var result = stepJson.result || {};
            var str = stepJson.keyword.trim() + ' ' + stepJson.name + ' (' + (result.status?result.status:'') + (result.duration? ' after ' + (result.duration / 1000000000) + ' sec)': ')') +'\n';
            systemOutString += str;
            
            if (result.duration) {
                // Convert from nanosecond to seconds and add to testcase time
                testCaseOutput[0]._attr.time += (result.duration / 1000000000);
            }
            var failure = checkStatus(result, options, stepJson);
            // only add failure if no other failure was added before. - only for option.strict necessary
            if (!failureFound && failure != undefined) {
                failureFound = true;
                testCaseOutput.push(failure);
            } 
        });
    }
    // only return testcase if steps are available
    if (scenarioJson.steps && scenarioJson.steps.length > 0) {
        testCaseOutput.push(createSystemOut(systemOutString));
        return {testcase: testCaseOutput};
    }
}

function checkStatus(result, options, stepJson) {
    if (result && result.status) {
        switch (result.status) {
            case 'passed':
                break;
            case 'failed':
                return createFailure(result.error_message);
            case 'pending':
            case 'undefined':
                if (options.strict) {
                    return createFailure(result.status == 'pending' ? 'Pending' :
                            'Undefined step. Implement with the following snippet:\n' +
                            '  this.' + stepJson.keyword.trim() + '(/^' + stepJson.name + '$/, function(callback) {\n' +
                            '      // Write code here that turns the phrase above into concrete actions\n' +
                            '      callback(null, \'pending\');\n' +
                            '  });'
                    );
                }
            case 'skipped':
        }
    }
}

/**
 * converts the Feature JSON into a TestSuite and iterates over the Scenarios of this Features
 * Skips background steps and calls `convertScenario` each element
 *
 * @method convertFeatureToTestSuite
 * @param  {Object}    featureJson  featureJson output from Cucumber.JS
 * @param  {Object}    options      if `strict` is true, pending or undefined steps will be reported as failures.
 * 
 * @return {Object}                 A XML element <testsuite>
 */
function convertFeatureToTestSuite(featureJson, options) {

    var testSuiteOutput = [{
        _attr: {
            name: (featureJson.keyword? featureJson.keyword + ': ':'')  + featureJson.name,
            tests: 0,
            failures: 0,
            skipped: 0
        }
    }, {
        properties: []
    }];

    if (featureJson.uri) {
        testSuiteOutput[1].properties.push(createProperty('URI', featureJson.uri));
    }

    var elements = featureJson.elements || [];
    elements
        .filter(function(scenarioJson) {
            return (scenarioJson.type !== 'background');
        })
        .map(function (scenarioJson) {
            var tc = convertScenarioToTestCase(scenarioJson,featureJson, options);
            if (tc) {
                if (tc.testcase[1] && tc.testcase[1].failure) {
                    testSuiteOutput[0]._attr.failures += 1;
                }
                testSuiteOutput.push(tc);
                testSuiteOutput[0]._attr.tests += 1;
            }
        });
    return {testsuite: testSuiteOutput};
}

/**
 * options:
 *  - indent - passed to the XML formatter, defaults to 4 spaces
 *  - stream - passed to the XML formatter
 *  - declaration - passed to the XML formatter
 *  - strict - if true, pending or undefined steps will be reported as failures
 *
 * @method jsonToXml
 * @param  {object=} options         eg: {indent: boolean, strict: boolean, stream: boolean, declaration: {encoding: 'UTF-8'}}
 * @param  {string=} cucumberRaw     raw Json String
 *
 * @return {string}                  the JUnit XML report
 */
function jsonToXml (cucumberRaw, options) {
    var cucumberJson,
        output = [];
    options = options || {};
    if (options.indent === undefined) {
        options.indent = '    ';
    }
    if (!options.declaration) {
        options.declaration = { encoding: 'UTF-8' };
    }

    if (cucumberRaw && cucumberRaw.toString().trim() !== '') {
        cucumberJson = JSON.parse(cucumberRaw);
        cucumberJson.forEach(function (featureJson) {
            output = output.concat(convertFeatureToTestSuite(featureJson, options));
        });

        // If no items, provide something
        if (output.length === 0) {
            output.push( { testsuite: [] } );
        }
    }

    // wrap all <testsuite> elements in <testsuites> element
    return xml({ testsuites: output }, options)
};

/**
 * Reads a file and return the content as string
 * 
 * @method loadFile
 * @param  {string} cucumberJSONfile  the absolute reference to Cucumber JSON report file
 *
 * @return {string}                   the JUnit XML report
 */
function loadFile (cucumberJSONfile) {
    return fs.readFileSync(cucumberJSONfile).toString().trim();
};

/**
 * Writes data to a file
 * 
 * @method saveFile
 * @param  {string} jUnitFile       the absolute reference to target file
 * @param  {string} data            the data to write
 */
function saveFile (jUnitFile, data) {
    fs.writeFileSync(jUnitFile, data);
};

/**
 * options:
 *  - indent - passed to the XML formatter, defaults to 4 spaces
 *  - stream - passed to the XML formatter
 *  - declaration - passed to the XML formatter
 *  - strict - if true, pending or undefined steps will be reported as failures
 *  - cucumberJSONfile - input file cucumber.json
 *  - jUnitFile - output file junit.xml
 *
 * @method cucumberToJunitVSTS
 * @param  {object=} options         eg: {indent: boolean, strict: boolean, stream: boolean, declaration: {encoding: 'UTF-8'}, cucumberJSONfile, jUnitFile}
 */
function cucumberToJunitVSTS (options) {
    if (options.jUnitFile === undefined) {
        options.jUnitFile = 'jUnit.xml';
    }
    if (options.cucumberJSONfile === undefined) {
        console.error('please specify cucumberJsonfile under options.cucumberJSONfile');
    }
    saveFile(options.jUnitFile, jsonToXml(loadFile(options.cucumberJSONfile),options));
};


module.exports = {
    generateJunitFile: cucumberToJunitVSTS,
    loadFile: loadFile,
    saveFile: saveFile,
    jsonToXml: jsonToXml
};
