
zmittapp.controller('menuController', function($scope, api, $modal){

    $scope.days = [
        'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'
    ];

    /**
     * Saves the date of the monday of the current week
     * @type {Date}
     */
    $scope.currentStartDate = new Date().getFirstDateOfWeek();

    /**
     * Changes the current displayed week
     * @param {number} count Counts of week (+/-)
     */
    $scope.changeWeek = function(count){
        $scope.currentStartDate = $scope.currentStartDate.changeDay(count * 7);
    };

    /**
     * Loads the dishes from the given start date into the scope.
     */
    $scope.updateDishes = function(){

        api('menuItem').query().then(function(data){
            var startDate = $scope.currentStartDate,
                endDate = startDate.changeDay(6);
            $scope.dayDishes = [];

            data.forEach(function(m){
                m.date = new Date(m.date);
                if(m.date >= startDate && m.date <= endDate){
                    var dayNumber = m.date.getNormalizedDay();
                    $scope.dayDishes[dayNumber] = $scope.dayDishes[dayNumber] || [];
                    $scope.dayDishes[dayNumber].push(m);
                }
            });

        });
    };


    function openDishDialog(model){
        var newScope = $scope.$new(true);
        newScope.dish = model;
        $modal.open({templateUrl: 'views/dish.html', controller: 'dishController', scope: newScope}).result.then(function(){
            // saved
        }, function(){
            // canceled
        });
    }

    /**
     * Adds a dish to the day with the given index (0 = Mon, 6 = Sun)
     * @param {number} index Index of the day.
     */
    $scope.addDish = function(index){
        var dish = {
            date: $scope.currentStartDate.changeDay(index)
        };

        openDishDialog(dish);
    };

    $scope.editDish = function(dayIndex, dishIndex){
        openDishDialog($scope.dayDishes[dayIndex][dishIndex]);
    };


    // Initially call updateDishes.
    $scope.updateDishes();

});