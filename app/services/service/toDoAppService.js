/**
 * Created by anupm on 2/6/2017.
 */
toDoApp.service("toDoAppService", function ($http) {

    this.initializeToDoApp = [];
    // this.initializeToDoApp = function (callbackFunc) {
    //     $http({
    //         method: 'GET',
    //         url: 'data.json'
    //     }).then(function successCallback(response) {
    //         callbackFunc(response.data);
    //     }, function errorCallback(response) {
    //
    //     });
    // }

    this.getCharactersLength = 140;

    this.getColorCollection = [
        {id: "1.00", color: "Ocean-Sunset", hex: "#E27A3F"},
        {id: "2.00", color: "Emerald-Green", hex: "#468966"},
        {id: "3.00", color: "Honey-Pot", hex: "#BD4932"},
        {id: "4.00", color: "Gettysburg", hex: "#374140"},
        {id: "5.00", color: "Vintage-Ralph", hex: "#C77966"},
        {id: "6.00", color: "CheeseCake", hex: "#FDEEA7"},
        {id: "7.00", color: "Beach-Sky", hex: "#046380"},
        {id: "8.00", color: "Ventana-Azul", hex: "#8FB259"},
        {id: "9.00", color: "Stone-Beach", hex: "#306E73"},
        {id: "10.00", color: "Camp-Fire", hex: "#AF7575"}
    ];

    this.getInitialColor = this.getColorCollection[0].hex;

    this.colorCode = null;

    // this.data = $http({
    //     //         method: 'GET',
    //     //         url: 'data.json'
    //     //     }).then(function successCallback(response) {
    //     //         callbackFunc(response.data);
    //     //     }, function errorCallback(response) {
    //     //
    //     //     });

    this.createToDoTask = function (toDoTitle, callbackFunction) {

        var colorCode;
        var colorCollection = this.getColorCollection;
        var appData = this.initializeToDoApp;
        //Creating a Promise to Add Task
        var addTaskPromise = new Promise(function (resolve, reject) {
            if (toDoTitle != undefined) {
                $(colorCollection).each(function () {
                    if (this.color == $("p.colorNameDisplay").html()) {
                        colorCode = this.hex;
                        return false;
                    }
                });

                if (appData.push({todo: toDoTitle, color: colorCode, active: false})) {
                    resolve();
                }
                else {
                    reject();
                }
            }
            else {

                reject();
            }

        });

        var defaultColor = this.getInitialColor;

        //Initializing Promise to Add Task
        addTaskPromise
            .then(function () {
                $("#addTask").slideToggle(800);
                $("h1:first").animate({
                    backgroundColor: defaultColor
                }, 1200);
                callbackFunction();
            })
            .catch(function (log) {
                console.log("Error " + log);
            });

    };

    this.hideAddTaskOption = function(){
        var defaultColor = this.getInitialColor;
        $("#addTask").slideToggle(800);
        $("h1:first").animate({
            backgroundColor: defaultColor
        }, 1200);
    };

    this.filterTask = function (filterCriteria,callbackFunction) {
        if (filterCriteria == "all") {
            $("#top button").each(function (index) {
                if (index == 0) {
                    if (!$(this).hasClass("active")) {
                        $(this).addClass("active");
                    }
                }
                else {
                    $(this).removeClass("active");
                }
            });
            callbackFunction("");
        }
        else if (filterCriteria == "active") {
            $("#top button").each(function (index) {
                if (index == 1) {
                    if (!$(this).hasClass("active")) {
                        $(this).addClass("active");
                    }
                }
                else {
                    $(this).removeClass("active");
                }
            });
            callbackFunction("false");
        }
        else {
            $("#top button").each(function (index) {
                if (index == 2) {
                    if (!$(this).hasClass("active")) {
                        $(this).addClass("active");
                    }
                }
                else {
                    $(this).removeClass("active");
                }
            });
            callbackFunction("true");
        }
    };


});