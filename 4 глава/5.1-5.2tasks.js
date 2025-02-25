function sum() {
	let num1 = +prompt('num', '0');
	let num2 = +prompt('num', '0');
	return num1 + num2;
}
sum();

//6.35.toFixed(1) ==6.3
//alert(6.35 * 10).toFixed(1) -// бред

let result = Math.round(6.35 * 10) / 10;
console.log(result); // 6.4
///
///
///
function readNumber() {
	let i = true;
	while (true) {
		let num = prompt('num', '0');
		if (num === null || num === '') {
			return null;
		} else {
			Number(num);
			if (Number.isFinite(num)) {
				return num;
			} else {
				alert('not a number');
			}
		}
	}
}
readNumber();

//После return выполнение функции завершается, поэтому break; не нужен /*Унарный плюс (+) преобразует null в 0, а пустую строку ('') в 0. Это может быть нежелательно, если вы хотите отличать отмену ввода (когда пользователь нажимает "Отмена" или вводит пустую строку) от ввода числа 0.*/

function readN() {
	let num;
	do {
		num = prompt('num', '');
	} while (!isFinite(num));
	if (num === null || num === '') return null;
	return +num;
}
console.log(`numbber ${readN()}`); // решение из учебника если ввести пробел преобразует и завершает цикл, мой код более адекватный

//происходит потеря точности, при прибавлении таких дробей как 0.2.

//Вывод: избегайте проверок на равенство при работе с десятичными дробями
alert(random(1, 5)); // 1.2345623452
alert(random(1, 5)); // 3.7894332423
alert(random(1, 5)); // 4.3435234525

function random(min, max) {
	return min + Math.random() * (max - min);
}
//Если мы умножим случайное число от 0…1 на max-min, тогда интервал возможных значений от 0..1 увеличивается до 0..max-min.
//И, если мы прибавим min, то интервал станет от min до max.
//Math.random() — это функция, которая генерирует случайное число между 0 и 1. Например, она может сгенерировать 0.5, 0.3, 0.8 и так далее.//Чтобы получить случайное число в диапазоне от nim до max, мы должны:

//1.Умножить Math.random() на разницу между max и min//Если вы просто умножите Math.random() на разницу между max и min (например, 10 - 5 = 5), вы получите число в диапазоне от 0 до 5. Например:
/*Чтобы сдвинуть диапазон от 0-5 до 5-10, вы добавляете min (в данном случае 5) к результату.
Таким образом, формула Math.random() * (max - min) + min становится:
Math.random() * 5 + 5
Это дает вам число в диапазоне от 5 до 10.Таким образом, добавление min сдвигает диапазон от 0-5 до 5-10, что и требовалось.
Без min: Вы получаете число в диапазоне от 0 до (max - min).
С min: Вы получаете число в диапазоне от min до max.
Диапазон от 0 до max:
Если max = 10, то Math.random() * 10 даст вам числа в диапазоне от 0 до 10. Но это включает в себя числа от 0 до 5, которые вам не нужны, если вы хотите, чтобы минимальное значение было 5.

Умножение на max не учитывает минимальное значение. Если вам нужно, чтобы минимальное значение было 5, вы должны добавить это значение к результату, чтобы сдвинуть весь диапазон вверх.
Добавить min к результату:
Это сдвинет весь диапазон вверх, чтобы минимальное значение было min.
*/

function randomInteger(min, max) {
	let num = Math.random() * (max - min) + min;
	return Math.floor(num);
}
alert(randomInteger(1, 5));

function ucFirst(str) {
	if (!str) return str;
	let a = str[0].toUpperCase() + str.slice(1);
	return a;
}
ucFirst('вася');

function checkSpam(str) {
	let lowerstr = str.toLowerCase();
	if (lowerstr.includes('biagra') || str.includes('xxx')) {
		return true;
	}
	return false;
}
console.log(checkSpam('buy BiAgRA now')); //true
console.log(checkSpam('free xxxxx')); //true
console.log(checkSpam('rabbit')); // false

// Чтобы сделать проверку нечувствительной к регистру, нужно:

// Привести всю строку к одному регистру (например, к нижнему)

// Привести искомую подстроку к тому же регистру.
//Однако есть небольшая проблемка. Если строка пуста, str[0] вернёт undefined, а у undefined нет метода toUpperCase(), поэтому мы получим ошибку.

function truncate(str, maxlength) {
	let t1 = str.length;
	if (t1 > maxlength) {
		return str.slice(0, maxlength - 1) + '…';
	}
	return str;
}
console.log(truncate('Вот, что мне хотелось бы сказать на эту тему:', 20));

