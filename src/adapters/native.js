// Native adapter based on snippet by https://github.com/psbrandt and https://github.com/FHIR/fhir.js/blob/master/src/adapters/native.js

(function() {
    var smart = require('../client/entry');

    // Fetch Helper JSON Parsing
    function parseJSON(response) {

      // response.json() throws on empty body
      return response.text()
      .then(function(text) {
        return text.length > 0 ? JSON.parse(text) : "";
      });

    }

    // Fetch Helper for Status Codes
    function checkStatus(httpResponse) {
      return new Promise(function (resolve, reject) {
        if (httpResponse.status < 200 || httpResponse.status > 399) {
          reject(httpResponse);
        }
        resolve(httpResponse);
      });
    }

    // Build a backwards compatiable defer object
    var defer = function(){
      var def = {};
      def.promise = new Promise(function (resolve, reject) {
        def.resolve = resolve;
        def.reject = reject;
      });
      return def;
    };

    // Build Adapter Object
    var adapter = {
        defer: defer,
        http: function(args) {
          var url = args.url;
          var debug = args.debug;

          var fetchOptions = args;

          if (!['GET', 'HEAD'].includes(fetchOptions.method) && fetchOptions.data) {
            fetchOptions.body = fetchOptions.data;
          }

          debug && console.log("DEBUG[native](fetchOptions)", fetchOptions);

          return new Promise(function(resolve, reject) {
            var returnableObject = {};

            fetch(url, fetchOptions).then(checkStatus)
            .then(function(response) {
              debug && console.log("DEBUG[native](response)", response);

              var datatype = args.datatype || 'json';

              if(datatype == 'json') {
                return parseJSON(response);
              } else {
                return response;
              }
            })
            .then(function(response){
              resolve(response);
            })
            .catch(function(error) {
              reject({error: error});
            })
          })

        },
        fhirjs: fhir
    };

    smart(adapter);

}).call(this);
