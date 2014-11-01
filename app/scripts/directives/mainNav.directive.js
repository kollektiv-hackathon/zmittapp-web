/**
 * Created by remo on 01/11/14.
 */

zmittapp.directive('mainNav', function(){

    var currentActiveItem;

    return {
        link: function(scope, element){
            scope.$watch('currentLocation', function(newValue){
                if(newValue){
                    $(element).find('li').removeClass('active');
                    $(element).find('li a[href="' + newValue + '"]').parent().addClass('active');
                }
            });
        }
    }

});