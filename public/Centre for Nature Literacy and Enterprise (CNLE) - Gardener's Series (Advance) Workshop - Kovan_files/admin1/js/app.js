'use strict';
var app = angular.module('crm', ['angular-storage']);

if (document.location.hostname == "www.desibites.com")
{
  var baseurl = "https://www.desibites.com/api/";
  app.config(['storeProvider', function (storeProvider) {
    storeProvider.setStore('sessionStorage');
  }]);

}
else if (document.location.hostname == "desibites.com")
{
  var baseurl = "https://www.desibites.com/api/";
  app.config(['storeProvider', function (storeProvider) {
    storeProvider.setStore('sessionStorage');
  }]);

}
else if (document.location.hostname == "desibites.sg" || document.location.hostname == "www.desibites.sg")
{
  var baseurl = "https://www.desibites.sg/api/";
  app.config(['storeProvider', function (storeProvider) {
    storeProvider.setStore('sessionStorage');
  }]);

}
else if (document.location.hostname == "desibites.80startups.com")
{

  var baseurl = "https://desibites.80startups.com/api/";

  app.config(['storeProvider', function (storeProvider) {
  storeProvider.setStore('sessionStorage');
  }]);

}
else
{

  var baseurl = "http://localhost:5500/api/";
  //var baseurl = "http://crm.fountaintechies.com/api/";

  app.config(['storeProvider', function (storeProvider) {
    storeProvider.setStore('sessionStorage');
  }]);
}