function extractCurrencyValue(str) {
	return +str.slice(1);
}
alert(extractCurrencyValue('$120')); //120

/*Задача 1: Сумма цифр числа
Напиши функцию sumDigits, которая принимает число и возвращает сумму его цифр.
Пример:
*/
function sumDigits(num) {
	let str = num.toString();
	let sum = 0;
	for (let i = 0; i < str.length; i++) {
		let digit = Number(str[i]);
		sum += digit;
	}

	return sum;
}

sumDigits(123); // 6 (1 + 2 + 3)
sumDigits(9875); // 29 (9 + 8 + 7 + 5)
//return += digit — это синтаксическая ошибка. Оператор += нельзя использовать с return.

//Нужно накапливать сумму в переменной, а затем вернуть её.

//Неправильное использование return:

//return внутри цикла завершает функцию на первой итерации, поэтому цикл не пройдет по всем цифрам.

//Задача 3: Палиндром
//Напиши функцию isPalindrome, которая проверяет, является ли строка палиндромом (читается одинаково слева направо и справа налево).

function isPalindrome(str) {
	let a = str.toLowerCase();
	a = a.replace(/[^a-zA-Zа-яА-Я]/g, '');
	let b = a.split('').reverse().join('');
	if (a === b) return true;
	return false;
}

isPalindrome('топот'); // true
isPalindrome('А роза упала на лапу Азора'); // true
isPalindrome('JavaScript'); // false

//Задача 4: Форматирование числа
//Напиши функцию formatNumber, которая принимает число и возвращает строку с разделителями тысяч.

function formatNumber(num) {
	num = num.toString();
	let num1 = num.split('');
	for (let i = num1.length - 3; i > 0; i -= 3) {
		num1.splice(i, 0, ',');
	}
	return num1.join('');
}

formatNumber(1234567); // "1,234,567"
formatNumber(1000); // "1,000"
formatNumber(123); // "123"

//Генератор случайных строк
//Напиши функцию generateRandomString, которая принимает число n и возвращает строку из n случайных символов (буквы и цифры).

function generateRandomString(n) {
	const characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let b = '';

	for (let i = 0; i < n; i++) {
		let a = Math.floor(Math.random() * characters.length);
		b += characters[a];
	}
	return b;
}
generateRandomString(5); // "aB3dE"
generateRandomString(10); // "qW2eR4tY7u"

let a = 0.5 + 0.2 == 0.7;
let b = (0.5 * 10 + 0.2 * 10) / 10;
console.log(a);
console.log(b);
//Генерация случайного числа в диапазоне:
function numo(a, b) {
	let min = Math.min(a, b);
	let max = Math.max(a, b);
	let gennum = Math.random() * (max - min) + min;
	return +gennum.toFixed(2);
}
console.log(numo(3, 7)); //3.23

//Напишите функцию randomInRange(a, b), которая возвращает случайное число между a и b (включительно). Результат должен быть округлён до 2 знаков после запятой.

function randomInRange(a, b) {
	let min = Math.min(a, b);
	let max = Math.max(a, b);
	let num1 = Math.random() * (max - min + 1) + min;
	return num1.toFixed(2);
}
console.log(randomInRange(5, 6));
//(max - min) + min просто возвращает max.

//(max - min + 1) увеличивает диапазон на 1, что позволяет включить max при использовании с Math.random().
//Напишите функцию roundToDecimal(number, decimals), которая округляет число number до указанного количества знаков после запятой decimals.
function roundToDecimal(number, decimals) {
	number = number.toFixed(decimals);
	return Number(number);
}
console.log(roundToDecimal(3.14159, 2));
console.log(typeof roundToDecimal(3.14159, 2)); // "number"

function isEven(number) {
	if (Number.isFinite(number)) {
		if (number % 2 === 0) {
			return true;
		}
		return false;
	} else {
		return `${number} is not a number`;
	}
}
console.log(isEven(4)); // true
console.log(isEven(7)); // false
/* есть такое решение еще function isEven(number) {
    // Проверяем, что number — конечное число
    if (!Number.isFinite(number)) {
        console.log(`${number} is not a number`);
        return; // Прекращаем выполнение функции
    }

    // Проверяем, чётное ли число
    return number % 2 === 0;
}

// Примеры
console.log(isEven(4)); // true
console.log(isEven(7)); // false
console.log(isEven(NaN)); // "NaN is not a number", undefined
console.log(isEven("hello")); // "hello is not a number", undefined*/
