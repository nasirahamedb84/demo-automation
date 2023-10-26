# cucumber-junit-vsts

Converts CucumberJS JSON output into JUnitXML for VSTS.

## Install

cucumber-junit should be added to your test codebase as a dev dependency.  You can do this with:

``` shell
$ npm install --save-dev cucumber-junit-vsts
```

Alternatively you can manually add it to your package.json file:

``` json
{
  "devDependencies" : {
    "cucumber-junit-vsts": "latest"
  }
}
```

then install with:

``` shell
$ npm install --dev
```

## Run

cucumber-junit-vsts should be appended to your existing Cucumber.JS commands


The following options are supported by `lib/cucumber_junit`:

* strict - if true, pending or undefined steps will be reported as failures
* indent - passed to the [XML formatter][XML], defaults to 4 spaces
* stream - passed to the [XML formatter][XML] to return the result as a stream
* declaration - passed to the [XML formatter][XML]


## License

[MIT](http://opensource.org/licenses/MIT)
[XML]: https://www.npmjs.com/package/xml#options
