let fruits = ['Яблоки', 'Груша', 'Апельсин'];
// добавляем новое значение в "копию"
let shoppingCart = fruits;
shoppingCart.push('Банан');
//поссылке копируем массив
alert(fruits.length); //4

let styles = ['Джаз', 'Блюз'];
styles.push('Рок-н-ролл');
styles[Math.floor(styles.length - 1) / 2] = 'Классика';
console.log(styles.shift());
styles.unshift('Рэп', 'Регги');
/* Math.floor Работа с индексами:
Если вы работаете с индексами массивов или строк, которые должны быть целыми числами.
При генерации случайных целых чисел в диапазоне:
*/
let arr = ['a', 'b'];
arr.push(function () {
	alert(this);
});
arr[2](); // вернет массив так как this в методе(функциональная область вилимости) в массиве(объекте)
//['a', 'b', function () { alert(this); }]
//Когда функция вызывается как метод объекта (в данном случае массив — это объект), this ссылается на этот объект.

function sumInput() {
	const numbers = []; // Массив для хранения чисел
	while (true) {
		a = prompt('a', '');
		if (a === '' || a === null || !isFinite(a)) {
			break;
			numbers.push(+a);
		}
		let sum = 0;
		for (let number of numbers) {
			sum += number;
		}
		return sum;
	}
}
// Добавляем числа в массив
//Цикл for...of перебирает каждый элемент массива numbers.

//На каждой итерации переменная number принимает значение текущего элемента массива.
//  arr1 = [1, -2, 3, 4, -9, 6];
function getMaxSubSum(arr) {
	let maxSum = 0;
	for (let i = 0; i < arr.length; i++) {
		let fixSum = 0;
		for (let j = i; j < arr.length; j++) {
			//j = i означает, что внутренний цикл начинается с того же индекса, что и внешний цикл.

			fixSum += arr[j]; //Хранит сумму текущей подпоследовательности, начинающейся с индекса i. Изначально равна 0
			maxSum = Math.max(maxSum, fixSum);
		}
	}
	return maxSum;
}
alert(getMaxSubSum([-1, 2, 3, -9])); // 5
alert(getMaxSubSum([-1, 2, 3, -9, 11])); // 11
alert(getMaxSubSum([-2, -1, 1, 2])); // 3
alert(getMaxSubSum([1, 2, 3])); // 6
alert(getMaxSubSum([100, -9, 2, -3, 5])); // 100

function getMaxSub(arr) {
	let maxSum = 0;
	let partSum = 0;
	for (let key of arr) {
		// для каждого элемента массива
		partSum += key;
		maxSum = Math.max(maxSum, partSum);
		if (partSum < 0) partSum = 0;
	}
	return maxSum;
}
/*Алгоритм Кадане основан на идее, что максимальный подмассив не может начинаться с отрицательной суммы. Если текущая сумма (partSum) становится отрицательной, это означает, что текущий подмассив "ухудшает" общую сумму, и его можно "отбросить", начав новый подмассив с следующего элемента.

*/
function camelize(str) {
	return str
		.split('-')
		.map((word, index) =>
			index == 0 ? word : word[0].toUpperCase() + word.slice(1)
		)
		.join('');
}
console.log(camelize('background-color') == 'backgroundColor');

function filterRange(arr, a, b) {
	return arr.filter(elem => a <= elem && elem <= b);
}
let arr3 = [5, 3, 8, 1];
let filtered = filterRange(arr, 1, 4);
alert(filtered); // [3, 1] (новый массив)
alert(arr); // [5, 3, 8, 1] (исходный массив без изменений)

function filterRangePlace(arr, a, b) {
	for (let i = 0; i < arr.length; i++) {
		let val = arr[i];

		if (val < a || val > b) {
			arr.splice(i, 1);
			i--;
		}
	}
}
let arr4 = [5, 3, 8, 1];
filterRangePlace(arr4, 1, 4);
//Когда вы удаляете элемент из массива с помощью splice, длина массива уменьшается на 1. Это приводит к тому, что следующий элемент сдвигается на место удалённого. Если вы не уменьшите счётчик i, то пропустите следующий элемент.
//Мутирующие методы изменяют исходный массив: push, pop, shift, unshift, splice, sort, reverse.

//Не мутирующие методы возвращают новый массив или значение, не изменяя исходный массив: concat, slice, map, filter, reduce, join, toString.

let arr5 = [5, 2, 1, -10, 8];
arr5.sort((a, b) => b - a);
alert(arr);

arr6 = ['HTML', 'JavaScript', 'CSS'];
function copySorted(arr) {
	return arr.slice().sort();
}
let sorted = copySorted(arr6);
alert(copySorted(arr6)); // // CSS, HTML, JavaScript
//Можно вызвать slice без аргументов: arr.slice() создаёт копию arr. Это часто используют, чтобы создать копию массива для дальнейших преобразований, которые не должны менять исходный массив
let vasya = { name: 'Вася', age: 25 };
let petya = { name: 'Петя', age: 30 };
let masha = { name: 'Маша', age: 28 };

let users = [vasya, petya, masha];
let names = users.map(elem => elem.name);
console.log(names);

{
	let vasya = { name: 'Вася', surname: 'Пупкин', id: 1 };
	let petya = { name: 'Петя', surname: 'Иванов', id: 2 };
	let masha = { name: 'Маша', surname: 'Петрова', id: 3 };
	let users = [vasya, petya, masha];
	let userMapped = users.map(user => ({
		fullname: `${user.name} ${user.surname}`,
		id: user.id,
	}));
}
//map создаёт новый массив, применяя функцию к каждому элементу исходного массива.
//user — это параметр функции, который представляет текущий элемент массива users.
//Обратите внимание, что для стрелочных функций мы должны использовать дополнительные скобки.()

{
	function sortByAge(arr) {
		arr.sort((a, b) => a.age - b.age);
	}
	let vasya = { name: 'Вася', age: 25 };
	let petya = { name: 'Петя', age: 30 };
	let masha = { name: 'Маша', age: 28 };
	let arr = [vasya, petya, masha];

	sortByAge(arr);
	console.log(arr[0].name);
	console.log(arr[1].name);
	console.log(arr[2].name);
}

function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
	}
	//// случайный индекс от 0 до i

	// поменять элементы местами
	// мы используем для этого синтаксис "деструктурирующее присваивание"
	// то же самое можно записать как:
	// let t = array[i]; array[i] = array[j]; array[j] = t
	[array[i], array[j]] = [array[j], array[i]];
}

{
	function getAverageAge(users) {
		return users.reduce((init, user) => init + user.age, 0) / users.length;
	}
	let vasya = { name: 'Вася', age: 25 };
	let petya = { name: 'Петя', age: 30 };
	let masha = { name: 'Маша', age: 29 };
	let arr = [vasya, petya, masha];
	console.log(getAverageAge(arr)); //28
}
//init — аккумулятор, который хранит текущую сумму возрастов.
