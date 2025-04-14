function createCounter() {
	let count = 0;
	return function () {
		count++;
		return count;
	};
}
const counter = createCounter();
console.log(counter());
//Переменная counter теперь содержит ту самую внутреннюю функцию- результат вызова - вложенная функция

//Переменная count продолжает существовать благодаря замыканию
function adder(n) {
	let sum = 0;
	return function (n) {
		return (sum += n);
	};
}
console.log(adder(5));
//Передавать n вложенной функции нужно только если вы хотите менять это значение при каждом вызове
//Создайте функцию cachedCalc(), которая запоминает результаты вычислений и возвращает их при повторных запросах.

function createCachedCalc() {
	const cache = new Map();
	return function (a, b) {
		const key = `${a}_${b}`;
		if (cache.has(key)) {
			return cache.get(key);
		}

		const result = a + b;
		cache.set(key, result);
		return result;
	};
}

const cachedCalc = createCachedCalc();
console.log(cachedCalc(5, 3));

//Напишите функцию createIdGenerator(), которая генерирует уникальные ID (начиная с 1) при каждом вызове.
function createIdGenerator() {
	let result = 0;
	return function () {
		result += 1;
		return result.toString().padStart(5, '0');
	};
}
const genId = createIdGenerator();
console.log(genId()); // "00001"

console.log(genId()); // 2
//Напишите функцию createValidator(rules), которая проверяет данные по правилам:
function createValidator(rule) {
	let ruleKeys = Object.keys(rule);
	return ruleKeys.map(elem => elem < ruleKeys[1] && elem > ruleKeys[0]);
}
const validate = createValidator({ min: 3, max: 10 });
console.log(validate(5)); // true
console.log(validate(11)); // false
