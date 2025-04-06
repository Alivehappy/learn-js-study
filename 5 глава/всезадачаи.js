//Вам будет предоставлен массив aи значение x. Все, что вам нужно сделать, это проверить, содержит ли предоставленный массив значение.

{
	const arr = [1, 2, 3, 4, 5];
	const x = 5;
	function check(arr, x) {
		let result = arr.find(elem => elem === x);
		if (result) {
			return true;
		}
		return false;
	}
	console.log(check(arr, x));
}

{
	const arr = [1, 2, 3, 4, 5];
	const x = 5;
	function check(arr, x) {
		return arr.includes(x);
	}
	console.log(check(arr, x));
}
/*Write a function that will take in any array and reverse it.

Sounds simple doesn't it?

NOTES:

Array should be reversed in place! (no need to return it)
Usual builtins have been deactivated. Don't count on them.
You'll have to do it fast enough, so think about <performances></performances>*/

{
	const arr = [1, 2, 3, 4, 5];
	function reversed(arr) {
		return arr.reverse();
	}
	console.log(reversed(arr)); // [5, 4, 3, 2, 1]
}

{
	const arr = [1, 2, 3, 4, 5];
	function reversed(arr) {
		let left = 0;
		let right = arr.length - 1;
		while (left < right) {
			const temp = arr[left]; //// Сохраняем исходное значение arr[left]
			arr[left] = arr[right]; // Перезаписываем arr[left]
			arr[right] = temp; // Восстанавливаем исходное значение в arr[right]
			left++;
			right--;
		}
		return arr;
	}
	console.log(reversed(arr));
}
/*Напишите небольшую функцию, которая возвращает значения массива, которые не являются нечетными.

Все значения в массиве будут целыми числами. Верните правильные значения в том порядке, в котором они указаны*/
{
	const arr = [1, 2, 3, 4, 5];
	function noOdds(values) {
		return values.filter(elem => elem % 2 !== 0);
	}
	console.log(noOdds(arr)); //[1, 3, 5]
}
//Ваша задача — написать функцию, которая принимает строку и возвращает массив/список, в котором длина каждого слова добавлена ​​к каждому элементу.

{
	let str = 'apple ban';
	function length(str) {
		let str2 = str.split(' '); //['apple', 'ban'] - обычный массив строк разбиваем строку на массив
		let result = [];
		for (let i of str2) {
			result.push(`${i} ${i.length}`);
		}
		return result;
	}
	console.log(length(str));
} //['apple 5', 'ban 3']

{
	let str = 'apple ban';
	function length(str) {
		let str2 = str.split(' ').map(elem => {
			return `${elem}, ${elem.length}`;
		});
		return str2;
	}
	console.log(length(str));
}

{
	let str = 'apple ban';
	function length(str) {
		let str2 = str.split(' ').reduce((acc, elem) => {
			acc.push(`${elem}, ${elem.length}`);
			return acc;
		}, []);
		return str2;
	}
	console.log(length(str)); //['apple, 5', 'ban, 3']
}

//Нужно включить лампочки (заменить x на o) в строке lamps на всех позициях, где пролетел дрон, включая его текущее положение.

