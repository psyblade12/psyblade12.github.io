app.controller('myCtrl', function($scope, $http) {
    $scope.LoadTable = function (){
        $scope.isLoading = true;
        $http.get(apiRoute+"File/ReadTextFile?fileName="+fileName).then(function(response) {
            var temp = response.data;
            $scope.names = JSON.parse(temp);
            $scope.namesToRevert = JSON.parse(temp);
            $scope.isLoading = false;
        });
    }
    
    $scope.AddNewPerson = function (){
        var aPerson = {
            name: null,
            age: null,
        };
        $scope.names.push(aPerson);
    }

    $scope.RevertChange = function (){
        $scope.names = $scope.namesToRevert.map(x=> Object.assign({}, x) );
    }

    $scope.DeleteAPerson = function (index){
        $scope.names.splice(index,1);
    }

    $scope.SaveToServer = function(){
        if(!this.tableofPeople.$dirty && ($scope.names.length == $scope.namesToRevert.length)){
            alert("You have not changed anything");
            return;
        }
        $scope.isLoading = true;
        var dataToPost = $scope.names.map(function(x){
            var aPerson = {
                name: x.name,
                age:  parseInt(x.age),
            }
            return aPerson;
        })

        $http.post(apiRoute+"File/OverwriteTextFile?fileName="+fileName, dataToPost).then(function(response) {
            $scope.LoadTable();
            $scope.isLoading = false;
        });
        
        this.tableofPeople.$dirty = false;
    }

    $scope.ToggleAddButton = function (item){
        $scope.AddButtonEnable = !$scope.AddButtonEnable;
    }

    $scope.AddButtonEnable = false;

    $scope.LoadTable();
});