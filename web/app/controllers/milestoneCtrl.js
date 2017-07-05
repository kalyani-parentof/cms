    /*Created by parentof 6 on 15-06-2017.*/

    parentOf.controller('milestoneCtrl', function ($scope, pofRestangular,Notification) {
        function init() {
            $scope.selectedMilestone = "";

            $scope.editMode = false;

            if(!$scope.da) {
                $scope.milestone = {name: ''}
            }
            else{
                $scope.milestone = {name: ''}
            }
            pofRestangular.one("milestone").customGET().then(function (data) {
                $scope.milestones = data.data;
            });
            $scope.milestone = {name: ''};
        }

        init();
        $scope.addMilestone = function () {
            $scope.editMode = false;
            pofRestangular.one('milestone').customPOST($scope.milestone).then(function (data) {
                //console.log("hello2");
                // console.log($scope.milestone.name);
                if (data.status == "error") {
                    $scope.errorHandler(data);
                    console.log(data);
                    return;
                }
                $scope.milestones.push({name: $scope.milestone.name});


                Notification.primary("milestone added successfully");
                init();
            });
        };

        $scope.list = function(){
            pofRestangular.one('milestone').customGET().then(function(data){
                $scope.milestones = data.data;
            })
        }
        $scope.list()

        $scope.edit = function(milestone){
            $scope.milestone = milestone;
            $scope.editMode = true;
        };

        $scope.update = function(){
            pofRestangular.one('milestone').customPUT($scope.milestone).then(function(data){
                if(data.status == "error"){
                    $scope.errorHandler(data)
                    return;
                }
                Notification.primary("milestone updated successfully");

                init()
            })
        };
        init();


        $scope.deleteMilestone= function(milestone) {

            var id = milestone._id;
            console.log(id);
            pofRestangular.one('milestone').one(id).customDELETE().then(function (data) {
                if (data.status == "error") {
                    $scope.errorHandler(data);
                    console.log(data);
                    return;
                }  else  {
                    Notification.primary("milestone deleted successfully");

                }

               refreshMilestones();



            });
        };

        function refreshMilestones(){
            pofRestangular.one('milestone').customGET().then(function(data){

                $scope.milestones = data.data;
            });
        };

    });