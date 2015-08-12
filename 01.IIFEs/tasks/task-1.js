/* Task Description */
/* 
    Write a function that sums an array of numbers:
        numbers must be always of type Number
        returns `null` if the array is empty
        throws Error if the parameter is not passed (undefined)
        throws if any of the elements is not convertible to Number  

*/

function sum() {
    return function(arrOfNumbers) {
        var sumOfNumbers,
            i,
            len;

        if (arrOfNumbers.length === 0) {
            return null;
        }

        if (arrOfNumbers === 'undefined') {
            throw new Error();
        }

        sumOfNumbers = 0;

        for (i = 0, len = arrOfNumbers.length; i < len; i += 1) {

            if (isNaN(arrOfNumbers[i])) {
                throw new Error('Pass numbers');
            }

            sumOfNumbers += parseInt(arrOfNumbers[i]);
        }

        return sumOfNumbers;
    };
}

module.exports = sum;
