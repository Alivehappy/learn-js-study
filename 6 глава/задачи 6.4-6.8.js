//Создайте функцию, которая выводит в консоль числа от N до 0 с интервалом 1 секунду, используя setInterval. По достижении 0 таймер должен остановиться
function showNum(from, to) {
	let current = from;
	let timerId = setInterval(function () {
		console.log(current);

		if (current === to) {
			clearInterval(timerId);
		} else {
			current--;
		}
	}, 1000);
}
showNum(5, 0);
{
	//то это самое только через  SetTimeout
	function showNum(from, to) {
		let current = from;
		setTimeout(function go() {
			console.log(current);
			if (current > to) {
				current--;
				setTimeout(go, 1000); //нам нужно передать ссылку на функцию для вызова через таймаут.
			}
		}, 1000);
	}
	showNum(5, 0);
}

//Напишите функцию delayLog(message, time), которая выводит message в консоль через time миллисекунд, используя setTimeout.
function delayLog(message, time) {
	setTimeout(() => {
		console.log(message);
	}, time);
}
delayLog('Hello', 2000);

/*Перепишите код с var так, чтобы i в setTimeout была уникальной для каждой итерации, используя IIFE:
Все таймеры видят одно и то же i, которое после цикла становится 3


for (var i = 0; i < 3; i++) {
  // Ваш код с IIFE
}
*/
//Named Function Expression+IIFE
for (var i = 0; i < 3; i++) {
	var func = (function saveValue(copy) {
		return function () {
			console.log(copy);
		};
	})(i);
	setTimeout(func, 1000);
	//Значение i передаётся в параметр copy
}
/*Что попадает в setTimeout:

Не сама saveValue, а результат её вызова (та функция, что с console.log)

*/
//Напишите функцию delayedSequence(n, delay), которая выводит числа от 1 до n с задержкой delay между выводами, используя рекурсивный setTimeout.

{
	function delayedSequence(n, delay) {
		let current = 1;
		function go() {
			console.log(current);
			if (current < n) {
				current++;
				setTimeout(go, delay);
			}
		}
		go();
	}
	delayedSequence(5, 1000);
}

function delayedSequence(n, delay) {
	for (let i = 1; i <= n; i++) {
		setTimeout(() => {
			console.log(i);
		}, delay * i);
	}
}
delayedSequence(5, 1000);
/*let → автоматически создаёт новую переменную для каждой итерации

var → требует ручного создания области видимости через IIFE*/
//Создайте функцию dynamicDelay(fn, initialDelay), которая вызывает fn() с экспоненциально растущей задержкой (начиная с initialDelay, затем delay * 2, и т.д.), но не более maxDelay = 5000 мс.

{
	function dynamicDelay(fn, initialDelay, maxDelay = 5000) {
		let currentDelay = initialDelay;
		function go() {
			setTimeout(() => {
				fn();
				currentDelay = Max.min(currentDelay * 2, maxDelay);

				go();
			}, currentDelay);
		}
		go();
	}
}

{
	function dynamicDelay(fn, delay, maxDelay = 5000) {
		const nextDelay = Max.min(delay * 2, maxDelay);
		setTimeout(() => {
			fn();
			dynamicDelay(fn, n, maxDelay);
		}, delay);
	}
}
//Создайте функцию createCounter(step), которая возвращает функцию-счётчик. При каждом вызове счётчик увеличивает значение на step
function createCounter(step) {
	let num = 0;

	return function count() {
		num += step;
		return num;
	};
}
const counter = createCounter(3);
counter(); // 3
console.log(counter()); // 6
const counyer1 = createCounter(5);
console.log(counyer1());
/*Когда замыкания действительно нужны:
Когда нужно сохранять состояние между вызовами

Когда важно защитить данные от внешнего изменения*/

function generatePassword(length) {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	let password = '';
	for (let i = 0; i <= length; i++) {
		password += chars[Math.floor(Math.random() * chars.length)];
	}
	return password;
}
const getPassword = generatePassword(8);

for (var i = 0; i < 3; i++) {
	(function (i) {
		let go = function (copy) {
			console.log(copy);
			setTimeout(() => go(i), 1000);
		};
		go(i);
	})(i);
}

for (var i = 0; i < 3; i++) {
	(function (i) {
		setInterval(() => {
			console.log(i);
		}, 1000);
	})(i);
}
{
	for (var i = 0; i < 3; i++) {
		(function (j) {
			setTimeout(() => console.log(j), 1000);
		})(i);
	}
}

//Создайте Named Function Expression factorial, которая вычисляет факториал числа n и может вызвать себя рекурсивно.
{
	const factorial = function calc(n) {
		if (n <= 1) return 1;
		return n * calc(n - 1);
	};
	factorial(5);
}
//вызывать себя по имени calc внутри своего тела
const factorial = function calc(n) {
	let res = 1;

	for (let i = 1; i <= n; i++) {
		res *= i;
	}
	return res;
};
factorial(5); // 120

{
	function calc(n) {
		if (n === 1) {
			return 1;
		} else {
			return n * calc(n - 1);
		}
	}
	calc(5);
}
