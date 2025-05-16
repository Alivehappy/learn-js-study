{
	const factorial = function calculate(n) {
		return n <= 1 ? 1 : n * calculaten(n - 1); // Рекурсия по имени
	};
	console.log(factorial(5)); // 120

	/*	(function () {
		console.log('IIFE выполняется сразу'');
	})();*/

	(function (a, b) {
		console.log(a + b);
	})(1, 2);

	//(() =>console.log('IIFE выполняетссразу'') )()

	const counter = (function makeCounter() {
		let count = 0;
		return function () {
			return ++count;
		};
	})();
	console.log(counter()); // 1
	console.log(counter()); // 2
}
