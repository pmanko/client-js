SMART on FHIR JavaScript Client Library
=======================================

## Building

To build the library, you will need Grunt and NPM. Once you
have all the dependencies in place, you can build the library
with the `grunt` command.

Here are the exact steps to build the client library
on Ubuntu 14.04:

```
sudo apt-get update
sudo apt-get -y install git npm
sudo ln -s "$(which nodejs)" /usr/bin/node
git clone https://github.com/smart-on-fhir/client-js
cd client-js
npm install
sudo npm install -g grunt-cli
grunt
```

If all goes well, the client library will be available in the
`dist` directory in multiple variants as follows:

* `fhir-client.js` - complete client library with jQuery and fhir.js included (no external dependencies)
* `fhir-client-jquery.js` - client library using jQuery, jQuery and fhir.js not included
* `fhir-client-angularjs.js` - client library using AngularJS, AngularJS and fhir.js not included

## Usage

For usage examples and further documentation, please visit http://docs.smarthealthit.org/clients/javascript/

## Using Native Adapter

### Building from Source
**Under Development**

### Including Static JS File
The `fhir-client-native.js` file can be used by adding the following tags to your html document:
```
<script src="[path-to-js-assets]/nativeFhir.js"></script>
<script src="[path-to-js-assets]/fhir-client-native.js"></script>
```

These two Javascript files need to be built and made available to the app.

*Building `nativeFhir.js` based on instructions from https://github.com/FHIR/fhir.js#development*

```
git clone https://github.com/FHIR/fhir.js
cd fhir.js
npm install

# build nativeFhir.js ==> dist/ folder
npm run-script build

cp ./dist/natvieFhir.js [path-to-js-assets-folder]
```

*Building `fhir-client-native.js` based on instructions from https://github.com/smart-on-fhir/client-js#building*

```
git clone https://github.com/uwcirg/client-js
cd client-js
npm install

# Build fhir-client-native.js ==> dist/ folder
sudo npm install -g grunt-cli
grunt

cp ./dist/fhir-client-native.js [path-to-js-assets-folder]
```
