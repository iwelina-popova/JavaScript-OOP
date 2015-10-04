/* Task Description */
/* 
	Write a function that sums an array of numbers:
		numbers must be always of type Number
		returns `null` if the array is empty
		throws Error if the parameter is not passed (undefined)
		throws if any of the elements is not convertible to Number	

*/

function sum(arr) {
	if(!arr.length) {
		return null;
	}
	if(!arguments[0]) {
		throw new Error('There must be some arguments');
	}

	var sum = 0,
		i, len,
		num;

	for(i = 0, len = arr.length; i < len; i += 1) {
		num = +arr[i];
		if(isNaN(num)) {
			throw new Error('Something different than number');
		}
		sum += num;
	}

	return sum;
}