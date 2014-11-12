/**
 * Created by remo on 01/11/14.
 */

(function(Date) {

    /**
     * Returns the calendar week number of the current date.
     * @returns {number}
     */
    Date.prototype.getWeek = function () {
        var date = new Date(this.getTime());
        date.setHours(0, 0, 0, 0);
        // Thursday in current week decides the year.
        date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
        // January 4 is always in week 1.
        var week1 = new Date(date.getFullYear(), 0, 4);
        // Adjust to Thursday in week 1 and count number of weeks from date to week1.
        return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
            - 3 + (week1.getDay() + 6) % 7) / 7);
    };

    /**
     * Returns the four-digit year corresponding to the ISO week of the date.
     * @returns {number}
     */
    Date.prototype.getWeekYear = function () {
        var date = new Date(this.getTime());
        date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
        return date.getFullYear();
    };

    /**
     * Adds or subtracts the given number of days and returns a new Date instance.
     * @param {number} days Positive or negative number of days.
     * @returns {Date}
     */
    Date.prototype.addDays = function(days)
    {
        var dat = new Date(this.valueOf());
        dat.setDate(dat.getDate() + days);
        return dat;
    };

    /**
     * Adds or subtracts the given number of days and returns a new Date instance.
     * @param {number} number Positive or negative number of days.
     * @returns {Date}
     */
    Date.prototype.changeDay = function(number){
        var newdate = new Date(this);
        newdate.setDate(newdate.getDate() + number);
        return new Date(newdate);
    };

    /**
     * Returns a new Date instance of the first day of the current week.
     * @returns {Date}
     */
    Date.prototype.getFirstDateOfWeek = function(){
        // Monday = 0, Tuesday = 1, ... Sunday = 6
        var mo = this.changeDay(-1 * this.getNormalizedDay());
        mo.setHours(0, 0, 0, 0);
        return mo;
    };

    Date.prototype.getLastDateOfWeek = function(){
        var so = this.changeDay(6 - this.getNormalizedDay());
        so.setHours(23, 59, 59, 999);
        return so;
    };

    /**
     * Returns the normalized day number of the current date,
     * starting with 0 for monday to 6 for sunday.
     */
    Date.prototype.getNormalizedDay = function(){
        return this.getDay() > 0 ? this.getDay() - 1 : 6;
    };

})(Date);