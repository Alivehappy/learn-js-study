/* map.keys(), map.values(), map.entries().

Это универсальные методы, и существует общее соглашение использовать их для структур данных. Если бы мы делали собственную структуру данных, нам также следовало бы их реализовать.

Методы поддерживаются для структур:

Map
Set
Array
*/
/*Object.keys(obj) – возвращает массив ключей.
Object.values(obj) – возвращает массив значений.
Object.entries(obj) – возвращает массив пар [ключ, значение].
*/
/*	Map	 map.keys()   Возвращает	перебираемый объект 

Object Object.keys(obj) Возвращает «реальный» массив*/
//поиграться с вызовом свой ств в цикле и без него и в мапе и в сете он массивы вернет или нет
// 20 задачкод варс
//ыидик по штмл и код базткс
//видик про методы массивов
let prices = {
	banana: 1,
	orange: 2,
	meat: 4,
};
let doublePrices = Object.fromEntries(
	Object.entries(prices).map(([key, value]) => [key, value * 2])
);
// преобразовать в массив, затем map, затем fromEntries (обратно в объект)
alert(doublePrices.meat); // 8

let salaries = {
	John: 100,
	Pete: 300,
	Mary: 250,
};
function sumSalaries(salaries) {
	let result = 0;
	let vale = Object.values(salaries);

	for (let key of vale) {
		result += key;
	}
	return result;
}
console.log(sumSalaries(salaries)); //650
{
	function sumSalaries(salaries) {
		return Object.values(salaries).reduce((acc, elem) => acc + elem);
	}
}

let user = {
	name: 'John',
	age: 30,
};
function count(user) {
	let num = 0;
	for (let key of Object.keys(user)) {
		num += 1;
	}
	return num;
}
console.log(count(user));

{
	function count(obj) {
		return Obkect.keys(obj).length;
	}
}
//Деструктурирующее присваивание – это специальный синтаксис, который позволяет нам «распаковать» массивы или объекты в несколько переменных, так как иногда они более удобны.
//Вот пример деструктуризации массива на переменные:
// у нас есть массив с именем и фамилией
let arr = ['Ilya', 'Kantor'];
// деструктурирующее присваивание
// записывает firstName = arr[0]
// и surname = arr[1]
let [firstName, surName] = arr;
console.log(firstName);
console.log(surName);
{
	let [firstName, surName] = 'Ilya Kantor'.split(' '); //["Ilya", "Kantor"]
	/*Синтаксис let [firstName, surname] = ... извлекает элементы из массива и присваивает их переменным:

Первый элемент массива ("Ilya") записывается в переменную firstName.

Второй элемент массива ("Kantor") записывается в переменную surname.

*/
	console.log(firstName);
	console.log(surName);
}

/*Деструктурирующее присваивание» не уничтожает массив. Оно вообще ничего не делает с правой частью присваивания, его задача – только скопировать нужные значения в переменные*/
{
	// let [firstName, surname] = arr;
	let firstName = arr[0];
	let surName = arr[1];
}

//Нежелательные элементы массива также могут быть отброшены с помощью дополнительной запятой:
// второй элемент не нужен
{
	let [firstName, , title] = [
		'Julius',
		'Caesar',
		'Consul',
		'of the Roman Republic',
	];
	console.log(title); //Consul
}
//В примере выше второй элемент массива пропускается, а третий присваивается переменной title, оставшиеся элементы массива также пропускаются (так как для них нет переменных).
//На самом деле мы можем использовать любой перебираемый объект, не только массивы:

let [a, b, c, d] = 'abc';
console.log(d);
console.log(b);
//строка — это итерируемый объект, то есть её можно перебирать посимвольно
/*Когда вы пишете let [a, b, c] = 'abc', JavaScript интерпретирует это так:

Возьми первый символ строки и запиши его в переменную a.

Возьми второй символ строки и запиши его в переменную b.

Возьми третий символ строки и запиши его в переменную c.

*/
let [ono, two, three] = new Set([1, 2, 3]);
/*Присваивайте чему угодно с левой стороны
Мы можем использовать что угодно «присваивающее» с левой стороны.

Например, можно присвоить свойству объекта*/
{
	let user = {};
	[user.name, user.surname] = 'Ilya Kantor'.split(' ');
	alert(user.name); // Ilya
	alert(user.surname); // Kantor
}

