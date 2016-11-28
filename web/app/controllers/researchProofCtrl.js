parentOf.controller('researchProofCtrl', function ($scope, pofRestangular, Notification, Upload, $timeout) {
    function init() {
        pofRestangular.one('age').customGET().then(function(data){
            $scope.ages = data.data;
        })
        $scope.rer = {}
        $scope.rp = {name: '',
            description: '',
            type: '',
            age: '',
            link: '',
            nameOfDocument: '',
            pageNo: '',
            author: '',
            isbn: '',
            excerpt: '',
            fileLink: '',
            interpretation: '',
            conclusion: ''}
    }
    init()

    $scope.uploadFiles = function(file, errFiles) {
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            file.upload = Upload.upload({
                url: 'http://localhost:3111/fileUpload/research',
                data: {file: file}
            });

            file.upload.then(function (response) {
                Notification.primary('File uploaded')
                $scope.rp.fileLink = response.data.data
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                evt.loaded / evt.total));
            });
        }
    }

    $scope.add = function(){
        pofRestangular.one('research').customPOST($scope.rp).then(function(){
            Notification.primary("Proof inserted")
            init()
        })
    }

    $scope.options = ["Developmental task", "Milestone","Trait"]
    $scope.search = function(){
        pofRestangular.one('research').one('search').customPOST($scope.rer).then(function(data){
            $scope.proofs = data.data;
        })
    }
})

