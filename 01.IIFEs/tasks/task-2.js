/* Task description */
/*
    Write a function a function that finds all the prime numbers in a range
        1) it should return the prime numbers in an array
        2) it must throw an Error if any on the range params is not convertible to `string`
        3) it must throw an Error if any of the range params is missing
*/

function solve() {
    return function(firstNumber, secondNumber) {
        var i,
            primeNumbers;

        if (firstNumber === 'undefined' || secondNumber === 'undefined') {
            throw new Error("Pass two arguments!");
        }

        if (isNaN(firstNumber) || isNaN(secondNumber)) {
            throw new Error("Pass two numbers!");
        }

        firstNumber = parseInt(firstNumber);
        secondNumber = parseInt(secondNumber);
        primeNumbers = [];

        function isPrime(number, i) {
            if (number % i === 0 && number !== 2 && number !== i) {
                return false;
            } else {
                if (i < Math.sqrt(number)) {
                    return (isPrime(number, i + 1));
                } else
                    return true;
            }
        }


        for (i = firstNumber; i <= secondNumber; i += 1) {
            if (i === 0 || i === 1) {
                continue;
            }

            if (isPrime(i, 2)) {
                primeNumbers.push(i);
            }
        }

        return primeNumbers;
    };
}

module.exports = solve;
