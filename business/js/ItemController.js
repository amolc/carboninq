SampleApplicationModule
    .controller('itemController', function ($rootScope, $scope, $location, $http, store, $timeout, $routeParams, Upload) {


        $scope.init = function () {
            $scope.businessSession = store.get('businessSession') || {};
        };

        $scope.init();

        $scope.imageURL = imageURL;

        $scope.item = {
            'item_name': "",
            'item_description': "",
            'item_price': "",
            'item_imagename': "",
            'item_image': "",
            'item_category': "",
            'category_id': '',
            'business_id': $scope.businessSession.business_id
        };

        $scope.colorobj = [];
        $scope.itemsizeobj = [];

        $scope.business_name = $scope.businessSession.business_name;
        $scope.getTotal = function () {
            $http.get(baseURL + 'getWalletTotal/' + $scope.businessSession.business_id).success(function (res) {
                $scope.balance = res.total;
            }).error(function (error) {
                console.log("Error getting item for business", error);
            });
        };
        $scope.getTotal();
        $scope.allitembyBusinessId = function () {
            $http.get(baseURL + 'carboninqitemsbusinessid/' + $scope.businessSession.business_id).success(function (res) {
                $scope.items = res;
                console.log(baseURL);
                for (var i = 0; i < $scope.items.length; i++) {
                    $scope.items[i].editing = false;
                    $scope.items[i].editing1 = false;
                    $scope.items[i].isEdit = false;
                }
            }).error(function (error) {

                console.log("Error getting item for business", error);
            });
        };
        $scope.allitembyBusinessId();

        $scope.allcategorybyBusinessId = function () {
            $http.get(baseURL + 'categoriesbybusinessid/' + $scope.businessSession.business_id).success(function (res) {
                $scope.Category = res;
            }).error(function (error) {
                console.log("Error getting category for business", error);
            });
        };

        $scope.allcategorybyBusinessId();

        $scope.editItem1 = function (item) {
            item.editing1 = true;
            item.isEdit = true;
        }
        $scope.editItem2 = function (item) {
            item.editing2 = true;
            item.isEdit = true;
        }
        $scope.editItem3 = function (item) {
            item.editing3 = true;
            item.isEdit = true;
        }
        $scope.editItem4 = function (item) {
            item.editing4 = true;
            item.isEdit = true;
        }
        $scope.editItem4 = function (item) {
            item.editing4 = true;
            item.isEdit = true;
        }
        $scope.editItem5 = function (item) {
            item.editing5 = true;
            item.isEdit = true;
        }
        $scope.editItem = function (item) {
            item.editing1 = true;
            item.editing2 = true;
            item.editing3 = true;
            item.editing4 = true;
            item.editing5 = true;
            item.isEdit = true;
        }

        $scope.doneEditing = function (item) {
            item.editing = false;
            $http.post(baseURL + 'updateitemforsubadmin', item).success(function (res) {
                if (res.status === true) {
                    item.isEdit = false;
                    item.editing1 = false;
                    item.editing2 = false;
                    item.editing3 = false;
                    item.editing4 = false;
                    item.editing5 = false;
                } else {

                }
            }).error(function (error) {
                console.log("Error updating item", error);
            });
            //dong some background ajax calling for persistence...
        };

        $scope.del = function (id) {
            $http.get(baseURL + 'deleteitemforcarboninq/' + id).success(function (res) {
                if (res.status === true) {
                    $scope.deletemsg = 'item deleted';
                    $scope.showdeletemsgmsg = true;
                    $timeout(function () {
                        $scope.showdeletemsgmsg = false;
                    }, 3000);
                    $location.path('/item');
                    $scope.allitembyBusinessId();
                } else {
                    $scope.deleterrmsg = 'item not deleted';
                    $scope.showdeleterrmsg = true;
                    $timeout(function () {
                        $scope.showdeleterrmsg = false;
                    }, 3000);
                }
            }).error(function () {
                console.log("Please check your internet connection or data source..");
            });
        };

        $scope.confirmcatdel = function (item_id) {
            $scope.itemid = item_id;
        };

        $scope.additem = function (itemform, item) {
            if (itemform.$valid) {
                $scope.item.colorobj = $scope.colorobj;
                $scope.item.itemsizeobj = $scope.itemsizeobj;
                $http.post(baseURL + 'addcarboninqitem', $scope.item).success(function (res) {
                    console.log(res);
                    console.log('Working');
                    $scope.response = res;
                    if (res.status === false) {
                        $scope.addcaterrrmsg = res.message;
                        $scope.showaddcaterrrmsg = true;
                        $timeout(function () {
                            $scope.showaddcaterrrmsg = false;
                        }, 3000);
                    } else {
                        if ($scope.businessSession.business_id == 24) {
                            $scope.item.itemid = res.item_id;
                            $http.post(baseURL + 'additemproperty', $scope.item).success(function (res) {
                                console.log("res 88:", res);
                            }).error(function (error) {
                                console.log("error while adding item", error);
                            });
                        }
                        $scope.addcatmsg = res.message;
                        $scope.showaddcatmsg = true;
                        $timeout(function () {
                            $scope.showaddcatmsg = false;
                            $location.path("/item");
                        }, 3000);
                    }


                }).error(function (error) {
                    console.log("error while adding item", error);
                });
            }
        };



        $scope.goto = function (page) {
            $location.path(page);
        };

        $scope.edit = function (id) {
            $location.path('/edit_item/' + id);
        };


        $scope.itemdata = function (id) {
            $location.path('/view_item/' + id);
        };

        var id = $routeParams.id;
        if (id) {

            $http.get(baseURL + 'carboninqsingleitem/' + id).success(function (res) {
                $scope.findcategory = _.where($scope.Category, {
                    category_id: res.category_id
                })[0];
                $scope.itemdata = res;
            }).error(function (error) {
                console.log("error getting single item", error);
            });
        }

        $scope.edititem = function (editcatform) {
            console.log("$scope.itemdata:", $scope.itemdata);
            //            console.log("$scope.findcategory.category_id:",$scope.findcategory.category_id);
            if (editcatform.$valid) {
                $scope.itemdata.business_id = $scope.businessSession.business_id;
                //                $scope.itemdata.category_id = $scope.findcategory.category_id;
                $http.post(baseURL + 'updateitemforcarboninq', $scope.itemdata).success(function (res) {
                    if (res.status === true) {
                        $scope.updatecatmsg = 'item updated';
                        $scope.showupdatecatmsg = true;
                        $timeout(function () {
                            $scope.showupdatecatmsg = false;
                            $location.path("/item");
                            $scope.allitembyBusinessId();
                            $scope.allcategorybyBusinessId();

                        }, 3000);
                    } else {
                        $scope.updateerrcatmsg = 'item not updated';
                        $scope.showupdateerrcatmsg = true;
                        $timeout(function () {
                            $scope.showupdateerrcatmsg = false;
                        }, 3000);
                    }
                }).error(function (error) {
                    console.log("Error updating item", error);
                });
            }

        };
    
    
        $scope.editInventory = function (id) {
            $location.path('/edit_inventory/' + id);
        };

        $scope.editinventory = function (editinventoryform) {
            console.log("$scope.itemdata:", $scope.itemdata);
            //            console.log("$scope.findcategory.category_id:",$scope.findcategory.category_id);
            if (editinventoryform.$valid) {
                $scope.itemdata.business_id = $scope.businessSession.business_id;
                //                $scope.itemdata.category_id = $scope.findcategory.category_id;
                $http.post(baseURL + 'updateitemforcarboninq', $scope.itemdata).success(function (res) {
                    if (res.status === true) {
                        $scope.updatecatmsg = 'inventory updated';
                        $scope.showupdatecatmsg = true;
                        $timeout(function () {
                            $scope.showupdatecatmsg = false;
                            $location.path("/inventory");
                            $scope.allitembyBusinessId();
                            $scope.allcategorybyBusinessId();

                        }, 3000);
                    } else {
                        $scope.updateerrcatmsg = 'inventory not updated';
                        $scope.showupdateerrcatmsg = true;
                        $timeout(function () {
                            $scope.showupdateerrcatmsg = false;
                        }, 3000);
                    }
                }).error(function (error) {
                    console.log("Error updating inventory", error);
                });
            }

        };



        $scope.showhide = function (id) {
            if (document.getElementById(id).style.display == 'none') {
                document.getElementById(id).style.display = 'block';
            } else {
                document.getElementById(id).style.display = 'none';
            }
        };

        $scope.updateattachment = function () {
            var img = new Image();
            var newfile = document.getElementById("file_browse").files[0];
            var fileDisplayArea = document.getElementById('fileDisplayArea');
            var imageType = /image.*/;
            if (newfile.type.match(imageType)) {
                var oFReader = new FileReader();
                oFReader.onload = function (oFREvent) {
                    $scope.attachname = document.getElementById("file_browse").files[0].name;
                    $scope.attachmentfile = oFReader.result;
                    $scope.item.item_imagename = $scope.attachname;
                    $scope.item.item_image = $scope.attachmentfile;
                    $scope.$apply();
                    img.src = $scope.attachmentfile;
                };
                oFReader.readAsDataURL(newfile);
            } else {}
        };

        $scope.updateattachment1 = function () {
            var img = new Image();
            var newfile = document.getElementById("file_browse1").files[0];
            var fileDisplayArea = document.getElementById('fileDisplayArea');
            var imageType = /image.*/;
            if (newfile.type.match(imageType)) {
                var oFReader = new FileReader();
                oFReader.onload = function (oFREvent) {
                    $scope.attachname1 = document.getElementById("file_browse1").files[0].name;
                    $scope.attachmentfile1 = oFReader.result;
                    $scope.$apply();
                    var reqObj = {
                        'item_imagename': $scope.attachname1,
                        'item_image': $scope.attachmentfile1,
                        'item_id': $scope.itemdata.item_id,
                        'business_id': $scope.itemdata.business_id
                    };

                    $http.post(baseURL + 'updatecarboninqitemimage', reqObj).success(function (res) {
                        $scope.itemdata.item_imagename = res.imagename;
                        $scope.itemdata.item_image = $scope.attachmentfile1;
                    }).error(function (error) {
                        console.log("Error updating item image", error);
                    });
                    img.src = $scope.attachmentfile1;
                };
                oFReader.readAsDataURL(newfile);
            } else {}
        };

        $scope.clearImage = function () {
            $scope.item.item_imagename = '';
            $scope.item.item_image = '';
        };


        $scope.clearEditImage = function () {
            $scope.itemdata.item_imagename = '';
            $scope.itemdata.item_image = '';
            $http.post(baseURL + 'removeitemimage', $scope.itemdata).success(function (res) {}).error(function (error) {
                console.log("Error removing item image", error);
            });
        };


        $scope.viewitemproperties = function (item) {
            $location.path('/viewitemproperties/' + item.item_id);
        }


        $scope.itemsdetails = {};

        $scope.gotoitemproperties = function () {
            $location.path('/itemproperties');
        }

        //get single items and items properties
        $scope.GerSingleItemProperties = function () {
            $http.get(baseURL + 'getCarboninqItems/' + $routeParams.item_id).success(function (res) {
                $scope.itemdetails = res[0];
                $http.get(baseURL + 'getItemPropByItemid/' + $routeParams.item_id).success(function (res) {
                    $scope.ItemPropertiesArray = res;
                    if ($scope.ItemPropertiesArray) {
                        $scope.colorarray = _.where($scope.ItemPropertiesArray, {
                            item_property: "color"
                        });
                        $scope.sizearray = _.where($scope.ItemPropertiesArray, {
                            item_property: "size"
                        });
                        $scope.colorImgarray = _.where($scope.ItemPropertiesArray, {
                            item_property: "colorimage"
                        });
                    }

                }).error(function (error) {
                    console.log("Error in getItemPropByItemid api");
                });
            }).error(function (error) {
                console.log("Error");
            });

        }

        if ($routeParams.item_id) {
            $scope.GerSingleItemProperties();
        }

        //get item properties list
        $scope.getitemproperties = function () {
            var business_id = $scope.businessSession.business_id;
            $http.get(baseURL + 'getitemproperties/' + business_id).success(function (res) {
                $scope.itemproperty = res;
                $scope.uniqueitemname = _.uniq(res, function (x) {
                    return x.item_id;
                });
            }).error(function (error) {
                console.log("Error removing item image", error);
            });
        };
        if ($scope.businessSession.business_id) {
            $scope.getitemproperties();
        }

        //add color for item
        var Itemctrl = this;
        Itemctrl.color = [];
        $scope.Imagefiles = {};

        $scope.additemProperties = function (additemPropertiesForm, item) {

            if (Itemctrl.color.length > 0) {
                var itempropdata = {
                    "item_id": item.item_id,
                    "business_id": $scope.businessSession.business_id,
                    "colorarray": Itemctrl.color,
                    "sizearray": Itemctrl.size
                }

                $http.post(baseURL + 'additempropertyByItemid', itempropdata).success(function (res) {
                    if (res.status == 1) {
                        $location.path('itemproperties');
                    } else {
                        console.log("Item properties not added");
                    }

                }).error(function (error) {
                    console.log("Error removing item image", error);
                });
            } else {

                if ($scope.file.length > 0) {

                    var files = [];
                    async.each($scope.file, function (image, nextimage) {
                        convertImgToBase64(image, function (response) {
                            var file = {
                                'file': response,
                                'type': 'image',
                                'item_property': 'colorimage',
                                'item_id': item.item_id,
                                'business_id': $scope.businessSession.business_id
                            };
                            files.push(file);

                            nextimage();
                        });
                    }, function done(error) {
                        $scope.Imagefiles.images = files;

                        $http.post(baseURL + 'additempropertyByItemid', $scope.Imagefiles).success(function (res1) {
                            console.log(res1)
                            if (res1.status == true) {
                                $location.path('itemproperties');
                            } else {
                                console.log("Item properties not added");
                            }

                        }).error(function (error) {
                            console.log("Error removing item image", error);
                        });

                    });

                    //  convert image to  base64
                    function convertImgToBase64(blob, callback) {
                        var reader = new window.FileReader();
                        reader.readAsDataURL(blob);
                        reader.onloadend = function () {
                            callback(reader.result);
                        };
                    }
                } else {
                    console.log("some select image colour or item code");
                }
            }

        }

        Itemctrl.addcolor = function () {
            if (Itemctrl.colorText != undefined && Itemctrl.colorText.length > 0) {
                Itemctrl.color.push({
                    color: Itemctrl.colorText,
                    done: false
                });
                Itemctrl.colorText = '';
            }
        };

        Itemctrl.remaining = function () {
            var count = 0;
            angular.forEach(Itemctrl.color, function (colorname) {
                count += colorname.done ? 0 : 1;
            });
            return count;
        };

        Itemctrl.archive = function () {
            var oldTodos = Itemctrl.color;
            Itemctrl.color = [];
            angular.forEach(oldTodos, function (colorname) {
                if (!colorname.done) Itemctrl.color.push(colorname);
            });
        };

        //add size for item
        Itemctrl.size = [];

        Itemctrl.addsize = function () {
            if (Itemctrl.sizeText != undefined && Itemctrl.sizeText.length > 0) {
                Itemctrl.size.push({
                    size: Itemctrl.sizeText,
                    done: false
                });
                Itemctrl.sizeText = '';
                console.log("Itemctrl.size:", Itemctrl.size);
            }
        };

        Itemctrl.sizecount = function () {
            var count1 = 0;
            angular.forEach(Itemctrl.size, function (sizem) {
                count1 += sizem.done ? 0 : 1;
            });
            return count1;
        };

        Itemctrl.archive1 = function () {
            var oldTodos1 = Itemctrl.size;
            Itemctrl.size = [];
            angular.forEach(oldTodos1, function (sizem) {
                if (!sizem.done) Itemctrl.size.push(sizem);
            });
        };

        //delete item properties
        $scope.DeleteItemPro = function () {
            $http.get(baseURL + 'deleteItemProperties/' + $scope.itemId).success(function (res) {
                if (res.status == 1) {
                    $scope.getitemproperties();
                } else {
                    console.log("Item properties not deleted");
                }
            }).error(function (error) {
                console.log("Error in deleteitem properties");
            })
        }

        $scope.ConfirmDelItemPro = function (id) {
            $scope.itemId = id;
        }

        $scope.gotoeditproperties = function (item_id) {
            $location.path('edititemproperty/' + item_id);
        }

        //delete single item properties
        $scope.deletesinglepro = function (propobj) {
            $http.get(baseURL + 'delSingleItemProperties/' + propobj.item_pro_id).success(function (res) {
                if (res.status == 1) {
                    $scope.GerSingleItemProperties();
                } else {
                    console.log("Item property not deleted");
                }
            }).error(function (error) {
                console.log("Error in deleteitem properties");
            })
        }

        //function for single item color
        $scope.AddItemcolor = function (AddItemcolorForm, colorinfo) {
            if (AddItemcolorForm.$valid) {
                var colordata = {
                    "business_id": $scope.businessSession.business_id,
                    "item_id": $routeParams.item_id,
                    "item_property": 'color',
                    "value": colorinfo.color
                }
                $http.post(baseURL + 'AddItemcolor', colordata).success(function (res) {
                    if (res.status == 1) {
                        $scope.Colorinfo = {};
                        $scope.AddItemcolorForm.$setPristine();
                        $scope.GerSingleItemProperties();
                    } else {
                        console.log("color not added");
                    }
                }).error(function (error) {
                    console.log("Error in Item color");
                });
            }

        }


        //function for single item size
        $scope.AddItemsize = function (AddItemsizeForm, sizeinfo) {
            if (AddItemsizeForm.$valid) {
                var sizeobj = {
                    "business_id": $scope.businessSession.business_id,
                    "item_id": $routeParams.item_id,
                    "item_property": 'size',
                    "value": sizeinfo.size
                }
                $http.post(baseURL + 'AddItemsize', sizeobj).success(function (res) {
                    if (res.status == 1) {
                        $scope.Sizeinfo = {};
                        $scope.AddItemsizeForm.$setPristine();
                        $scope.GerSingleItemProperties();
                    } else {
                        console.log("item size not added");
                    }
                }).error(function (error) {
                    console.log("Error in Item AddItemsize function");
                });
            }

        };

        $scope.deleteItemSingleColour = function (img) {
            console.log("img:", img);
            $http.post(baseURL + 'deleteitemcolorImage/', img).success(function (res) {
                if (res.status == true) {
                    $scope.GerSingleItemProperties();
                } else {
                    console.log("color image not deleted");
                }
            }).error(function () {
                console.log("Please check your internet connection or data source..");
            });
        };

        $scope.udpateIMGfile = {};
        $scope.UpdatedImagefiles = {};

        //function for upload new color images for item
        $scope.updatecolorImg = function () {

            console.log("udpateIMGfile:", $scope.udpateIMGfile);
            if ($scope.udpateIMGfile.length > 0) {
                var files = [];
                async.each($scope.udpateIMGfile, function (image, nextimage) {
                    convertImgToBase64(image, function (response) {
                        var file = {
                            'file': response,
                            'type': 'image',
                            'item_property': 'colorimage',
                            'item_id': $routeParams.item_id,
                            'business_id': $scope.businessSession.business_id
                        };
                        files.push(file);

                        nextimage();
                    });
                }, function done(error) {
                    $scope.UpdatedImagefiles.images = files;
                    $http.post(baseURL + 'uptitempropIMGByItemid', $scope.UpdatedImagefiles).success(function (res1) {
                        console.log(res1)
                        if (res1.status == true) {
                            $scope.GerSingleItemProperties();
                            $scope.udpateIMGfile = {};
                        } else {
                            console.log("Item properties not added");
                        }

                    }).error(function (error) {
                        console.log("Error removing item image", error);
                    });

                });

                //  convert image to  base64
                function convertImgToBase64(blob, callback) {
                    var reader = new window.FileReader();
                    reader.readAsDataURL(blob);
                    reader.onloadend = function () {
                        callback(reader.result);
                    };
                }
            }
        };

    });
