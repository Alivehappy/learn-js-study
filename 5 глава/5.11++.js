//встроенный объект: Date. Он содержит дату и время, а также предоставляет методы управления ими.//new Date() Без аргументов – создать объект Date с текущими датой и временем:

let now = new Date();
console.log(now); // показывает текущие дату и время
// 0 соответствует 01.01.1970 UTC+0
let Jan01_1970 = new Date(0);
console.log(Jan01_1970);
// теперь добавим 24 часа и получим 02.01.1970 UTC+0
let Jan02_1970 = new Date(24 * 3600 * 1000);
console.log(Jan02_1970);
//Целое число, представляющее собой количество миллисекунд, прошедших с начала 1970 года, называется таймстамп (англ. timestamp).
//Датам до 1 января 1970 будут соответствовать отрицательные таймстампы, например:

let Dec31_1969 = new Date(-24 * 3600 * 1000);
console.log(Dec31_1969);
///Если аргумент всего один, и это строка, то из неё «прочитывается» дата. Алгоритм разбора – такой же, как в Date.parse, который мы рассмотрим позже.

let date = new Date('2017-01-26');
console.log(date);
// Время не указано, поэтому оно ставится в полночь по Гринвичу и
// меняется в соответствии с часовым поясом места выполнения кода
// Так что в результате можно получить
// Thu Jan 26 2017 11:00:00 GMT+1100 (восточно-австралийское время)
// или
// Wed Jan 25 2017 16:00:00 GMT-0800 (тихоокеанское время)
//new Date(year, month, date, hours, minutes, seconds, ms)
//Создать объект Date с заданными компонентами в местном часовом поясе. Обязательны только первые два аргумента.
//Параметр date здесь представляет собой день месяца. Если параметр не задан, то принимается значение 1.
//Если параметры hours/minutes/seconds/ms отсутствуют, их значением становится 0. month начинается с 0 (январь) по 11 (декабрь).

{
	new Date(2011, 0, 1, 0, 0, 0, 0); // // 1 Jan 2011, 00:00:00
	new Date(2011, 0, 1); // то же самое, так как часы и проч. равны 0
	// //Максимальная точность – 1 мс (до 1/1000 секунды):
	let date = new Date(2011, 0, 1, 2, 3, 4, 567);
	alert(date); // 1.01.2011, 02:03:04.567
} /*Существуют методы получения года, месяца и т.д. из объекта Date:

getFullYear()
Получить год (4 цифры)
getMonth()
Получить месяц, от 0 до 11.
getDate()
Получить день месяца, от 1 до 31, что несколько противоречит названию метода.
getHours(), getMinutes(), getSeconds(), getMilliseconds()
Получить, соответственно, часы, минуты, секунды или миллисекунды.Кроме того, можно получить определённый день недели:

getDay()
Вернуть день недели от 0 (воскресенье) до 6 (суббота) Однако существуют и их UTC-варианты, возвращающие день, месяц, год для временной зоны UTC+0: getUTCFullYear(), getUTCMonth(), getUTCDay(). Для их использования требуется после "get" подставить "UTC"
Помимо вышеприведённых методов, существуют два особых метода без UTC-варианта:

getTime()
Для заданной даты возвращает таймстамп – количество миллисекунд, прошедших с 1 января 1970 года UTC+0.

getTimezoneOffset()
Возвращает разницу в минутах между UTC и местным часовым поясом:


*/
{
	// текущая дата
	let date = new Date();

	// час в вашем текущем часовом поясе
	console.log(date.getHours());
	// час в часовом поясе UTC+0 (лондонское время без перехода на летнее время)
	console.log(date.getUTCHours());
	/*getTimezoneOffset()
Возвращает разницу в минутах между UTC и местным часовым поясом:

// если вы в часовом поясе UTC-1, то выводится 60
// если вы в часовом поясе UTC+3, выводится -180
*/
	console.log(new DelayNode().getTimezoneOffset());
}
/*Следующие методы позволяют установить компоненты даты и времени:

setFullYear(year, [month], [date])
setMonth(month, [date])
setDate(date)
setHours(hour, [min], [sec], [ms])
setMinutes(min, [sec], [ms])
setSeconds(sec, [ms])
setMilliseconds(ms)
setTime(milliseconds) (устанавливает дату в виде целого количества миллисекунд, прошедших с 01.01.1970 UTC)
У всех этих методов, кроме setTime(), есть UTC-вариант, например: setUTCHours().

*/
let today = new Date();
today.setHours(0);
console.log(today); // выводится сегодняшняя дата, но значение часа будет 0
today.setHours(0, 0, 0, 0);
//alert(today); // всё ещё выводится сегодняшняя дата, но время будет ровно 00:00:00.
/*Автоисправление – это очень полезная особенность объектов Date. Можно устанавливать компоненты даты вне обычного диапазона значений, а объект сам себя исправит.*/
{
	let date = new Date(2013, 0, 32); // 32 Jan 2013 ?!?
	console.log(date); // ...1st Feb 2013! //Неправильные компоненты даты автоматически распределяются по остальным.
	let date1 = new Date(2016, 1, 28);
	date1.setDate(date1.getDate() + 2);
	console.log(date1); // 1 Mar 2016
}
//Например, получим дату «спустя 70 секунд с текущего момента»:

