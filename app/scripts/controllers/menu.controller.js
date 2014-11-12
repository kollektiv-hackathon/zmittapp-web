
zmittapp.controller('menuController', function($scope, data, $modal, $q){

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
        $scope.updateDishes();
    };

    /**
     * Loads the dishes from the given start date into the scope.
     */
    $scope.updateDishes = function(){

        data.menuItem.get().then(function(data){
            var startDate = $scope.currentStartDate,
                endDate = startDate.getLastDateOfWeek();
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

    $scope.data = data;

    /**
     * Opens a dialog for editing/creating a dish.
     * @param model
     */
    function openDishDialog(model){
        var d = $q.defer(),
            newScope = $scope.$new(true);

        newScope.dish = angular.copy(model);
        $modal.open({templateUrl: 'views/dish.html', controller: 'dishController', scope: newScope}).result.then(function(){
            d.resolve(newScope.dish);
        }, function(){
            d.reject();
        });

        return d.promise;
    }

    /**
     * Adds a dish to the day with the given index (0 = Mon, 6 = Sun)
     * @param {number} index Index of the day.
     */
    $scope.addDish = function(index){
        var dish = {
            date: $scope.currentStartDate.changeDay(index)
        };

        openDishDialog(dish).then(function(newDish){
            $scope.dayDishes[index] = $scope.dayDishes[index] || [];
            $scope.dayDishes[index].push(newDish);
        });
    };

    $scope.editDish = function(dayIndex, dishIndex){
        openDishDialog($scope.dayDishes[dayIndex][dishIndex]).then(function(updatedDish){
            $scope.dayDishes[dayIndex][dishIndex] = updatedDish;
        });
    };


    // Initially call updateDishes.
    $scope.updateDishes();

});