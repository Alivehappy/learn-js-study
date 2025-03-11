function camelize(str) {
	let str1 = str.split('-');

	let str2 = str1.map((elem, index) =>
		index == 0 ? elem : elem[0].toUpperCase() + elem.slice(1)
	);
	return str2.join('');
}
let str = 'background-color';
console.log(camelize(str));

let arr = [5, 3, 8, 1];
function filterRangeI(arr, a, b) {
	return arr.filter(elem => elem <= b && elem >= a);
}
console.log(filterRangeI(arr, 1, 4));

let arr1 = ['HTML', 'JavaScript', 'CSS'];
function copySorted(arr) {
	return arr.slice().sort();
}
let sorted = copySorted(arr1);
console.log(arr1);
console.log(sorted);

function filterRangeInPlace(arr, a, b) {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] < a || arr[i] > b) {
			arr.splice(i, 1);
			i--;
		}
	}
	return arr;
}
let arr3 = [5, 3, 8, 1];
console.log(filterRangeInPlace(arr3, 1, 4));

function Calculator() {
	this.method = {
		'-': function (a, b) {
			a - b;
		},
		'+': function (a, b) {
			a + b;
		},
	};
	this.calculate = function (str) {
		let split = str.split(' ');
		(a = +split[0]), (po = split[1]), (b = +split[2]);
		if (!this.method[op] || isNaN(a) || isNan(b)) {
			return Nan;
		}
		return this.method[op](a, b);
	};
	this.addMtthod = function (name, func) {
		this.methods[name] = func;
	};
}
let calc = new Calculator();

alert(calc.calculate('3 + 7')); // 10

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
	let usersMapped = users.map(elem => ({
		id: elem.id,
		fullname: `${elem.name}  ${elem.surname}`,
	}));
	console.log(usersMapped);
}

{
	let vasya = { name: 'Вася', age: 25 };
	let petya = { name: 'Петя', age: 30 };
	let masha = { name: 'Маша', age: 28 };
	let arr = [vasya, petya, masha];
	function sortByAge(arr) {
		return arr.sort((a, b) => a.age - b.age);
	}
	sortByAge(arr);
	console.log(arr[0].name);
}

let arr4 = [1, 2, 3];
function shuffle(arr) {
	arr.sort(() => Math.random() - 0.5);
}

{
	let vasya = { name: 'Вася', age: 25 };
	let petya = { name: 'Петя', age: 30 };
	let masha = { name: 'Маша', age: 29 };

	let arr = [vasya, petya, masha];

	function getAverageAge(users) {
		return (
			users.reduce((acc, elem) => {
				return acc + elem.age;
			}, 0) / users.length
		);
	}
	console.log(getAverageAge(arr));
}

let strings = [
	'кришна',
	'кришна',
	'харе',
	'харе',
	'харе',
	'харе',
	'кришна',
	'кришна',
	':-O',
];

function unique(arr) {
	let arr1 = arr.filter((elem, index, array) => {
		return array.indexOf(elem) === index;
	});
	return arr1;
}

console.log(unique(strings)); //['кришна', 'харе', ':-O']

function un1(arr) {
	let result = [];
	for (let key of arr) {
		if (!result.includes(key)) {
			result.push(key);
		}
	}
	return result;
}
console.log(un1(strings));
{
	let users = [
		{ id: 'john', name: 'John Smith', age: 20 },
		{ id: 'ann', name: 'Ann Smith', age: 24 },
		{ id: 'pete', name: 'Pete Peterson', age: 31 },
	];

	function groupById(arr) {
		return arr.reduce((obj, value) => {
			obj[value.id] = value;
			return obj;
		}, {});
	}
	let usersById = groupById(users);
}