{
	let date = new Date();
	date.setSeconds(date.getSeconds() + 70);
	console.log(date); // выводит правильную дату
}

//Также можно установить нулевые или даже отрицательные значения. Например:

{
	let date = new Date(2016, 0, 2); // 2 Jan 2016
	date.setDate(1); // задать первое число месяца
	console.log(date);
	date.setDate(0);
	// первый день месяца -- это 1, так что выводится последнее число предыдущего месяца
	alert(date); // 31 Dec 2015
}
//Если объект Date преобразовать в число, то получим таймстамп по аналогии с date.getTime():
{
	let date = new Date();
	console.log(+date); // количество миллисекунд, то же самое, что date.getTime()
}
//Важный побочный эффект: даты можно вычитать, в результате получаем разность в миллисекундах.

{
	let start = new Date(); // начинаем отсчёт времени

	// выполняем некоторые действия
	for (let i = 0; i < 100000; i++) {
		let doSonething = i * i * i;
	}
	let end = new Date();
	// заканчиваем отсчёт времени
	console.log(`Цикл отработал за${end - start}миллисекунд`);
}
//Существует особый метод Date.now(), возвращающий текущую метку времени
//Семантически он эквивалентен new Date().getTime(), однако метод не создаёт промежуточный объект Date. Так что этот способ работает быстрее и не нагружает сборщик мусора.
let start = Date.now(); // количество миллисекунд с 1 января 1970 года
for (let i = 0; i < 100000; i++) {
	let doSomething = i * i * i;
}
let end = Date.now();
// заканчиваем отсчёт времени

alert(`Цикл отработал за ${end - start} миллисекунд`); // вычитаются числа, а не даты
/*new Date() — «обёртка» вокруг timestamp.

Date.now() — «голый» timestamp.

*/
/*Подобные вычисления, замеряющие производительность, также называют «бенчмарками» (benchmark).

*/
//////////////////////////////////
let user = {
	name: 'John',
	age: 30,
	toString() {
		return `{name: '${this.name}', age: ${this.age}}`;
	},
};
alert(user); // {name: "John", age: 30}
/*JavaScript предоставляет методы:

JSON.stringify для преобразования объектов в JSON.
JSON.parse для преобразования JSON обратно в объект.*/
let student = {
	name: 'John',
	age: 30,
	isAdmin: false,
	courses: ['html', 'css', 'js'],
	wife: null,
};
let json = JSON.stringify(student);
console.log(typeof json); //string
// мы получили строку!
console.log(json);
/* выведет объект в формате JSON:
{
  "name": "John",
  "age": 30,
  "isAdmin": false,
  "courses": ["html", "css", "js"],
  "wife": null
}
*/
//Метод JSON.stringify(student) берёт объект и преобразует его в строку
//Полученная строка json называется JSON-форматированным или сериализованным объектом. Мы можем отправить его по сети или поместить в обычное хранилище данных.
//Строки используют двойные кавычки. Никаких одинарных кавычек или обратных кавычек в JSON. Так 'John' становится "John".
//Имена свойств объекта также заключаются в двойные кавычки. Это обязательно. Так age:30 становится "age":30.
//JSON.stringify может быть применён и к примитивам.
// число в JSON остаётся числом
alert(JSON.stringify(1)); // 1