//Внутри цикла используется деструктуризация:

//let [key, value] = ['name', 'John'];
/*Object.entries(user) возвращает массив пар [ключ, значение].

let [key, value] — это деструктуризация, которая извлекает ключ и значение из каждой пары.

*/

{
	let user = {
		name: 'John',
		age: 30,
	};
	// цикл по ключам и значениям
	for (let [key, value] of Object.entries(user)) {
		alert(`${key}:${value}`); // name:John, затем age:30
	}
}
{
	let user = new Map();
	user.set('name', 'John');
	user.set('age', '30');
	for (let [key, value] of user) {
		alert(`${key}:${value}`); // name:John, затем age:30
	}
}
//Существует хорошо известный трюк для обмена значений двух переменных с использованием деструктурирующего присваивания:

let obj = {
	a: 5656,
	b: 5,
};
let map = new Map(Object.entries(obj));
console.log(map);
let guest = 'Jane';
let admin = 'pete';
// Давайте поменяем местами значения: сделаем guest = "Pete", а admin = "Jane"
[guest, admin] = [admin, guest];
console.log(`${guest}, ${admin}`); //pete, Jane
/*Здесь мы создаём временный массив из двух переменных и немедленно деструктурируем его в порядке замены.

Таким образом, мы можем поменять местами даже более двух переменных.

*/

let [name1, name2] = ['Julius', 'Caesar', 'Consul', 'of the Roman Republic'];
alert(name1); // Julius
alert(name2); // Caesar
// Дальнейшие элементы нигде не присваиваются
{
	/*Если мы хотим не просто получить первые значения, но и собрать все остальные, то мы можем добавить ещё один параметр, который получает остальные значения, используя оператор «остаточные параметры» – троеточие ("..."):

*/

	let [name1, name2, ...rest] = [
		'Julius',
		'Caesar',
		'Consul',
		'of the Roman Republic',
	];
	// rest это массив элементов, начиная с 3-го
	console.log(rest[0]); // Consul

	console.log(rest[1]); // of the Roman Republic
	console.log(rest.length); //2
}
/*Переменная rest является массивом из оставшихся элементов.

Вместо rest можно использовать любое другое название переменной, просто убедитесь, что перед переменной есть три точки и она стоит на последнем месте в деструктурирующем присваивании.

*/
/*Если в массиве меньше значений, чем в присваивании, то ошибки не будет. Отсутствующие значения считаются неопределёнными:

*/
{
	let [firstName, surname] = [];

	alert(firstName); // undefined
	alert(surname); // undefined
}
/*Если мы хотим, чтобы значение «по умолчанию» заменило отсутствующее, мы можем указать его с помощью =:

*/

let [name = 'Guest', surname = 'Anonymous'] = ['Julius'];
console.log(name); //Julius (из массива)

console.log(surname); //Anonymous (значение по умолчанию)
//Значения по умолчанию могут быть гораздо более сложными выражениями или даже функциями. Они выполняются, только если значения отсутствуют

let [name = prompt('name'), surname = prompt('surname')] = ['Julius'];
alert(name); // Julius (из массива)
alert(surname); // результат prompt
//Обратите внимание, prompt будет запущен только для пропущенного значения (surname).
//Деструктурирующее присваивание также работает с объектами
// let {var1, var2} = { var1: , var2: }
let options = {
	title: 'Menu',
	width: 100,
	height: 200,
};
let { title, width, height } = options;
//Свойства options.title, options.width и options.height присваиваются соответствующим переменным
//В JavaScript деструктуризация объекта работает по именам свойств, а не по порядку. Это означает, что имена переменных должны совпадать с именами свойств объекта, чтобы значения были корректно присвоены
//Если мы хотим присвоить свойство объекта переменной с другим названием, например, свойство options.width присвоить переменной w, то мы можем использовать двоеточие

