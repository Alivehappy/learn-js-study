// Задача 1. Фильтрация массива объектов по полю
// Дан массив пользователей. Отфильтруй только тех, кому больше 18 лет.

const users = [
	{ name: 'Alice', age: 17 },
	{ name: 'Bob', age: 22 },
	{ name: 'Charlie', age: 19 },
	{ name: 'David', age: 16 },
];

// Ожидаемый результат:
// [
//   { name: 'Bob', age: 22 },
//   { name: 'Charlie', age: 19 }
// ]
let a = users.filter(elem => elem.age > 18);
console.log(a);
// Задача 2. Подсчёт количества повторяющихся элементов
// Посчитай, сколько раз встречается каждый элемент в массиве.
const input = ['a', 'b', 'a', 'c', 'b', 'a'];

// Ожидаемый результат:
// { a: 3, b: 2, c: 1 }

function countOccurrences(arr) {
	let obj = {};
	arr.forEach(el => {
		if (obj[el]) {
			obj[el]++;
		} else {
			obj[el] = 1;
		}
	});
	return obj;
}

console.log(countOccurrences(input));

{
	const input = ['a', 'b', 'a', 'c', 'b', 'a'];
	function countOccurrences(arr) {
		return arr.reduce((acc, elem) => {
			if (acc[elem]) {
				acc[elem]++;
			} else {
				acc[elem] = 1;
			}
			return acc;
		}, {});
	}
	console.log(countOccurrences(input));
}
// Задача 3. Преобразование массива в объект по ключу
// Преобразуй массив пользователей в объект, где ключом будет id, а значением — весь объект пользователя.
const secondUsers = [
	{ id: 1, name: 'Alice' },
	{ id: 2, name: 'Bob' },
	{ id: 3, name: 'Charlie' },
];

// Ожидаемый результат:
// {
//   1: { id: 1, name: 'Alice' },
//   2: { id: 2, name: 'Bob' },
//   3: { id: 3, name: 'Charlie' }
// }

function mapUsersById(users) {
	let obj = {};
	for (let i = 0; i < users.length; i++) {
		let elem = users[i];
		if (!obj[elem.id]) {
			obj[elem.id] = elem;
		}
	}
	return obj;
}

console.log(mapUsersById(secondUsers));

{
	function mapUsersById(users) {
		let obj = {};
		for (let i of users) {
			if (!obj[i.id]) {
				obj[i.id] = i;
			}
		}
		return obj;
	}
	console.log(
		mapUsersById([
			{ id: 1, name: 'Alice' },
			{ id: 2, name: 'Bob' },
			{ id: 3, name: 'Charlie' },
		])
	);
}

{
	function mapUsersById(users) {
		return users.reduce((acc, elem) => {
			if (!acc[elem.id]) {
				acc[elem.id] = elem;
			}
			return acc;
		}, {});
	}
	console.log(
		mapUsersById([
			{ id: 1, name: 'Alice' },
			{ id: 2, name: 'Bob' },
			{ id: 3, name: 'Charlie' },
		])
	);
}

// Задача 4. Сортировка и вывод топ-3 по полю
// Есть массив товаров. Отсортируй его по убыванию цены и выведи топ-3 самых дорогих.
const products = [
	{ name: 'Laptop', price: 1200 },
	{ name: 'Phone', price: 800 },
	{ name: 'Tablet', price: 600 },
	{ name: 'Monitor', price: 300 },
	{ name: 'Keyboard', price: 100 },
];

// Ожидаемый результат:
// [
//   { name: 'Laptop', price: 1200 },
//   { name: 'Phone', price: 800 },
//   { name: 'Tablet', price: 600 }
// ]

function getTop3Expensive(products) {
	let sorted = products.sort((a, b) => b.price - a.price);
	let arr = [];
	for (let i of sorted) {
		if (arr.length !== 3) {
			arr.push(i);
		}
	}
	return arr;
}

console.log(getTop3Expensive(products));

// Задача 5. Преобразование объекта в массив
// Преобразуй объект вида { a: 1, b: 2 } в массив объектов вида { key: 'a', value: 1 }.

const secondInput = { a: 1, b: 2, c: 3 };

// Ожидаемый результат:
// [
//   { key: 'a', value: 1 },
//   { key: 'b', value: 2 },
//   { key: 'c', value: 3 }
// ]