// строка в JSON по-прежнему остаётся строкой, но в двойных кавычках
alert(JSON.stringify('test')); // "test"

alert(JSON.stringify(true)); // true

alert(JSON.stringify([1, 2, 3])); // [1,2,3]
/*JSON является независимой от языка спецификацией для данных, поэтому JSON.stringify пропускает некоторые специфические свойства объектов JavaScript.

А именно:

Свойства-функции (методы).
Символьные ключи и значения.
Свойства, содержащие undefined.
*/
let user1 = {
	sayHi() {
		alert('hello');
	},
	[Symbol('id')]: 123,
	something: undefined, // как и это - пропущено
};
console.log(JSON.stringify(user1)); // {} (пустой объект)
//Самое замечательное, что вложенные объекты поддерживаются и конвертируются автоматически
let meetup = {
	title: 'Conference',
	room: {
		number: 23,
		participants: ['john', 'ann'],
	},
};

alert(JSON.stringify(meetup));
/* вся структура преобразована в строку:
{
  "title":"Conference",
  "room":{"number":23,"participants":["john","ann"]},
}
*/
//Важное ограничение: не должно быть циклических ссылок.

{
	let room = {
		number: 23,
	};
	let meetup = { title: 'Conference', participants: ['john', 'ann'] };
	meetup.place = room; // meetup ссылается на room
	room.occupiedBy = meetup; // room ссылается на meetup
	JSON.stringify(meetup); /// Ошибка: Преобразование цикличной структуры в JSON
}
//Полный синтаксис JSON.stringify:

{
	//let json = JSON.stringify(value[, replacer, space])
}
/*value
Значение для кодирования.
replacer
Массив свойств для кодирования или функция соответствия function(key, value).
space
Дополнительное пространство (отступы), используемое для форматирования.
В большинстве случаев JSON.stringify используется только с первым аргументом. Но если нам нужно настроить процесс замены, например, отфильтровать циклические ссылки, то можно использовать второй аргумент JSON.stringify.

*/
{
	let room = {
		number: 23,
	};

	let meetup = {
		title: 'Conference',
		participants: [{ name: 'John' }, { name: 'Alice' }],
		place: room, // meetup ссылается на room
	};

	room.occupiedBy = meetup; // room ссылается на meetup
	console.log(JSON.stringify(meetup, ['title', 'participants'])); // {"title":"Conference","participants":[{},{}]}
}
/*Второй аргумент ['title', 'participants'] указывает, какие свойства нужно включать

Поэтому включаются только title и participants

*/
{
	let room = {
		number: 23,
	};

	let meetup = {
		title: 'Conference',
		participants: [{ name: 'John' }, { name: 'Alice' }],
		place: room, // meetup ссылается на room
	};

	room.occupiedBy = meetup; // room ссылается на meetup
	alert(
		JSON.stringify(meetup, function replacer(key, value) {
			alert(`${key}: ${value}`);
			return key == 'occupiedBy' ? undefined : value;
		})
	);
} //Циклические ссылки нужно обрабатывать через replacer или удалять вручную.все остальное выведет в виде строкогового преобразования из-за алерта
/*!!!!!!!Первый вызов replacer("", obj) — это «корневой» вызов.

Дальше идёт рекурсивный обход всех свойств.

this внутри replacer — родительский объект текущего свойства.

*/
//Третий аргумент в JSON.stringify(value, replacer, space) – это количество пробелов, используемых для удобного форматирования
//Ниже space = 2 указывает JavaScript отображать вложенные объекты в несколько строк с отступом в 2 пробела внутри объекта:

