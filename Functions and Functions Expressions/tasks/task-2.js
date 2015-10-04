/* Task description */
/*
	Write a function that finds all the prime numbers in a range
		1) it should return the prime numbers in an array
		2) it must throw an Error if any on the range params is not convertible to `Number`
		3) it must throw an Error if any of the range params is missing
*/

function findPrimes(start, end) {
	var i, num,
		len,
		isPrime,
		primeNum = [];
	start = +start;
	end = +end;

	if(isNaN(start) || isNaN(end)) {
		throw new Error();
	}
	if(arguments.length !== 2) {
		throw new Error();
	}

	for(num = start; num <= end; num += 1) {
		if(num < 2) {
			continue;
		} else {
			len = Math.sqrt(num);
			isPrime = true;

			for (i = 2; i <= len; i += 1) {
				if (num % i === 0) {
					isPrime = false;
					break;
				}
			}
		}

		if(isPrime) {
			primeNum.push(num);
		}
	}

	return primeNum;
}