function objectToArray(obj) {
	let arr = [];
	for (let i in obj) {
		arr.push({ key: i, value: obj[i] });
	}
	return arr;
}

console.log(objectToArray(secondInput));
{
	function objectToArray(obj) {
		return Object.keys(obj).reduce((acc, elem) => {
			acc.push({ key: elem, value: obj[elem] });
			return acc;
		}, []);
	}
	console.log(objectToArray({ a: 1, b: 2, c: 3 }));
}
// Задача 6. Обработка заказов: фильтрация, сортировка и трансформация
// Описание:
// Представь, что ты получил от бэка список заказов. Нужно:
// -Оставить только оплаченные (status: 'paid') заказы.
// -Отсортировать их по сумме заказа (amount) по убыванию.
// -Преобразовать их в объект, где:
//   -ключом будет userId,
//   -значением — общая сумма всех заказов этого пользователя.

const orders = [
	{ id: 1, userId: 101, status: 'paid', amount: 250 },
	{ id: 2, userId: 102, status: 'pending', amount: 400 },
	{ id: 3, userId: 101, status: 'paid', amount: 300 },
	{ id: 4, userId: 103, status: 'paid', amount: 150 },
	{ id: 5, userId: 102, status: 'paid', amount: 500 },
	{ id: 6, userId: 101, status: 'cancelled', amount: 200 },
];

// После всех операций должен получиться объект:
// {
//     101: 550,
//     102: 500,
//     103: 150
// }

function processOrders(orders) {
	let sum = orders
		.filter(elem => elem.status === 'paid')
		.reduce((acc, elem) => {
			if (!acc[elem.userId]) {
				acc[elem.userId] = elem.amount;
			} else {
				acc[elem.userId] += elem.amount;
			}
			return acc;
		}, {});
	let filterd = orders
		.filter(elem => elem.status === 'paid')
		.sort((a, b) => b.amount - a.amount)
		.reduce((acc, elem) => {
			if (!acc[elem.userId]) {
				acc[elem.userId] = sum[elem.userId];
			}
			return acc;
		}, {});
	return filterd;
}

console.log(processOrders(orders));

{
	function palindrome(str) {
		return str.toLowerCase() === str.toLowerCase().split('').reverse().join('');
	}
}

{
	function palindrome1_2(str) {
		let clean = str.toLowerCase();
		let right = 0;
		let left = clean.length - 1;
		while (right < left) {
			if (clean[right] === clean[left]) {
				right++;
				left--;
			} else {
				return false;
			}
		}
		return true;
	}
	console.log(palindrome1_2('abba'));
	console.log(palindrome1_2('abbal'));
}
let arr = [1, 5, 5, 8, 6, 8, 7, 5, 5, 7];

{
	function unique(ar) {
		return ar.filter((elem, indexe, array) => {
			return array.indexOf(elem) === array.lastIndexOf(elem);
		});
	}
	console.log(unique(arr));
}
{
	function noDoubles(ar) {
		return [...new Set(ar)];
	}
	console.log(unique(arr));
}

{
	let arr = [1, 5, 5, 8, 6, 8, 7, 5, 5, 7];
	function countUniwue(arr) {
		let objCount = {};
		arr.forEach(el => {
			if (!objCount[el]) {
				objCount[el] = 1;
			} else {
				objCount[el]++;
			}
		});
		return Object.values(objCount).filter(el => el === 1).length;
	}
	console.log(countUniwue(arr));
}

{
	let arr = [1, 5, 5, 6, 8];
	function countUniwue(ar) {
		if (arr.length === 0) {
			return 0;
		}
		let counter = 0;
		let j = 0;
		for (let i = 1; i < ar.length; i++) {
			if (ar[i] !== ar[j]) {
				counter += 1;
				j += 1;
			}
		}
		return counter;
	}
	console.log(countUniwue(arr));
}

{
	function countev(ar) {
		let count = 0;
		let iterat = 0;
		for (let i of ar) {
			if (i % 2 === 0) {
				count++;
				iterat++;
			} else {
				iterat++;
			}
		}
		console.log(count);
		return iterat;
	}
	countev([1, 1, 2, 3, 4, 66, 8, 9, 8]);
}
