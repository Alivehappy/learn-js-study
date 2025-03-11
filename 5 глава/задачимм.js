const users = [
	{ id: 1, name: 'Alice', age: 25, email: 'alice@example.com', isActive: true },
	{ id: 2, name: 'Bob', age: 30, email: 'bob@example.com', isActive: false },
	{
		id: 3,
		name: 'Charlie',
		age: 20,
		email: 'charlie@example.com',
		isActive: true,
	},
	{ id: 4, name: 'David', age: 35, email: 'david@example.com', isActive: true },
	{ id: 5, name: 'Eve', age: 25, email: 'eve@example.com', isActive: false },
];

let activeUsers = users.filter(elem => elem.isActive === true);
// сорт все отфильтрует поэтому бесполезен, фильтер потому что надо оставить ток активных
activeUsers.forEach(elem => {
	delete elem.isActive;
});
//так как объекты он норм удалится
console.log(activeUsers);
/* либо так
activeUsers.map((elem) => {
  return {id: elem.id,
		name: elem.name,
		age: elem.age,
		email: elem.email
  }});*/
let uniqueAges = users
	.map(elem => elem.age) //создаем массив возврастов пользователей [25, 30, 20, 35, 25]
	.filter(
		(age, index, array) => array.findIndex(elem => elem === age) === index
	);
console.log(uniqueAges);
let emailDomains = users
	.map(elem => {
		return elem.email.split('@')[1];
	})
	.filter(
		(elem, index, array) => array.findIndex(email => email === elem) === index
	);
console.log(emailDomains);
let sortedByAge = users.slice().sort((a, b) => a.age - b.age);
console.log(sortedByAge);

const arr = [1, 2, 2, 2, 6, 3, 3, 3, 4, 4, 5];
let unique = arr.filter((elem, index, array) => {
	return array.findIndex(e => e == elem) === index;
});
console.log(unique);
/*findIndex ищет первый индекс, где элемент массива равен elem.

Например, для elem = 2:

findIndex вернёт 1, потому что первый раз 2 встречается на индексе 1.

*/
const arr1 = [1, 2, 2, 2, 6, 3, 3, 3, 4, 4, 5];
let notUnique = arr1.filter((elem, index, array) => {
	return array.findIndex(e => e == elem) !== index;
});
let sorted = notUnique.reduce((acc, elem) => {
	if (!acc.includes(elem)) {
		acc.push(elem);
	}
	return acc;
}, []);
console.log(sorted);
//[2, 2, 3, 3, 4]

//Дан массив. Подсчитайте количество уникальных элементов в нем.
const arr2 = [1, 2, 2, 3, 4, 4, 5];
let arr2Unique = arr2.filter((elem, index, array) => {
	return array.findIndex(e => e === elem) === index;
});
console.log(arr2Unique.length);

//Дан массив объектов. Создайте новый массив, содержащий только уникальные объекты по определенному полю (например, id).

const users1 = [
	{ id: 1, name: 'Alice' },
	{ id: 2, name: 'Bob' },
	{ id: 1, name: 'Alice' },
];
users1.filter((elem, index, array) => {
	return array.findIndex(e => e.id === elem.ad) === index;
});

//Дополните функцию keysAndValues ​​так, чтобы она принимала объект и возвращала ключи и значения в виде отдельных массивов.

let obj = { a: 1, b: 2, c: 3 };
function keysAndValue(obj) {
	const keys = Object.keys(obj); //Возвращает массив ключей объекта
	const values = Object.values(obj); //Возвращает массив значений объекта
	return [keys, values];
}

// should return [['a', 'b', 'c'], [1, 2, 3]]

function partList(arr) {
	let result = [];
	for (let i = 1; i < arr.length; i++) {
		const firstPart = arr.slice(0, i).join(' ');
		const secondPart = arr.slice(i).join(' ');
		result.push([firstPart, secondPart]);
	}
	return result;
}

let array1 = ['az', 'toto', 'picaro', 'zone', 'kiwi'];
console.log(partList(array1));
//Метод push добавляет элементы в массив, но он возвращает новую длину массива, а не сам массив. Поэтому return result.push(...) вернет число, а не массив.
/*0
: 
(2) ['az', 'toto picaro zone kiwi']
1
: 
(2) ['az toto', 'picaro zone kiwi']
2
: 
(2) ['az toto picaro', 'zone kiwi']
3
: 
(2) ['az toto picaro zone', 'kiwi']
*/
/*Напишите функцию, которая вычисляет среднее значение чисел в заданном массиве.

Примечание: пустые массивы должны возвращать 0.

*/
function numRange(arr) {
	if (!arr || arr.length === 0) return 0;

	let result = arr.reduce((acc, elem) => {
		return acc + elem;
	}, 0);
	let average = result / arr.length;
	return +average.toFixed(2);
}
let array2 = [1, 2, 3, 4, 5, 6, 8, 9, 89, 5];
console.log(numRange(array2)); //13.2
let array3 = [];
console.log(numRange(array3));

