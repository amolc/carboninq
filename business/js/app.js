'use strict';
var ApplicationModuleName = 'BusinessApp';

var SampleApplicationModule = angular.module('BusinessApp', [
    'ngTouch',
    'ngRoute',
    'ngAnimate',
    'ngMessages',
    'angular-storage',
    'ngTagsInput',
    'ngSanitize',
    'textAngular',
    'ngFileUpload',

]);

SampleApplicationModule.config(['$routeProvider', 'storeProvider', function($routeProvider, storeProvider) {

    $routeProvider.otherwise({ redirectTo: '/businesslogin' });

    $routeProvider
    .when('/businesslogin', {
        templateUrl: 'partials/businesslogin.html',
        controller: 'businessLoginController'
    })
    .when('/category', {
        templateUrl: 'partials/category.html',
        controller: 'CategoryController'
    })


    .when('/add_category', {
        templateUrl: 'partials/add_category.html',
        controller: 'CategoryController'
    })

    .when('/edit_category/:id', {
        templateUrl: 'partials/edit_category.html',
        controller: 'CategoryController'
    })

    .when('/view_category/:id', {
        templateUrl: 'partials/view_category.html',
        controller: 'CategoryController'
    })
    .when('/supplier', {
        templateUrl: 'partials/supplier.html',
        controller: 'SupplierController'
    })
    .when('/add_supplier', {
        templateUrl: 'partials/add_supplier.html',
        controller: 'SupplierController'
    })

    .when('/edit_supplier/:id', {
        templateUrl: 'partials/edit_supplier.html',
        controller: 'SupplierController'
    })

    .when('/view_supplier/:id', {
        templateUrl: 'partials/view_supplier.html',
        controller: 'SupplierController'
    })

    .when('/order-details/:id', {
        templateUrl: 'partials/invoice.html',
        controller: 'orderDetailsController'
    })

    // items

    .when('/item', {
        templateUrl: 'partials/item.html',
        controller: 'itemController'
    })

    .when('/add_item', {
        templateUrl: 'partials/add_item.html',
        controller: 'itemController'
    })

    .when('/edit_item/:id', {
        templateUrl: 'partials/edit_item.html',
        controller: 'itemController'
    })

    .when('/view_item/:id', {
        templateUrl: 'partials/view_item.html',
        controller: 'itemController'
    })

    .when('/viewitemproperties/:item_id', {
        templateUrl: 'partials/viewitemproperties.html',
        controller: 'itemController'
    })

    .when('/itemproperties', {
        templateUrl: 'partials/itemproperties.html',
        controller: 'itemController'
    })

    .when('/add_item_property', {
        templateUrl: 'partials/add_item_property.html',
        controller: 'itemController as Itemctrl'
    })

    .when('/edititemproperty/:item_id', {
        templateUrl: 'partials/edititemproperty.html',
        controller: 'itemController'
    })

    //Users
    .when('/users', {
        templateUrl: 'partials/user.html',
        controller: 'userController'
    })

    //order

    .when('/orderlist', {
        templateUrl: 'partials/orderlist.html',
        controller: 'orderController'
    })
    .when('/orderlist/:user_id', {
        templateUrl: 'partials/orderlist.html',
        controller: 'userOrderController'
    })

    .when('/orderdetails/:payment_id', {
        templateUrl: 'partials/orderdetails.html',
        controller: 'orderController'
    })

    .when('/invoice/:payment_id', {
        templateUrl: 'partials/invoice.html',
        controller: 'orderController'
    })

    .when('/orderpayment', {
        templateUrl: 'partials/orderpayment.html',
        controller: 'orderController'
    })

    //settings
    .when('/addbasicinfo', {
        templateUrl: 'partials/addbasicinfo.html',
        controller: 'settingController'
    })

    .when('/viewbasicinfo', {
        templateUrl: 'partials/viewbasicinfo.html',
        controller: 'settingController'
    })

     .when('/editbasicinfo', {
        templateUrl: 'partials/editbasicinfo.html',
        controller: 'settingController'
    })

    .when('/headersetting', {
        templateUrl: 'partials/headersetting.html',
        controller: 'settingController'
    })

    .when('/footersetting', {
        templateUrl: 'partials/footersetting.html',
        controller: 'settingController'
    })

    .when('/footericonsetting', {
        templateUrl: 'partials/footericonsetting.html',
        controller: 'settingController'
    })

    .when('/advertise', {
        templateUrl: 'partials/advertise.html',
        controller: 'advertiseController'
    })
    .when('/advertisement', {
        templateUrl: 'partials/advertise.html',
        controller: 'advertiseController'
    })

    .when('/payment', {
        templateUrl: 'partials/payment.html',
        controller: 'paymentController'
    })

    .when('/withdraw', {
        templateUrl: 'partials/withdraw.html',
        controller: 'paymentController'
    })
     .when('/add-bank', {
        templateUrl: 'partials/add_bank.html',
        controller: 'paymentController'
    })

    .when('/wallet', {
        templateUrl: 'partials/wallet.html',
        controller: 'walletController'
    })
    .when('/preview', {
        templateUrl: 'partials/preview.html',
        controller: 'previewController'
    })
    .when('/my-advertise', {
        templateUrl: 'partials/my_advertisement.html',
        controller: 'myAdvertisementController'
    })
     .when('/dashboard', {
        templateUrl: 'partials/dashboard.html',
        controller: 'settingController'
    });

}]);
