//Напишите функцию getDaysBetweenDates(date1, date2), которая возвращает абсолютную разницу между двумя датами в днях.

function getDaysBetweenDates(date1, date2) {
	let diff = new Date(date1) - new Date(date2);
	return Math.abs(diff / 1000 / 60 / 60 / 24);
}
console.log(getDaysBetweenDates('2012-01-01', '2013-01-01')); //366
//Создайте функцию formatDate(date), которая возвращает дату в формате "ДД.ММ.ГГГГ ЧЧ:ММ".
{
	function formatDate(date) {
		const d = new Date(date);
		const day = String(d.getDate()).padStart(2, '0');
		const month = String(d.getMonth() + 1).padStart(2, '0');
		const year = d.getFullYear();
		const hours = String(d.getHours()).padStart(2, '0');
		const minutes = String(d.getMinutes()).padStart(2, '0');
		return `${day}.${month}.${year} ${hours}:${minutes}`;
	}
	console.log(formatDate(new Date()));
} //31.03.2025 09:35

//Напишите функцию getLastDayOfMonth(year, month), которая возвращает последний день месяца.
{
	function getLastDayOfMonth(year, month) {
		return new Date(year, month + 1, 0).getDate();
	}
	console.log(getLastDayOfMonth(2023, 3));
}

//Создайте функцию getTimeToNewYear(), которая возвращает объект с оставшимся временем до Нового Года в формате {days, hours, minutes, seconds}.

{
	function getTimeToNewYear() {
		const date = new Date();
		const newYearDate = getFullYear(date) + 1;
		const diff = new Date(newYearDate, 0, 1) - date;
		const days = Math.floor(diff / 1000 / 60 / 60 / 24);
		const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((diff % (1000 * 60)) / 1000);
		return {
			days: days,
			hours: hours,
			minutes: minutes,
			seconds: seconds,
		};
	}
}

//Напишите функцию printMonthCalendar(year, month), которая выводит в консоль календарь месяца в виде таблицы 7×n (где n - количество недель).

//Напишите функцию isValidJSON(str), которая проверяет, является ли строка валидным JSON.

function isValidJSON(str) {
	try {
		JSON.parse(str);
		return true;
	} catch (e) {
		return false;
	}
}

//Создайте функцию deepClone(obj), которая выполняет глубокое клонирование объекта через JSON.
function deepClone(obj) {
	return JSON.parse(JSON.stringify(obj));
}
/*
Глубокое клонирование всех вложенных структур

Работает с объектами, массивами, примитивами
Не копирует функции (они теряются)

Не копирует специальные объекты типа Date, RegExp, Map, Set и др.

Не сохраняет прототипы объектов

Не копирует циклические ссылки (вызовет ошибку)*/

//Модифицируйте функцию safeStringify(obj), чтобы она обрабатывала объекты с циклическими ссылками.
function safeStringify(obj) {
	const seen = new Weakset();
	return JSON.stringify(
		obj,
		(key, value) => {
			if (typeof value === 'object' && value !== null) {
				if (seen.has(value)) {
					return '[Circular Reference]';
				}
				seen.add(value);
			}
			return value;
		},
		2
	);
}
/*value - объект для преобразования в JSON

replacer (необязательный) - может быть:

Массивом ключей для включения в результат

Функцией преобразования значений

space (необязательный) - определяет отступы в итоговой строке*/
const user = {
	id: 123,
	name: 'John',
	password: 'secret',
	age: 30,
};
const json = JSON.stringify(user, (key, value) => {
	return key === 'password' ? undefined : value;
});
///
const json1 = JSON.stringify(user, ['id', 'name', 'age']);
console.log(json);
console.log(json1);
//Если реплейсер возвращает undefined, свойство исключается из выходного JSON

const json2 = JSON.stringify(user, (key, value) => {
	if (['password', 'age'].includes(key)) {
		return undefined; //Метод includes() проверяет, содержит ли строка подстроку, а не элемент массива.
	}
	return value; /// Остальные сохраняем
});

// Через Set для оптимизации (если много ключей)
const Manykeys = new Set(['age', 'id']);
const json3 = JSON.stringify(user, (key, value) => {
	if (Manykeys.has(key)) {
		return undefined;
	}
	return value;
});
/*Фильтрация происходит только по ключам, но удаляются пары ключ-значение

Set эффективен для больших списков ключей (быстрее, чем includes с массивом)

*/