{
	let options = {
		title: 'Menu',
		width: 100,
		height: 200,
	};
	//// { sourceProperty: targetVariable }
	let { width: w, height: h, title } = options;
	// width -> w
	// height -> h
	// title -> title
	alert(title); // Menu
	alert(w); // 100
	alert(h); // 200
}
/*Двоеточие показывает «что : куда идёт». В примере выше свойство width сохраняется в переменную w, свойство height сохраняется в h, а title присваивается одноимённой переменной.

*/
{
	let options = {
		title: 'Menu',
	};

	let { width = 100, height = 200, title } = options;
	alert(title); // Menu
	alert(width); // 100
	alert(height); // 200
}
//Мы также можем совмещать : и =:
/*let options = {
  title: "Menu"
};

let {width: w = 100, height: h = 200, title} = options;

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200
*/
//Если у нас есть большой объект с множеством свойств, можно взять только то, что нужно:
{
	let options = {
		title: 'Menu',
		width: 100,
		height: 200,
	};

	// взять только title, игнорировать остальное
	let { title } = options;

	alert(title); // Menu
}
{
	let options = {
		title: 'Menu',
		height: 200,
		width: 100,
	};
	// title = свойство с именем title
	// rest = объект с остальными свойствами
	let { title, ...rest } = options;
	// сейчас title="Menu", rest={height: 200, width: 100}
	console.log(rest.height); // 200
	alert(rest.width); // 100
}
//Чтобы показать JavaScript, что это не блок кода, мы можем заключить выражение в скобки (...):
//let title, width, height;
// сейчас всё работает
({ title, width, height } = { title: 'Menu', width: 200, height: 100 });

alert(title); // Menu

{
	let options = {
		size: {
			width: 100,
			height: 200,
		},
		items: ['Cake', 'Donut'],
		extra: true,
	};
	// деструктуризация разбита на несколько строк для ясности
	let {
		size: {
			// положим size сюда
			width,
			height,
		},
		items: [item1, item2], // добавим элементы к items
		title = 'Menu', // отсутствует в объекте (используется значение по умолчанию)
	} = options;
	console.log(title);
	// Menu
	alert(width); // 100
	alert(height); // 200
	alert(item1); // Cake
	alert(item2); // Donut
}
//вложенная деструктуризация, которая позволяет извлекать значения из сложных структур (вложенных объектов и массивов) без необходимости писать объект.свойство.
{
	let options = {
		title: 'My menu',
		items: ['Item1', 'Item2'],
	};
	// ...и она немедленно извлекает свойства в переменные
	function showMenu({
		title = 'Untitled',
		width = 200,
		height = 100,
		items = [],
	}) {
		// title, items – взято из options,
		// width, height – используются значения по умолчанию
		console.log(`${title} ${width} ${height}`); // My Menu 200 100
		console.log(items[0]);
	}
	showMenu(options);
}
{
	let options = {
		title: 'My menu',
		items: ['Item1', 'Item2'],
	};
	function showMenu({
		title = 'Untitled',
		width: w = 100, // width присваиваем в w
		height: h = 200, // height присваиваем в h
		items: [item1, item2], // первый элемент items присваивается в item1, второй в item2
	}) {
		alert(`${title} ${w} ${h}`); // My Menu 100 200
		alert(item1); // Item1
		alert(item2); // Item2
	}
}
//Полный синтаксис – такой же, как для деструктурирующего присваивания
/* function showMenu({
incomingProperty: varName = defaultName})ж
function showMenu({ title = "Menu", width = 100, height = 200 } = {}) {
  alert( `${title} ${width} ${height}` );
}

showMenu(); // Menu 100 200
*/
//В приведённом выше коде весь объект аргументов по умолчанию равен {}, поэтому всегда есть что-то, что можно деструктурировать.
//Полный синтаксис для объекта:

let { prop: varName = defaultValue, ...rest } = object;
//Cвойство prop объекта object здесь должно быть присвоено переменной varName. Если в объекте отсутствует такое свойство, переменной varName присваивается значение по умолчанию
//Полный синтаксис для массива
let [item1 = defaultValue, item2, ...rest] = array;
//Первый элемент отправляется в item1; второй отправляется в item2, все остальные элементы попадают в массив rest.

let user1 = {
	name: 'John',
	years: 30,
};
let { name, years: age, isAdmin = false } = user1;
console.log(name);
console.log(age);
console.log(isAdmin);
{
	let salaries = {
		John: 100,
		Pete: 300,
		Mary: 250,
	};
	function topSalary(salaries) {
		let max = 0;
		let maxname = null;
		for (const [name, salary] of Object.entries(salaries)) {
			if (max < salary) {
				max = salary;
				maxName = name;
			}
		}
		return maxName;
	}
	console.log(topSalary(salaries));
}