/*array: [1, 2, 5, 7, 4, 6, 3, 9, 8]
start: 2
length: not specified
expected result: [1, 2, 3, 4, 5, 6, 7, 8, 9]
 надо такой результат  и сортировать со второго индекса*/
function sortArr2Index(arr) {
	let arr1 = arr.slice(0, 2);
	let arr2 = arr.slice(2).sort((a, b) => a - b);
	return arr1.concat(arr2);
}
let array = [1, 2, 5, 7, 4, 6, 3, 9, 8];
console.log(sortArr2Index(array)); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
//Метод concat не изменяет исходный массив, а возвращает новый массив. Поэтому результат нужно явно вернуть из функции
/* перепишу универсально

function sortArr2Index(arr, num) {
let index = num;
if(index === 0 || index > arr.length) return 'Conditioin error';
let arr1 = arr.slice(0, num);
let arr2 = arr.slice(num).sort((a,b) => a-b);
return arr1.concat(arr2)
}
let array = [0,5,6,6,4,8,5,7,8,9,88,8,8,5,4,56,25];
console.log(sortArr2Index(array,5));*/
//слайс вернет новый массив а число кнам начнет сортировку

/*Создайте функцию, которая принимает массив имен и возвращает массив каждого имени, в котором первая буква заглавная, а остальные — строчные.

Примеры
['jo', 'nelson', 'jurie'] -->  ['Jo', 'Nelson', 'Jurie']
['KARLY', 'DANIEL', 'KELSEY'] --> ['Karly', 'Daniel', 'Kelsey']*/

function changeName(arr) {
	return arr.map(elem => {
		let lowerCaseName = elem.toLowerCase();
		return lowerCaseName[0].toUpperCase() + lowerCaseName.slice(1);
	});
}
let array4 = ['jo', 'nelson', 'jurie'];
console.log(changeName(array4));

//1. Напиши функцию, которая удаляет повторяющиеся элементы из массива и возвращает новый массив.
function getUnique(arr) {
	return arr.filter((elem, index, array) => {
		return array.findIndex(e => e === elem) === index;
	});
}
let array5 = [1, 1, 2, 2, 5, 5, 6, 6, 66, 89, 78, 9, 5, 5, 6, 5];

console.log(getUnique(array5)); //[1, 2, 5, 6, 66, 89, 78, 9]

function delDuplicare(arr) {
	let result = [];
	for (let key of arr) {
		if (!result.includes(key)) {
			result.push(key);
		}
	}
	return result;
}
console.log(delDuplicare(array5));

function onlyRepeats(arr) {
	return arr.filter((elem, index, array) => {
		return array.findIndex(e => e === elem) !== index;
	});
}
console.log(onlyRepeats(array5)); // код фмгня так как выводи как попало

function Duplicare(arr) {
	let result = [];
	let seen = {};

	for (let key of arr) {
		if (seen[key]) {
			if (!result.includes(key)) {
				result.push(key);
			}
		} else {
			seen[key] = true;
		}
	}
	return result;
}
let array6 = [1, 1, 2, 2, 5, 5, 6, 6, 66, 89, 78, 9, 5, 5, 6, 5];

console.log(Duplicare(array6)); //[1, 2, 5, 6] вот так видно КАКИЕ ЦИФРЫПОВТОРЯЮТМЯ

//напишу все повторения
function DuplicareAll(arr) {
	let result = [];
	let seen = {};

	for (let key of arr) {
		if (seen[key]) {
			result.push(key);
		} else {
			seen[key] = true;
		}
	}
	return result;
}

// mutable - push pop shift unshift reverce sort splice
// non mutable - concat toSorted filter map forEach findIndex reduce find flat
const input = [1, 2, 3, 5, 6, 1, 10, 1, 2, 4, 2, 2];
const result = input.reduce((acc, elem, index, array) => {
	const firstIndex = array.indexOf(elem);
	const lastIndex = array.lastIndexOf(elem);
	if (firstIndex !== lastIndex && acc.indexOf(elem) === -1) {
		acc.push(elem);
	}
	return acc;
}, []);
console.log(result); //[1, 2];