{
	let user = {
		name: 'John',
		age: 25,
		roles: {
			isAdmin: false,
			isEditor: true,
		},
	};
	alert(JSON.stringify(user, null, 2));
}
/* отступ в 2 пробела:
//Здесь нет [object Object], потому что JSON.stringify() уже преобразовал объект в строку.
//Параметр space применяется исключительно для логирования и красивого вывода

//Как и toString для преобразования строк, объект может предоставлять метод toJSON для преобразования в JSON. JSON.stringify автоматически вызывает его, если он есть.
*/
{
	let room = {
		number: 23,
	};
	let meetup = {
		title: 'Conference',
		date: new Date(Date.UTC(2017, 0, 1)),
		room,
	};
	alert(JSON.stringify(meetup));
}
/*
  {
    "title":"Conference",
    "date":"2017-01-01T00:00:00.000Z",  // (1)
    "room": {"number":23}               // (2)
  }
*/
//Как видим, date (1) стал строкой. Это потому, что все объекты типа Date имеют встроенный метод toJSON, который возвращает такую строку
{
	let room = {
		number: 23,
		toJSON() {
			return this.number;
		},
	};
	let meetup = {
		title: 'Conference',
		room,
	};
	alert(JSON.stringify(room)); //23
	alert(JSON.stringify(meetup));
}
/*
  {
    "title":"Conference",
    "room": 23
  }
*/
//toJSON используется как при прямом вызове JSON.stringify(room), так и когда room вложен в другой сериализуемый объект.
//Чтобы декодировать JSON-строку, нам нужен другой метод с именем JSON.parse
//let value = JSON.parse(str[, reviver])
//reviver
//Необязательная функция, которая будет вызываться для каждой пары (ключ, значение) и может преобразовывать значение.
// строковый массив
let numbers = '[0,1,2,3]';
numbers = JSON.parse(numbers);
alert(numbers[1]); //1
{
	let user =
		'{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';

	user = JSON.parse(user);
	alert(user.friends[1]); //1
}
/*JSON (JavaScript Object Notation) - это текстовый формат данных, который:

Не поддерживает функции, конструкторы (включая new) или методы

Разрешает только определённые типы данных:

Объекты {...}

Массивы [...]

Числа, строки (в двойных кавычках)

true, false, null

*/
//Кроме того, JSON не поддерживает комментарии. Добавление комментария в JSON делает его недействительным.
// title: (meetup title), date: (meetup date)
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
/*…А теперь нам нужно десериализовать её, т.е. снова превратить в объект JavaScript.

Давайте сделаем это, вызвав JSON.parse:

*/ {
	let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
	let meetup = JSOn.parse(str);
	alert(meetup.date.getDate()); // Ошибка!
}
/*Значением meetup.date является строка, а не Date объект. Как JSON.parse мог знать, что он должен был преобразовать эту строку в Date?

Давайте передадим JSON.parse функцию восстановления вторым аргументом, которая возвращает все значения «как есть», но date станет Date*/
{
	let schedule = `{"meetups": [
    {"title":"Conference","date":"2017-11-30T12:00:00.000Z"},
    {"title":"Birthday","date":"2017-04-18T12:00:00.000Z"}
  ]

	}`;
	schedule = JSON.parse(schedule, function (key, value) {
		if (key == 'date') return new Date(value);
		return value;
	});
	alert(schedule.meetups[1].date.getDate());
}

