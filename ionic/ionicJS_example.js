console.log($scope.app);

/** Toggle visibility of gauges by the shoulder motor. */
$scope.shoulderGauges = function() {
  //Hide if already shown
  if($scope.app.view.ArmInspection.wdg["shoulder-temperature-gauge"].visible){
    $scope.app.view.ArmInspection.wdg["shoulder-temperature-gauge"].visible = false;
    $scope.app.view.ArmInspection.wdg["shoulder-current-gauge"].visible = false;
    $scope.app.view.ArmInspection.wdg["shoulder-runtime-gauge"].visible = false;
    $scope.app.view.ArmInspection.wdg["shoulder-repair-button"].visible = false;
  }
  //Show if not already shown
  else {
    $scope.app.view.ArmInspection.wdg["shoulder-temperature-gauge"].visible = true;
    $scope.app.view.ArmInspection.wdg["shoulder-current-gauge"].visible = true;
    $scope.app.view.ArmInspection.wdg["shoulder-runtime-gauge"].visible = true;
    //Only show service button if shoulder "needs service
    if($scope.app.params.serviceShoulder){
      $scope.app.view.ArmInspection.wdg["shoulder-repair-button"].visible = true;
    }
  }
}

/** Toggle visibility of gauges by the elbow motor. */
$scope.elbowGauges = function() {
  //Hide if already shown
  if($scope.app.view.ArmInspection.wdg["elbow-temperature-gauge"].visible){
    $scope.app.view.ArmInspection.wdg["elbow-temperature-gauge"].visible = false;
    $scope.app.view.ArmInspection.wdg["elbow-current-gauge"].visible = false;
    $scope.app.view.ArmInspection.wdg["elbow-runtime-gauge"].visible = false;
    $scope.app.view.ArmInspection.wdg["elbow-repair-button"].visible = false;
  }
  //Show if not already shown
  else {
    $scope.app.view.ArmInspection.wdg["elbow-temperature-gauge"].visible = true;
    $scope.app.view.ArmInspection.wdg["elbow-current-gauge"].visible = true;
    $scope.app.view.ArmInspection.wdg["elbow-runtime-gauge"].visible = true;
    //Only show service button if shoulder needs service
    if($scope.app.params.serviceElbow){
      $scope.app.view.Arm_Inspection.wdg["elbow-repair-gauge"].visible = true;
    };
  }
}

/**
* Sets the current service name and sequence and stores in global variable.
* @param {string} sequence - The short name of the sequence that is selected (elbow or shoulder).
*/
$scope.setSequence = function(sequence){
  switch(sequence) {
    case "elbow":
      $scope.app.params.serviceName = "Elbow Replacement";  //Set name
      $scope.app.params.serviceSequence = "app/resources/Uploaded/industrial_robot_1/l-Creo%203D%20-%20ElbowMotorReplacement.pvi";  //Set sequence
      break;
    case "shoulder":
      $scope.app.params.serviceName = "Shoulder Replacement";  //Set name
      $scope.app.params.serviceSequence = "app/resources/Uploaded/industrial_robot_1/l-Creo%203D%20-%20ShoulderReplacement.pvi";  //Set sequence
      break;
    default:
      //If neither elbow or shoulder, clear variables
      $scope.app.params.serviceName = null;
      $scope.app.params.serviceSequence = null;
  }
}

/**
* Event handler that responds to the complete event when the GetPropertyValues service is executed.
* Checks service result for service booleans and sets problem indicator accordingly.
*/
$scope.$root.$on("GetPropertyValues-complete", function(event, args) {
  if(args.data["0"].ServiceElbow){
    $scope.app.params.serviceElbow = true;
    $scope.app.view.ArmInspection.wdg["problem-indicator-icon"].visible = true;
    $scope.app.view.ArmInspection.wdg["elbow-motor"].color = "rgba(220,42,107, 1)"
    if($scope.app.view.ArmInspection.wdg["elbow-temperature-gauge"].visible){
      $scope.app.view.ArmInspection.wdg["elbow-repair-button"].visible = true;
    }
  }
  else{
    $scope.app.params.serviceElbow = false;
    $scope.app.view.ArmInspection.wdg["elbow-motor"].color = "rgba(51,255,236, 1)"
  }
  if(args.data["0"].ServiceShoulder) {
    $scope.app.params.serviceShoulder = true;
    $scope.app.view.ArmInspection.wdg["problem-indicator-icon"].visible = true;
    $scope.app.view.ArmInspection.wdg["shoulder-motor"].color = "rgba(220,42,107, 1)"
    if($scope.app.view.ArmInspection.wdg["shoulder-temperature-gauge"].visible){
      $scope.app.view.ArmInspection.wdg["shoulder-repair-button"].visible = true;
    }
  }
  else{
    $scope.app.params.serviceShoulder = false;
    $scope.app.view.ArmInspection.wdg["shoulder-motor"].color = "rgba(51,255,236, 1)"
  }
  if(!args.data["0"].ServiceElbow && !args.data["0"].ServiceShoulder){
    $scope.app.view.ArmInspection.wdg["problem-indicator-icon"].visible = false;
  }
});