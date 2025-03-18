let arr = [2, 4, 6, 8, 10];
let allEven = arr.every(elem => elem % 2 === 0);
console.log(allEven);

let str = 'hello';
let newMass = Array.from(str);
console.log(newMass); //[ 'h', 'e', 'l', 'l', 'o' ]
//Array.from преобразует итерируемый объект (например, строку) в массив.

let numbers = Array.from({ length: 10 }, (elem, index) => index + 1);
console.log(numbers);
/*Она принимает два аргумента:

elem — текущий элемент (в данном случае он не используется, так как элементы изначально undefined).

index — индекс текущего элемента (начинается с 0).

Функция возвращает значение index + 1, которое становится значением элемента массива*/

//Создание массива случайных чисел:
let num1 = Array.from({ length: 5 }, (elem, index) =>
	Math.floor(Math.random() * 100)
);
console.log(num1);
//[ 83, 29, 76, 67, 81 ]

let arr1 = [4, 5, 89, 9, 9, 4, 44, 44, 77, 5, 8, 64, 8];

//1 без дублей
let noDuble = [];
for (let elem of arr1) {
	if (!noDuble.includes(elem)) {
		noDuble.push(elem);
	}
}
console.log(noDuble); // 4,  5, 89,  9, 44, 77,  8, 64
//2 без дублей
let noDuble1 = arr1.filter((elem, index, array) => {
	return array.indexOf(elem) === index;
});
console.log(noDuble1); //4,  5, 89,  9, 44, 77,  8, 64

//уникал
let unique = arr1.reduce((acc, elem, index, array) => {
	let fInd = array.indexOf(elem);
	let lInd = array.lastIndexOf(elem);
	if (fInd === lInd) {
		acc.push(elem);
	}
	return acc;
}, []);
console.log(unique); //[ 89, 77, 64 ]

/// возвращает  дубликаты без поворений
let Notunique = arr1.reduce((acc, elem, index, array) => {
	let fInd = array.indexOf(elem);
	let lInd = array.lastIndexOf(elem);
	if (fInd !== lInd && !acc.includes(elem)) {
		acc.push(elem);
	}
	return acc;
}, []);
console.log(Notunique); //4, 5, 9, 44, 8
///// возвращает все   дубликаты
let NotuniqueDouble = arr1.reduce((acc, elem, index, array) => {
	let fInd = array.indexOf(elem);
	let lInd = array.lastIndexOf(elem);
	if (fInd !== lInd) {
		acc.push(elem);
	}
	return acc;
}, []);
console.log(NotuniqueDouble);
//4,  5, 9, 9, 4, 44, 44, 5, 8, 8;

{
	let arr2 = [4, 5, 89, 9, 9, 4, 44, 44, 77, 5, 8, 64, 8];
	let unique = [];
	let doubles = [];
	let seen = {};

	for (let elem of arr2) {
		if (seen[elem]) {
			seen[elem]++;
		} else {
			seen[elem] = 1;
		}
	}

	for (let elem in seen) {
		if (seen[elem] === 1) {
			unique.push(Number(elem));
		} else {
			doubles.push(Number(elem));
		}
	}
	console.log(unique);
	console.log(doubles);
}
/*[ 64, 77, 89 ]
[ 4, 5, 8, 9, 44 ]*/
{
}

const foo = fetch(`https://jsonplaceholder.typicode.com/todos/1`)
	.then(res => res.json())
	.then(data => console.log(data));

let arr4 = [1, 2, 2, 3, 4, 4, 5];
// Ожидаемый результат: [1, "duplicate", "duplicate", 3, "duplicate", "duplicate", 5]
let res1 = arr4.map((elem, index, array) => {
	return array.indexOf(elem) === array.lastIndexOf(elem) ? elem : 'duplicate';
});
console.log(res1);
{
	let arr4 = [1, 2, 2, 2, 2, 2, 2, 3, 3, 4, 4, 5];

	let res1 = arr4.filter((elem, index, array) => {
		return array.indexOf(elem) === array.lastIndexOf(elem);
	});
	console.log(res1);
	//Метод filter создает новый массив, включая только те элементы, для которых условие в callback-функции возвращает true.Таким образом, filter возвращает массив значений, которые удовлетворяют условию
}

let start = 3;
let end = 7;
// Ожидаемый результат: [3, 4, 5, 6, 7]
let arr5 = Array.from(
	{
		length: end - start + 1,
	},
	(elem, index) => start + index
);
console.log(arr5);
{
	let arr5 = [];
	for (let i = start; i <= end; i++) {
		arr5.push(i);
	}
}
let arr6 = [1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 5];
let un1 = [];
let dub1 = [];
arr6.forEach((elem, index, array) => {
	if (array.indexOf(elem) === array.lastIndexOf(elem)) {
		un1.push(elem);
	} else {
		dub1.push(elem);
	}
	dub2 = [...new Set(dub1)];
});
console.log(un1);
console.log(dub2);

{
	let arr6 = [1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 5];
	let un1 = [];
	let dub1 = [];
	let seen = {};
	for (let elem of arr6) {
		if (seen[elem]) {
			seen[elem]++;
		} else {
			seen[elem] = 1;
		}
	}
	for (let i in seen) {
		if (seen[i] === 1) {
			un1.push(Number(i));
		} else {
			dub1.push(Number(i));
		}
	}
	console.log(un1);
	console.log(dub1);
}

let arr7 = [1, 2, 2, 3, 4, 4, 5];
let res2 = arr7.map((elem, index, array) => {
	if (array.indexOf(elem) !== index) {
		return Math.floor(Math.random() * 100) + 1;
	}
	return elem;
});
console.log(res2);
let first = 2;
let sec = 10;
let step = 2;
let res3 = Array.from(
	{
		length: Math.ceil((sec - first + 1) / step),
	},
	(elem, index) => start + index * step
);

let arr8 = [1, 2, 3, 4, 5];
let arrred = arr8.reduce((acc, elem, index) => {
	if (index % 2 === 0) {
		acc += elem;
	} else
}, 0);