function drone(lamps, drone) {
	const lampsArray = lamps.split(' ');
	const dronePathLength = drone.indexOf('T') + 1;
	//ноль -начало взлюта тож считаем
	for (let i = 0; i < dronePathLength && i < lampsArray.length; i++) {
		if (lampsArray[i] === 'x') {
			lampsArray[i] = 'o';
		}
	}
	return lampsArray.join('');
}
//Учитывая массив чисел (в формате строки), вы должны вернуть строку. Числа соответствуют буквам алфавита в обратном порядке: a=26, z=1 и т. д. Вы также должны учитывать '!', '?'и ' ', которые представлены как '27', '28' и '29' соответственно
function Numlet(nums) {
	const charMap = {
		27: '!',
		28: '&',
		29: ' ',
	};
	//(a=26, z=1) в обратном

	for (let i = 1; i <= 26; i++) {
		charMap[i.toString()] = String.fromCharCode(96 + i); //// 97 = 'a', 98 = 'b', ..., 122 = 'z'
	}
	return nums.map(num => charMap[num] || '').join('');
}
/*String.fromCharCode()
Это метод, который преобразует числовой код Unicode в соответствующий символ.*/
//Создаётся свойство в объекте charMap с ключом '1' и значением 'a' (результат String.fromCharCode(97))
//
/*Для заданной последовательности целых чисел вернуть сумму всех целых чисел, имеющих четный индекс (нечетный индекс в COBOL), умноженную на целое число в последнем индексе.

Индексы в последовательности начинаются с 0.

Если последовательность пуста, следует вернуть 0.

*/
const arr2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
function evenLast(numbers) {
	let str1 = numbers.filter((elem, index) => index % 2 === 0);
	let str2 = str1.reduce((acc, elem) => (acc += elem), 0);
	return str2 * str1[str1.length - 1];
}
console.log(evenLast(arr2)); //20
//"CodEWaRs" --> [0,3,4,6]
//Напишите функцию, которая принимает в качестве аргумента одну непустую строку, состоящую только из строчных и заглавных букв ASCII ( word), и возвращает упорядоченный список, содержащий индексы всех заглавных (верхних) букв в строке.
const word = 'CodEWaRs';
function Capitals(word) {
	let mas = [];
	for (let i = 0; i < word.length; i++) {
		if (
			word[i] === word[i].toUpperCase() &&
			word[i] !== word[i].toLowerCase()
		) {
			mas.push(i);
		}
	}
	return mas;
}
console.log(Capitals(word)); //[0, 3, 4, 6]
///// word[i] — символ на позиции i
//mas.push(i); // Добавляем в массив индекс i, а не символ word[i]
//i — это число (индекс), которое меняется от 0 до word.length - 1.
function stringToAsciiNumber(str) {
	let total1 = '';
	for (let i = 0; i < str.length; i++) {
		const asciiCode = str.charCodeAt(i); // Получаем ASCII-код символа
		total1 += asciiCode.toString();
	}
	const total2 = total1
		.split('')
		.map(elem => {
			if (elem === '7') {
				return '1';
			}
			return elem;
		})
		.join('');
	//Then return the difference between the sum of the digits in total1 and total2:

	const sum = num => [...num.toString()].reduce((acc, a) => acc + Number(a), 0);
	const sum1 = sum(total1);
	const sum2 = sum(total2);
	return {
		total1: Number(total1),
		total2: Number(total2),
		difference: sum1 - sum2,
	};
}
console.log(stringToAsciiNumber('ABC')); // 656667 -656661
//Then replace any incidence of the number 7 with the number 1, and call this number 'total2':
/*Почему нельзя просто вернуть '1'?
Если написать так:

javascript
Copy
.map(elem => {
    if (elem === '7') return '1'; 
    // Для остальных элементов return отсутствует!
})
То:

Для '7' вернётся '1'.

Для всех остальных элементов — undefined (так как нет else или второго return).
 Почему нельзя просто сделать [...number]?
Попробуем на примере числа 12345:

javascript
Copy
const number = 12345;

// Попытка без toString():
console.log([...number]); // Ошибка: number is not iterable
Оператор spread (...) работает только с итерируемыми объектами (массивы, строки, Map, Set)


*/
function sortByLastChar(str) {
	return str.split(' ').sort((a, b) => {
		const lastA = a.slice(-1); //ищем последний символ элмента
		const lastB = b.slice(-1);
		return lastA.localeCompare(lastB);
	});
}
console.log(sortByLastChar('Anna, Bogdan'));
/*a.slice(-1) и b.slice(-1) возвращают строки (один символ)

Оператор - работает только с числами

Что произойдёт при a - b:

javascript
Copy
"o" - "d" // NaN (не число)
*/
/*Complete the keysAndValues function so that it takes in an object and returns the keys and values as separate arrays.

Example:

keysAndValues({a: 1, b: 2, c: 3}) // should return [['a', 'b', 'c'], [1, 2, 3]]
*/

function divide(obj) {
	const keys = Object.keys(obj);
	const values = Object.values(obj);
	const mas = [];
	mas.push(keys, values);
	return mas;
}
console.log(divide({ a: 1, b: 2, c: 3 }));
/*function keysAndValues(obj) {
    return [Object.keys(obj), Object.values(obj)];
}
*/

{
	let arr = [1, 2, 3, 4, 5, 6];
	const [a1, b1] = arr; //[a, b] = arr извлекает первые два элемента массива:

	console.log(a, b);
	const { 3: f, 4: g } = arr; //Деструктуризация массива как объекта
	//Возьми свойство 3 (это arr[3]) и присвой переменной f → 4

	console.log(f, g);
	/*В JavaScript массивы — это специальный вид объектов, где ключами являются числовые индексы.

Поэтому можно обращаться к элементам массива через деструктуризацию объекта, указывая индексы как ключи.

*/

	const obj = {
		a: 1,
		b: function () {
			return 2;
		},
		c: {
			d: 3,
			e: 4,
		},
	};

	const {
		a,
		b,
		c: { d, e },
	} = obj;
}
/////////////////////////////////////////
{
	/*Напишите функцию printUser, которая принимает объект вида:
	const user = {
		name: 'Bob',
		age: 25,
		city: 'Paris',
	};
	 и выводит "Bob is 25 years old and lives in Paris, France"

	 */
	const user = {
		name: 'Bob',
		age: 25,
		city: 'Paris',
	};
	function printUser({ name, age, city, country = 'France' }) {
		console.log(`${name} is ${age}years old and lives in ${city}, ${country}`);
	}
	printUser(user);
}
//вложенные массивы нельзя деструктуризировать как объекты, потому что у массивов нет именованных свойств (как у объектов), только индексы.

//
/*Ваша задача — написать функцию, которая принимает строку и возвращает массив/список, в котором длина каждого слова добавлена ​​к каждому элементу.

Примечание: строка будет содержать как минимум один элемент; слова всегда будут разделены пробелом.*/
/*Пример (Вход -> Выход)

"apple ban" --> ["apple 5", "ban 3"]
"you will win" -->["you 3", "will 4", "win 3"]
*/
function countLet(str) {
	let str2 = str.split(' ').map(elem => `${elem}, ${elem.length}`);
	return str2;
}
console.log(countLet('you will win')); //['you, 3', 'will, 4', 'win, 3']

////2
//Напишите функцию, которая роверяет уникальны ли все символы в строке
function isUnique(str) {
	const uniqueMassiv = [];
	let str2 = str.split('');
	for (let i of str2) {
		if (!uniqueMassiv.includes(i)) {
			uniqueMassiv.push(i);
		}
	}
	if (str2.length !== uniqueMassiv.length) {
		return false;
	}
	return true;
}

console.log(isUnique('aannGfgYYu'));
{
	function isUnique(str) {
		const un = new Set(str);
		if (un.size !== str.length) {
			return false;
		}
		return true;
	}
	console.log(isUnique('aannGfgYYu'));
}

{
	function changeAraay(arr) {}
	console.log(changeAraay(arr));
}