function ar(arr) {
	return arr.filter((elem, index, array) => {
		return array.findIndex(e => e === elem) !== index;
	});
	return [...new Set(duplicates)];
}
console.log(ar(input));

const res = input.reduce((acc, elem, index, array) => {
	const isUnique = array.lastIndexof(elem) === index;
	const isAlreadyAdded = acc.findIndex(e => e === elem) !== -1;
	if (!isUnique && !isAlreadyAdded) {
		acc.push(elem);
	} else {
		return acc;
	}
}, []);
//чтобы double()функция возвращала новый массив, в котором каждое значение в два раза больше соответствующего значения в переданном массиве

function double(arr) {
	return arr.map(elem => elem * 2);
}
var someNumbers = [1, 2, 10, 57];

double(someNumbers); // should return [2,4,20,114]

/*Ваша distributeEvenlyфункция будет принимать массив в качестве аргумента и должна возвращать новый массив с равномерно распределенными значениями.

Пример:

Аргумент: ['one', 'one', 'two', 'two', 'three', 'three', 'four', 'four']

Результат: ['one', 'two', 'three', 'four', 'one', 'two', 'three', 'four']

*/
function distributeEvenl(arr) {
	let objSeen = {};
	for (let elem of arr) {
		if (objSeen[elem]) {
			++objSeen[elem];
		} else {
			objSeen[elem] = 1;
		}
	}
	let arr1 = [];
	while (arr1.length < arr.length) {
		for (let key in objSeen) {
			if (objSeen[key] > 0) {
				arr1.push(key);
				objSeen[key]--;
			}
		}
	}
	return arr1;
}
let array7 = ['one', 'one', 'two', 'two', 'three', 'three', 'four', 'four'];
console.log(distributeEvenl(array7));
//objSeen[elem] пытается получить значение свойства объекта objSeen по ключу elem.
//[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -11, -12, -13, -14, -15], you should return [10, -65].

function numberInteg(arr) {
	if (!arr || arr.length === 0) {
		return (arr = []);
	}
	const result = arr.reduce(
		(acc, elem) => {
			resultPositive = [];
			if (num > 0) {
				acc[0]++; //нулевой индекс полож числа
			} else {
				if (num < 0) {
					acc[1] += num;
				}
				return acc;
			}
		},
		[0, 0]
	); // Начальное значение: [countPositives, sumNegatives]

	return result;
}
/*alternative 
 function numberInteg(arr) {
	if (!arr || arr.length === 0) {
		return (arr = []);
}
		let Positive =0;
		let sumnegative =0;
		for(let elem of arr){
		if(elem <>0){
		Positive++} else{
		sumnegative += elem
		}
		}
		return [Positive,sumnegative ]
		}*/
const objA = { a: 10, b: 20, c: 30 };
const objB = { a: 3, c: 6, d: 3 };
function combine(objA, objB) {
	let arr3 = Object.assign({}, objA);
	for (let key in objB) {
		if (arr3[key]) {
			arr3[key] += objB[key];
		} else {
			arr3[key] = objB[key];
		}
	}

	return arr3;
}
console.log(combine(objA, objB)); //{a: 13, b: 20, c: 36, d: 3}

///Для заданной последовательности целых чисел вернуть сумму всех целых чисел, имеющих четный индекс (нечетный индекс в COBOL), умноженную на целое число в последнем индексе.

let arr9 = [1, 2, 3, 4, 5];
let sum = 0;
for (let i = 0; i < arr9.length; i += 2) {
	sum += arr9[i];
}
let mulSum = sum * arr9[arr9.length - 1];
console.log(mulSum); //45

/*Имея двумерный (вложенный) список (массив, вектор, ..) размера m * n, ваша задача — найти сумму минимальных значений в каждой строке.

Например:

[ [ 1, 2, 3, 4, 5 ]        #  minimum value of row is 1
, [ 5, 6, 7, 8, 9 ]        #  minimum value of row is 5
, [ 20, 21, 34, 56, 100 ]  #  minimum value of row is mza
]
*/
function ff(arr) {
	let ar1 = 0;
	for (let elem of arr) {
		let a = Math.min(...elem);
		ar1 += a;
	}
	return ar1;
}
let arr8 = [
	[1, 2, 3, 4, 5],
	[5, 6, 7, 8, 9],
	[20, 21, 34, 56, 100],
];
console.log(ff(arr8)); //26


