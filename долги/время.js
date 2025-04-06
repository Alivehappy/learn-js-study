//1.
//toISOString() всегда возвращает время в UTC .(GMT+0), поэтому оно на 3 часа меньше вашего локального времени(краснодар). по гринвичу "2025-04-02T19:47:39.596Z"

//date.toUTCString()	Аналогично toISOString, но в другом формате	"Wed, 02 Apr 2025 19:47:39 GMT"

//new Date()	Текущую дату/время в локальной TZ	Wed Apr 02 2025 22:47:39 GMT+ сколько- то часов
//date.toString()	Строку в локальной TZ

//date.toLocaleString()	Локализованную строку (зависит от настроек ОС/браузера
//Время в конкретной временной зоне (например, GMT+4):

console.log(new Date().toLocaleString('ru-Ru', { timeZone: 'Asia/Shanghai' })); //14 часов +8 часов по гмт

//toLocaleString('язык-регион', { timeZone: 'Континент/Город' })

/*JavaScript хранит даты в миллисекундах с 1970-01-01 (UTC).

При выводе:

toString() подстраивается под ваш часовой пояс (например, UTC+3).

toISOString() всегда показывает UTC (без смещения)*/
//timestamp всегда привязан к UTC, но при выводе в локальном формате (toString(), toLocaleString()) он конвертируется в ваш часовой пояс. Для работы строго с UTC используйте методы toUTCString() или toISOString().

/////////////////////////////////////////////

//2.

//JSON является форматом данных.
//Для сериализации объекта javascript в json применяется функция JSON.stringify():  - конвертим в json

//Сериализация (JSON.stringify) Создаёт новую строку (примитив), которая лишь описывает объект.

const user = {
	name: 'Tom',
	married: false,
	age: 39,
};
// объект json
const serializedUser = JSON.stringify(user);
console.log(serializedUser); //{"name":"Tom","married":false,"age":39}

//Для обратной операции - десериализации или парсинга json-объекта в javascript применяется метод JSON.parse():

const deserialized = JSON.parse(serializedUser);
//Создаётся НОВЫЙ объект
console.log(deserialized, user); // Два разных объекта

/////////////////////
//3.

//<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
// в html подключить лодаш-библиотеку
const original = {
	name: 'Alice',
	details: {
		age: 25,
		hobbies: ['reading', 'coding'],
	},
};
const clone = _.cloneDeep(original);
console.log(clone);
//клондип все копирует//Да, _.cloneDeep() из Lodash — это единственный из стандартных методов, который корректно копирует функции в JavaScript.

//structuredClone() не может клонировать функции — это одно из его ключевых ограничений.  :(
/*Метод structuredClone() предназначен для клонирования:

Примитивов

Объектов

Массивов

Date, Set, Map, ArrayBuffer и других сложных типов

*/

//////////////////////////
//4.
// Объект Intl.DateTimeFormatпредоставляет возможности формирования даты и времени в соответствии с языковыми правилами.
//Intl.DateTimeFormat — это отдельный конструктор, а не метод даты.

let date1 = new Date();
console.log(new Intl.DateTimeFormat('en-US').format(date1));
console.log(date1);
/*Intl.DateTimeFormat не изменяет исходную дату

Он только создает строковое представление даты согласно настройкам*/
//нормально выглядещее форматирование

const niceFormat = new Intl.DateTimeFormat('ru-RU', {
	weekday: 'long',
	year: 'numeric',
	month: 'long',
	day: 'numeric',
	hour: '2-digit',
	minute: '2-digit',
	second: '2-digit',
	timeZoneName: 'short',
});
console.log(niceFormat.format(new Date()));
///четверг, 3 апреля 2025 г. в 11:14:06 GMT+3

//Потому что niceFormat - это форматтер, а не строка. Для получения результата нужно вызвать метод .format():

//задача
// // [Tue Apr 01 2025 01:00:00 GMT+04:00
// Tue Apr 01 2025 10:00:00 GMT+04:00
// Tue Apr 01 2025 10:00:00 GMT+04:00
// Tue Apr 02 2025 10:00:00 GMT+04:00
// Tue Apr 03 2025 10:00:00 GMT+04:00
// Tue Apr 03 2025 05:00:00 GMT+04:00] [Date]
// [
// 1,
// 2,
// 0,
// 3,
// 4,
// 5,
// ]

// Что надо сделать
// [
//  ['Apr-01-2025', 1]
//  ['Apr-02-2025', 3]
//  ['Apr-03-2025', 4.5]
// ]
{
	const originalDate = [
		'Tue Apr 01 2025 01:00:00 GMT+04:00',
		'Tue Apr 01 2025 10:00:00 GMT+04:00',
		'Tue Apr 01 2025 10:00:00 GMT+04:00',
		'Tue Apr 02 2025 10:00:00 GMT+04:00',
		'Tue Apr 03 2025 10:00:00 GMT+04:00',
		'Tue Apr 03 2025 05:00:00 GMT+04:00',
	];

	// Преобразуем все даты один раз в начале
	const localDate = originalDate.map(dateStr => new Date(dateStr)); //массив объектов дата

	const values = [1, 2, 0, 3, 4, 5];
	const grouped = {};
	const monthNames = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];

	// Используем уже преобразованные даты из localDate
	for (let i = 0; i < localDate.length; i++) {
		const date = localDate[i]; // Берём из предварительно преобразованного массива

		const month = monthNames[date.getMonth()];
		const day = String(date.getDate()).padStart(2, '0');
		const year = date.getFullYear();
		const key = `${month}-${day}-${year}`;
		if (!grouped[key]) {
			grouped[key] = [];
		}
		grouped[key].push(values[i]);
	}
	// Считаем среднее
	const result = [];
	for (const key in grouped) {
		const average =
			grouped[key].reduce((acc, elem) => (acc += elem), 0) /
			grouped[key].length;
		result.push([key, average]);
	}
	console.log(result);
}

/*padStart()?
Это метод, который дополняет строку до нужной длины указанными символами в начале (слева)
*/
const num = '5';
console.log(num.padStart(2, '0')); //05