{
	let user = {
		name: 'Василий Иванович',
		age: 35,
	};
	user = JSON.stringify(user);
	console.log(user);
	let user2 = JSON.parse(user);
	console.log(user2);
}
/*let user = {
  name: "Василий Иванович",
  age: 35
};
let user2 = JSON.parse(JSON.strinigify(user1));*/
{
	let room = {
		number: 23,
	};

	let meetup = {
		title: 'Совещание',
		occupiedBy: [{ name: 'Иванов' }, { name: 'Петров' }],
		place: room,
	};

	// цикличные ссылки
	room.occupiedBy = meetup;
	meetup.self = meetup;
	function replacer(key, value) {
		if (key === 'occupiedBy' && value === meetup) {
			return undefined;
		}
		if (key === 'self' && value === meetup) {
			return undefined;
		}
		return value;
	}
	console.log(JSON.stringify(meetup, replacer));
}
//Функция replacer вызывается для каждого свойства объекта при преобразовании в JSON.
//Параметр value — это текущее значение свойства, которое обрабатывается
//Все циклические ссылки ведут к объекту meetup (прямо или через room.occupiedBy)
{
	let room = {
		number: 23,
	};

	let meetup = {
		title: 'Совещание',
		occupiedBy: [{ name: 'Иванов' }, { name: 'Петров' }],
		place: room,
	};

	room.occupiedBy = meetup;
	meetup.self = meetup;

	alert(
		JSON.stringify(meetup, function replacer(key, value) {
			return key != '' && value == meetup ? undefined : value;
		})
	);
}
/*Когда JSON.stringify() начинает обработку, первый вызов replacer получает:

key = "" (пустая строка)

value = ваш_объект (в нашем случае meetup) Ключ: "", Значение: {title: "Совещание", place: {number: 23}}  ← Корневой объект
*/
/*Если свойство occupiedBy содержит ссылку на meetup → заменяет на undefined (исключает из вывода).

Если свойство self содержит ссылку на meetup → тоже исключает.

Все остальные значения возвращает как есть.

*/
{
	let date = new Date(2012, 1, 20, 3, 12);
	console.log(date);
}
//Напишите функцию getWeekDay(date), показывающую день недели в коротком формате: «ПН», «ВТ», «СР», «ЧТ», «ПТ», «СБ», «ВС».:

{
	function getWeekDay(date) {
		let arr = ['«ВС»', '«ПН»', '«ВТ»', '«СР»', '«ЧТ»', '«ПТ»', '«СБ»'];
		return arr[date.getDay()];
	}
	let date = new Date(2012, 0, 3);
	console.log(getWeekDay(date)); //ВТ
}
{
	function getLocalDay(date) {
		let day = date.getDay();
		if (day === 0) {
			day = 7;
		}
		return day; /// день недели 0 (воскресенье) в европейской нумерации будет 7
	}
}

{
	function getDateAgo(date, days) {
		date.setDate(date.getDate() - days);
		return date.getDate();
	}
	let date = new Date(2015, 0, 2);
	console.log(getDateAgo(date, 1));
}

{
	function getDateAgo(date, days) {
		let copy = new Date(date);
		copy.setDate(date.getDate() - days);
		return copy.getDate();
	}
}
//Напишите функцию getLastDayOfMonth(year, month), возвращающую последнее число месяца.

{
	function getLastDayOfMonth(year, month) {
		let day = new Date(year, month + 1, 0);
		return day.getDate();
	}
	console.log(getLastDayOfMonth(2012, 1));
}
/*Параметры year и month - это просто числа, не дата

Для вычислений с датами в JS всегда нужно создавать объект Date
Когда можно обойтись без нового объекта Date?
Только если вам уже передали готовый объект даты:

function getLastDayOfMonth(date){
return new DAte(date.getFullYear(), date.getMonth() +1,0).getDate()}
*/
{
	function getSecondsToday() {
		let now = new Date();
		let date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
		return Math.round((now - date) / 1000);
	}
	console.log(getSecondsToday());
}
//Создайте функцию getSecondsToTomorrow(), возвращающую количество секунд до завтрашней даты.

{
	function getSecondsToTomorrow() {
		let date = new Date();
		let tomorrow = (date.getFullYear(), date.getMonth(), date.getDate() + 1);
		let res = tomorrow - date;
		return Math.round(diff / 1000);
	}
}

{
	function formatDate(date) {
		let diff = new Date() - date; // разница в миллисекундах
		if (diff < 1000) {
			//меньше 1 секунды
			//
			return 'прямо сейчас';
		}
		let sec = Math.floor(diff / 1000); // преобразовать разницу в секунды
		if (sec < 60) {
			return sec + 'сек. назад';
		}
		let min = Math.floor();
	}
}
