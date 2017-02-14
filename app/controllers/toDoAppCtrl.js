/**
 * Created by anupm on 2/3/2017.
 */
toDoApp.controller("toDoAppCtrl", function ($scope,$http,toDoAppService) {



    $scope.toDoAppData = toDoAppService.initializeToDoApp;
    $scope.charRemaining = toDoAppService.getCharactersLength;
    $scope.$watch('toDoAppData', function (newValue, oldValue) {
        if(newValue!=oldValue){
            console.log(newValue);
        }

    }, true);

    $scope.defaultColor = toDoAppService.getInitialColor;

    $scope.taskColorCollection = toDoAppService.getColorCollection;

    $scope.addToDoTask = function(){
        toDoAppService.createToDoTask($scope.addToDo,function(){
            $scope.addToDo = "";
            $scope.$digest();
            alertify.delay(2000).success("Data Updated !! Store it in the Server !!");
        });
    };

    $scope.cancelToDoTask = function () {
        toDoAppService.hideAddTaskOption();
    };

    $scope.filterToDoS = function (criteria) {
        toDoAppService.filterTask(criteria,function (response) {
            $scope.searchQuery = response;
        })
    };
});