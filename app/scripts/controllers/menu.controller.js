
zmittapp.controller('menuController', function($scope, data, $modal, $q){

    /**
     * Hardcoded collection of weekdays
     * @type {string[]}
     */
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
     * Loads the dishes beginning by the current start date into the scope.
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

    /**
     * Just here for some debugging...ignore and go further
     */
    $scope.data = data;

    /**
     * Opens a dialog for editing/creating a dish.
     * @param {scope} scope The scope used behind the dialog view
     */
    function openDishDialog(scope){
        var d = $q.defer();

        $modal.open({templateUrl: 'views/dish.html', controller: 'dishController', scope: scope}).result.then(function(){
            d.resolve(scope);
        }, function(){
            d.reject();
        });

        return d.promise;
    }

    /**
     * Opens a dialog for creating a new menu item.
     * @param {number} index Index of the day (MO = 0, SO = 6)
     */
    $scope.addDish = function(index){
        var dish = {
            date: $scope.currentStartDate.changeDay(index)
        };

        openDishDialog(getDialogScope(dish)).then(function(scope){
            $scope.dayDishes[index] = $scope.dayDishes[index] || [];
            $scope.dayDishes[index].push(scope.dish);
        });
    };

    /**
     * Opens a dialog for updating an existing menu item.
     * @param {number} dayIndex The index of the day (MO = 0, SO = 6)
     * @param {number} dishIndex The index of the dish to edit
     */
    $scope.editDish = function(dayIndex, dishIndex){

        var dish = $scope.dayDishes[dayIndex][dishIndex],
            ext = {
                removeFromScope: function(){
                    $scope.dayDishes[dayIndex].splice(dishIndex, 1);
                }
            };

        openDishDialog(getDialogScope(dish, ext)).then(function(scope){
            if(scope){
                $scope.dayDishes[dayIndex][dishIndex] = scope.dish;
            }
        });
    };

    /**
     * Returns a new scope containing the data and the provided extensions.
     * @param data
     * @param extensions
     */
    function getDialogScope(data, extensions){
        var newScope = $scope.$new(true);
        newScope.dish = angular.copy(data);
        angular.extend(newScope, extensions);

        return newScope;
    }




    // Initially call updateDishes.
    $scope.updateDishes();

});