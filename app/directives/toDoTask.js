/**
 * Created by anupm on 2/4/2017.
 */
toDoApp.directive("toDoTask",function () {
    return {
        templateUrl:"views/to-do-task.html"
        ,
        compile: function(tElement,tAttributes){

            return {
                pre:function (scope,iElement,iAttributes) {

                },
                post:function (scope,iElement,iAttributes) {
                    //Setting Click Event Handler On Instance Element To Show Option Menu On Each To Do
                    iElement.find("h4").on("click",scope.showTaskOptions);
                    //Setting Background Color of Box to the  selected Color
                    iElement.find("div").eq(3).css("background-color",scope.toDos.color);
                    //Setting Click Event Handler On CheckBox
                    iElement.find("input").on("click",scope.toDoTaskChecked);
                    //checking if to do is already completed or not
                    if(scope.toDos.active){
                        iElement.find("input").attr("checked",true);
                    }
                }
            };

        },
        controller: function ($scope,$element,$attrs,toDoAppService) {
            var appData = $scope.toDoAppData;
            var taskColorCollection = toDoAppService.getColorCollection;
            var scopeData = $scope.toDos;

            $scope.showTaskOptions = function () {
                var divRow = $(this).closest("div.row");
                if(divRow.find($(".optionTask")).length == 0){
                    var optionTask = $("<div/>")
                        .addClass("optionTask text-center");
                    var editImage = $("<img/>")
                        .attr("src","assets/res/-profile-edit-account-edit-profile-edit-user-sign-icon--icon-32.png")
                        .click(function () {
                            editImageClick($(this));
                        });
                    var removeImage = $("<img/>")
                        .attr("src","assets/res/blue-delete-button-png-29.png")
                        .click(function () {
                            deleteImageClick($(this));
                        });
                    optionTask.append(editImage);
                    optionTask.append(removeImage);
                    divRow.append(optionTask);
                }
                divRow.find($(".optionTask")).slideToggle(800);
            };

            function editImageClick(thisImage){
                thisImage.closest("div.row").find($(".optionTask")).slideUp("fast");
                var indexOfArray;
                $(appData).each(function(index,element){
                    if($(element)[0].todo.toLowerCase() == scopeData.todo.toLowerCase()){
                        indexOfArray = index;
                        return false;
                    }
                });
                var hiddenSpan = $("<span/>")
                    .css("display","none")
                    .text(indexOfArray)
                    .attr("id","IndexOfArray");
                if($("body").find($("#IndexOfArray")).length == 0){
                    $("body").append(hiddenSpan);
                }
                else{
                    $("#IndexOfArray").text(indexOfArray);
                }

                if($("body").find($("#editTask")).length == 0) {

                    var editTask = $("<div/>")
                        .attr("id", "editTask");
                    var firstDiv = $("<div/>")
                        .addClass("row");
                    var firstDivCol = $("<div/>")
                        .addClass("col-sm-12");
                    var textarea = $("<textarea/>")
                        .addClass("form-control")
                        .attr("rows", "5")
                        .text($scope.toDoAppData[indexOfArray].todo);
                    var span = $("<span/>")
                        .attr("ng-bind", "editCharRem");
                    firstDivCol.append(textarea);
                    firstDivCol.append(span);
                    firstDiv.append(firstDivCol);
                    editTask.append(firstDiv);

                    //
                    var secondDiv = $("<div/>")
                        .addClass("row display");
                    var secondDivCol = $("<div/>")
                        .addClass("col-sm-12");
                    var secondDivId = $("<div/>")
                        .attr("id", "editColorSelector");
                    var secondDivP = $("<p/>")
                        .addClass("text-center")
                        .text("Task Color");

                    secondDivId.append(secondDivP);
                    secondDivCol.append(secondDivId);
                    secondDiv.append(secondDivCol);
                    editTask.append(secondDiv);

                    var thirdDiv = $("<div/>")
                        .addClass("row display");
                    var thirdDivCol = $("<div/>")
                        .addClass("col-sm-12");
                    var thirdDivId = $("<div/>")
                        .attr("id", "editSlider-range")
                        .addClass("display");
                    thirdDivCol.append(thirdDivId);
                    thirdDiv.append(thirdDivCol);
                    editTask.append(thirdDiv);

                    var fourthDiv = $("<div/>")
                        .addClass("row display addTaskButton");
                    var fourthDivCol = $("<div/>")
                        .addClass("col-sm-12 text-center");
                    var button1 = $("<button/>")
                        .attr("type", "button")
                        .addClass("btn btn-warning")
                        .click(function () {
                            editClicked(thisImage);
                        })
                        .text("Edit");
                    var button2 = $("<button/>")
                        .attr("type", "button")
                        .addClass("btn btn-warning")
                        .click(function () {
                            deleteClicked($(this));
                        })
                        .text("Cancel");

                    fourthDivCol.append(button1);
                    fourthDivCol.append(button2);
                    fourthDiv.append(fourthDivCol);
                    editTask.append(fourthDiv);
                    $(editTask).insertBefore("#addTask");

                    var editRangeSlider = document.getElementById('editSlider-range');

                    noUiSlider.create(editRangeSlider, {
                        start: [ 1 ],
                        step: 1,
                        range: {
                            'min': [  1 ],
                            'max': [ 10 ]
                        }
                    });

                    var indexOfColor;

                    $(taskColorCollection).each(function (index,element) {
                        if($(element)[0].hex == appData[indexOfArray].color){
                            indexOfColor = index;
                            return false;
                        }
                    });

                    editRangeSlider.noUiSlider.set(indexOfColor + 1);
                    var rangeSliderValueElement = document.getElementById('slider-range-value');
                    $(".noUi-handle").append($("<p/>")
                        .attr("id","editColorNameDis")
                        .addClass("colorNameDisplay")
                        .html("hi"));
                    editRangeSlider.noUiSlider.on('update', function( values, handle ) {

                        $(taskColorCollection).each(function () {
                            if($(this)[0].id == values[handle]){
                                $("p#editColorNameDis").html($(this)[0].color);
                                $("h1:first").css("background-color",$(this)[0].hex);
                                $("p#editColorNameDis").css("color",$(this)[0].hex);
                            }
                        });

                    });
                }
                else{

                }


                var col = appData[indexOfArray].color.toString();

                $("#editTask").slideDown(800);
                $( "h1:first").animate({
                    backgroundColor: "#BD4932"
                }, 1200 );

                $(this).closest("div.row").find($(".optionTask")).slideUp("fast");

            }
            function deleteClicked(thisImage) {
                $("#editTask").remove();
                console.log(thisImage);
                $("#editTask").slideToggle(800);
                $( "h1:first").animate({
                    backgroundColor: "#E27A3F"
                }, 1200 );
            }
            function editClicked(thisImage) {
                var index = $("#IndexOfArray").html();
                var editToDoTask;
                var editToDoColor;
                var editToDOActive;
                var editTaskPromise = new Promise(function (resolve, reject) {
                    $(taskColorCollection).each(function () {
                        if ($(this)[0].color == $("p#editColorNameDis").html()) {
                            editToDoColor = $(this)[0].hex;

                        }
                    });
                    //$scope.colorCode = $("p.colorNameDisplay").html();
                    if (appData.push({todo: $scope.addToDo, color: $scope.colorCode, active: false})) {
                        resolve();
                    }
                    else {
                        reject();
                    }
                });
                $(taskColorCollection).each(function () {
                    if ($(this)[0].color == $("p#editColorNameDis").html()) {
                        editToDoColor = $(this)[0].hex;

                    }
                });
                editTaskPromise
                    .then(function () {

                        appData[index].todo = $("#editTask textarea").val();
                        appData[index].color = editToDoColor;
                        thisImage.closest("div.row").find($("h4.lead")).html(appData[index].todo);
                        thisImage.closest("div.row").find($("div.taskCol")).css("background-color",editToDoColor);

                        $scope.$digest();

                        $("#editTask").slideToggle(800);
                        $( "h1:first").animate({
                            backgroundColor: "#E27A3F"
                        }, 1200,function () {
                            $("#editTask").remove();
                        } );
                    })
                    .catch(function (log) {
                        console.log("Error " + log);
                    });




            }
            function deleteImageClick(thisImage) {
                thisImage.closest("div.row").fadeOut(1000,function () {
                    $(this).remove();
                    var y = thisImage.closest("div.row").find("h4.lead").html();
                    var indexOfArray;
                    $(appData).each(function (index,element) {
                        if($(this)[0].todo.toLowerCase() == y.toLowerCase()){
                            indexOfArray = index;
                            return false;
                        }
                    })
                    appData.splice(indexOfArray,1);
                    $scope.$digest();
                });


            }
            $scope.$watch('toDoAppData',function (newValue,oldValue) {
                if(newValue != oldValue){
                    console.log(appData);

                  /*  $.ajax
                    ({
                        type: "GET",
                        dataType : 'json',
                        async: false,
                        url: 'http://anupmacwan.info/ToDo/upload.php',
                        data: { data: JSON.stringify(appData) },
                        success: function () {alert("Thanks!"); },
                        failure: function() {alert("Error!");}
                    });
                    */
                    alertify.delay(2000).success("Data Updated !! Store it in the Server !!");
                }

            },true);
            $scope.toDoTaskChecked = function () {
                if($(this).is(":checked")){

                    var taskToDoDetail = $(this).closest("div.row").find("h4.lead").html();
                    var indexOfArray;
                    $(appData).each(function (index,element) {
                        //console.log($(this)[0].todo);
                        if($(this)[0].todo.toLowerCase() == taskToDoDetail.toLowerCase()){
                            indexOfArray = index;
                            appData[indexOfArray].active = true;
                            $(this)[0].active = true;
                            $scope.$digest();
                            return false;
                        }
                    });
                }
                else{
                    var taskToDoDetail = $(this).closest("div.row").find("h4.lead").html();
                    var indexOfArray;
                    $(appData).each(function (index,element) {
                        //console.log($(this)[0].todo);
                        if($(this)[0].todo.toLowerCase() == taskToDoDetail.toLowerCase()){
                            indexOfArray = index;
                            appData[indexOfArray].active = false;
                            $scope.$digest();
                            return false;
                        }
                    });

                }
            }


        }

    }
});